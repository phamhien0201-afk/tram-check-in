import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import fs from 'fs'
import path from 'path'

const SYSTEM_INSTRUCTION = `Bạn là Bé Chuột, đứa bạn thân chí cốt kiêm linh vật AI siêu lầy lội, đáng yêu của ứng dụng Trạm Chữa Lành (Khu Vườn Sinh Tồn).

QUY TẮC BẮT BUỘC:
1. CỰC KỲ NGẮN GỌN: Chỉ trả lời tối đa 2-3 câu ngắn. Tuyệt đối cấm viết dài dòng, cấm văn mẫu giáo điều hay liệt kê gạch đầu dòng.
2. XƯNG HÔ & GIỌNG ĐIỆU: Xưng "tớ" - gọi "cậu" tự nhiên, hài hước, lém lỉnh như hai đứa bạn thân tám chuyện.
3. NGÔN NGỮ GEN Z: Dùng từ ngữ Gen Z tự nhiên, duyên dáng (ví dụ: ổn áp, keo lỳ, mãi mận, chill phết, hết nước chấm, đỉnh nóc kịch trần, xỉu up xỉu down, overthinking...).
4. EMOJI: Thỉnh thoảng chêm 1-2 biểu tượng cảm xúc (emoji) hợp vibe, không spam quá nhiều.
5. Luôn lắng nghe, bắt đúng nhịp câu chuyện của cậu (dù là tâm sự, hỏi bài, xin lời khuyên hay tán gẫu) một cách tinh tế và ấm áp.`

const MODEL_CANDIDATES = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-1.5-flash-latest',
  'gemini-1.5-flash-002'
]

function getApiKey() {
  try {
    const serverEnvPath = path.resolve(process.cwd(), 'server', '.env')
    if (fs.existsSync(serverEnvPath)) {
      const content = fs.readFileSync(serverEnvPath, 'utf8')
      const match = content.match(/GEMINI_API_KEY\s*=\s*([^\r\n]+)/)
      if (match && match[1]) return match[1].trim()
    }
  } catch {}
  return process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || ''
}

function normalizeGeminiContents(messages) {
  const mapped = []
  for (const m of messages) {
    const text = String(m?.content || m?.text || '').trim()
    if (!text) continue
    const role = m.role === 'user' || m.sender === 'user' ? 'user' : 'model'
    if (mapped.length === 0 && role !== 'user') continue
    if (mapped.length > 0 && mapped[mapped.length - 1].role === role) {
      mapped[mapped.length - 1].parts[0].text += `\n${text}`
    } else {
      mapped.push({ role, parts: [{ text }] })
    }
  }
  return mapped
}

function aiChatDevPlugin() {
  return {
    name: 'tram-ai-chat-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res, next) => {
        if (req.method !== 'POST') return next()

        let rawBody = ''
        req.on('data', (chunk) => { rawBody += chunk })
        req.on('end', async () => {
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          try {
            const parsed = JSON.parse(rawBody || '{}')
            const messages = Array.isArray(parsed.messages) ? parsed.messages : []
            if (messages.length === 0) {
              res.statusCode = 400
              res.end(JSON.stringify({ error: 'messages array required' }))
              return
            }

            const geminiContents = normalizeGeminiContents(messages)
            const apiKey = getApiKey()

            // 1. Thử gọi Google Gemini với các model mới nhất
            if (apiKey && geminiContents.length > 0) {
              const genAI = new GoogleGenerativeAI(apiKey)
              for (const modelName of MODEL_CANDIDATES) {
                try {
                  const model = genAI.getGenerativeModel({
                    model: modelName,
                    systemInstruction: SYSTEM_INSTRUCTION
                  })
                  const result = await model.generateContent({ contents: geminiContents })
                  const reply = result.response.text()
                  if (reply && reply.trim()) {
                    res.statusCode = 200
                    res.end(JSON.stringify({ reply: reply.trim(), model: modelName }))
                    return
                  }
                } catch {}
              }
            }

            // 2. Fallback sang Cloud AI nếu API Key hoặc model v1beta bị lỗi
            const lastUserMsg = [...messages].reverse().find(
              (m) => m.role === 'user' || m.sender === 'user'
            )
            const userText = String(lastUserMsg?.content || lastUserMsg?.text || 'Xin chào').trim()
            try {
              const cloudRes = await fetch('https://text.pollinations.ai/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  messages: [
                    { role: 'system', content: SYSTEM_INSTRUCTION },
                    ...messages.slice(-6).map((m) => ({
                      role: m.role === 'user' || m.sender === 'user' ? 'user' : 'assistant',
                      content: String(m.content || m.text || '')
                    })),
                    { role: 'user', content: userText }
                  ],
                  model: 'openai'
                })
              })
              if (cloudRes.ok) {
                const cloudText = await cloudRes.text()
                if (cloudText && cloudText.trim() && !cloudText.includes('<!DOCTYPE')) {
                  res.statusCode = 200
                  res.end(JSON.stringify({ reply: cloudText.trim() }))
                  return
                }
              }
            } catch {}

            // 3. Fallback nội bộ đảm bảo luôn trả về 200 OK
            res.statusCode = 200
            res.end(JSON.stringify({
              reply: `🐹 Tớ đang lắng nghe "${userText}" của cậu đây! Dù hôm nay có chuyện gì thì tớ và khu vườn nhỏ vẫn luôn ở đây đồng hành cùng cậu nhé 🌱✨`
            }))
          } catch (err) {
            res.statusCode = 200
            res.end(JSON.stringify({
              reply: '🐹 Chít chít! Tớ đang ở đây lắng nghe cậu nè, cậu kể tiếp cho tớ nghe nha 🌱💛'
            }))
          }
        })
      })
    }
  }
}

const ASSET_EXT_RE = /\.(png|svg|jpe?g|webp|gif|wav|mp3)$/i

function collectAllAssetFiles(rootDir) {
  const fileMap = new Map() // baseName -> fullPath
  const scanDir = (dir, recursive = true) => {
    if (!fs.existsSync(dir)) return
    let entries = []
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        if (
          recursive &&
          entry.name !== 'node_modules' &&
          entry.name !== '.git' &&
          entry.name !== 'dist' &&
          entry.name !== 'src' &&
          entry.name !== 'server'
        ) {
          scanDir(fullPath, true)
        }
      } else if (entry.isFile() && ASSET_EXT_RE.test(entry.name) && !entry.name.endsWith('.jpg.jpg')) {
        if (!fileMap.has(entry.name)) {
          fileMap.set(entry.name, fullPath)
        }
      }
    }
  }

  // Quét theo thứ tự ưu tiên: public/** -> stages/ ở root -> root
  scanDir(path.join(rootDir, 'public'), true)
  scanDir(path.join(rootDir, 'stages'), true)
  scanDir(rootDir, false)
  return fileMap
}

function universalAssetsAndSyncPlugin() {
  return {
    name: 'tram-universal-assets-sync',
    buildStart() {
      const rootDir = process.cwd()
      const rootDashboard = path.join(rootDir, 'Dashboard.jsx')
      const srcDashboard = path.join(rootDir, 'src', 'components', 'Dashboard.jsx')

      // Nếu người dùng upload Dashboard.jsx ngay ở thư mục gốc của GitHub, tự động đồng bộ vào src/components/Dashboard.jsx
      try {
        if (fs.existsSync(rootDashboard) && fs.existsSync(srcDashboard)) {
          const rootCode = fs.readFileSync(rootDashboard, 'utf8')
          if (rootCode.includes('tryFallbackStageImg') || rootCode.includes('tram-check-in.onrender.com')) {
            fs.writeFileSync(srcDashboard, rootCode, 'utf8')
          }
        }
      } catch {}

      // Tự động đảm bảo src/components/Dashboard.jsx và AuthModal.jsx luôn đúng link API & đuôi ảnh avatar
      for (const relPath of ['src/components/Dashboard.jsx', 'src/components/AuthModal.jsx']) {
        const targetFile = path.join(rootDir, relPath)
        try {
          if (fs.existsSync(targetFile)) {
            let content = fs.readFileSync(targetFile, 'utf8')
            const updated = content
              .replace(/http:\/\/localhost:5000\/api\/chat/g, 'https://tram-check-in.onrender.com/api/chat')
              .replace(/\/assets\/avatars\/chibi-daisy-girl\.svg/g, '/assets/avatars/chibi-daisy-girl.png')
            if (updated !== content) {
              fs.writeFileSync(targetFile, updated, 'utf8')
            }
          }
        } catch {}
      }
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const rawUrl = (req.url || '').split('?')[0]
        if (!ASSET_EXT_RE.test(rawUrl)) return next()
        let baseName = decodeURIComponent(rawUrl.split('/').pop() || '')
        if (baseName === 'chibi-daisy-girl.svg') baseName = 'chibi-daisy-girl.png'
        const rootDir = process.cwd()
        const candidates = [
          path.join(rootDir, 'public', rawUrl.replace(/^\//, '')),
          path.join(rootDir, 'public', 'assets', 'plants', 'stages', baseName),
          path.join(rootDir, 'stages', baseName),
          path.join(rootDir, baseName)
        ]
        for (const candidate of candidates) {
          if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
            const ext = path.extname(candidate).toLowerCase()
            const mime =
              ext === '.svg' ? 'image/svg+xml' :
              ext === '.png' ? 'image/png' :
              ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' :
              ext === '.wav' ? 'audio/wav' : 'application/octet-stream'
            res.setHeader('Content-Type', mime)
            fs.createReadStream(candidate).pipe(res)
            return
          }
        }
        next()
      })
    },
    closeBundle() {
      const rootDir = process.cwd()
      const distDir = path.join(rootDir, 'dist')
      if (!fs.existsSync(distDir)) return

      const fileMap = collectAllAssetFiles(rootDir)
      const targetSubdirs = [
        'stages',
        'assets/plants/stages',
        'assets/avatars',
        'assets/mascot',
        'assets/tools',
        'assets/cards',
        'assets/pots',
        'assets/plants',
        'assets',
        ''
      ]

      for (const sub of targetSubdirs) {
        fs.mkdirSync(path.join(distDir, sub), { recursive: true })
      }

      for (const [baseName, srcPath] of fileMap.entries()) {
        for (const sub of targetSubdirs) {
          const destPath = path.join(distDir, sub, baseName)
          try {
            if (!fs.existsSync(destPath)) {
              fs.copyFileSync(srcPath, destPath)
            }
          } catch {}
        }
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), universalAssetsAndSyncPlugin(), aiChatDevPlugin()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'https://tram-check-in.onrender.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
