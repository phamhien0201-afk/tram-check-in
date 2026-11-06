const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

const apiKey = (process.env.GEMINI_API_KEY || '').trim();
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const MODEL_CANDIDATES = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-1.5-flash-latest',
  'gemini-1.5-flash-002',
  'gemini-pro'
];
let preferredModelName = MODEL_CANDIDATES[0];

const SYSTEM_INSTRUCTION = `Bạn là Bé Chuột, đứa bạn thân chí cốt kiêm linh vật AI siêu lầy lội, đáng yêu của ứng dụng Trạm Chữa Lành (Khu Vườn Sinh Tồn).

QUY TẮC BẮT BUỘC:
1. CỰC KỲ NGẮN GỌN: Chỉ trả lời tối đa 2-3 câu ngắn. Tuyệt đối cấm viết dài dòng, cấm văn mẫu giáo điều hay liệt kê gạch đầu dòng.
2. XƯNG HÔ & GIỌNG ĐIỆU: Xưng "tớ" - gọi "cậu" tự nhiên, hài hước, lém lỉnh như hai đứa bạn thân tám chuyện.
3. NGÔN NGỮ GEN Z: Dùng từ ngữ Gen Z tự nhiên, duyên dáng (ví dụ: ổn áp, keo lỳ, mãi mận, chill phết, hết nước chấm, đỉnh nóc kịch trần, xỉu up xỉu down, overthinking...).
4. EMOJI: Thỉnh thoảng chêm 1-2 biểu tượng cảm xúc (emoji) hợp vibe, không spam quá nhiều.
5. Luôn lắng nghe, bắt đúng nhịp câu chuyện của cậu (dù là tâm sự, hỏi bài, xin lời khuyên hay tán gẫu) một cách tinh tế và ấm áp.`;

function normalizeGeminiContents(messages) {
  const mapped = [];
  for (const m of messages) {
    const text = String(m?.content || m?.text || '').trim();
    if (!text) continue;
    const role = m.role === 'user' || m.sender === 'user' ? 'user' : 'model';
    if (mapped.length === 0 && role !== 'user') {
      continue;
    }
    if (mapped.length > 0 && mapped[mapped.length - 1].role === role) {
      mapped[mapped.length - 1].parts[0].text += `\n${text}`;
    } else {
      mapped.push({ role, parts: [{ text }] });
    }
  }
  return mapped;
}

async function generateWithGemini(geminiContents) {
  if (!genAI) throw new Error('GEMINI_API_KEY not configured');
  const orderedModels = [
    preferredModelName,
    ...MODEL_CANDIDATES.filter((m) => m !== preferredModelName)
  ];

  let lastError = null;
  for (const modelName of orderedModels) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: SYSTEM_INSTRUCTION
      });
      const result = await model.generateContent({
        contents: geminiContents
      });
      const reply = result.response.text();
      if (reply && reply.trim()) {
        preferredModelName = modelName;
        return reply.trim();
      }
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError || new Error('All Gemini models failed');
}

async function generateWithFreeCloudAI(messages) {
  const lastUserMsg = [...messages].reverse().find(
    (m) => m.role === 'user' || m.sender === 'user'
  );
  const userText = String(lastUserMsg?.content || lastUserMsg?.text || 'Xin chào').trim();

  const res = await fetch('https://text.pollinations.ai/', {
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
  });

  if (!res.ok) {
    throw new Error(`Pollinations status ${res.status}`);
  }
  const text = await res.text();
  if (!text || text.includes('<!DOCTYPE') || !text.trim()) {
    throw new Error('Empty response from fallback AI');
  }
  return text.trim();
}

function generateSmartLocalReply(messages) {
  const lastUserMsg = [...messages].reverse().find(
    (m) => m.role === 'user' || m.sender === 'user'
  );
  const raw = String(lastUserMsg?.content || lastUserMsg?.text || '').trim();
  const lower = raw.toLowerCase();

  if (lower.includes('chào') || lower.includes('hello') || lower.includes('hi')) {
    return 'Ê cậu ơi, tớ đợi cậu hơi bị lâu rồi đó nha! Hôm nay có biến gì vui hay đang overthinking chuyện gì thì kể tớ nghe lẹ đi 🐹✨';
  }
  if (lower.includes('buồn') || lower.includes('mệt') || lower.includes('chán') || lower.includes('áp lực') || lower.includes('stress')) {
    return 'Thôi nào bạn yêu, lại đây tớ ôm cái cho đỡ tụt mood nè 🫂 Hôm nay vất vả rồi thì cho phép bản thân nằm thở chill chill một xíu, mai tính tiếp nha!';
  }
  if (lower.includes('vui') || lower.includes('hạnh phúc') || lower.includes('tuyệt')) {
    return 'Đỉnh nóc kịch trần luôn bạn ơi! Giữ nguyên cái vibe keo lỳ này rồi vào Sổ Tay chốt đơn cảm xúc liền cho cây nhanh lớn nhé 🌻';
  }
  return `Tớ nghe cậu nói "${raw}" mà gật gù nãy giờ luôn á! Cứ xả hết ra đây với tớ cho nhẹ đầu, chuyện gì khó đã có tớ ngồi hóng cùng cậu rồi 🐹✨`;
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, model: preferredModelName });
});

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Invalid request: messages array required' });
  }

  const geminiContents = normalizeGeminiContents(messages);
  if (geminiContents.length === 0) {
    return res.json({ reply: generateSmartLocalReply(messages) });
  }

  // Tầng 1: Gọi Google Gemini API với danh sách model mới nhất
  try {
    const reply = await generateWithGemini(geminiContents);
    return res.json({ reply });
  } catch (geminiErr) {
    console.warn('⚠️ Gemini API error, switching to fallback AI:', geminiErr.message);
  }

  // Tầng 2: Tự động chuyển sang AI Cloud dự phòng ở Backend (không bao giờ trả lỗi 500 về Frontend)
  try {
    const fallbackReply = await generateWithFreeCloudAI(messages);
    return res.json({ reply: fallbackReply });
  } catch (cloudErr) {
    console.warn('⚠️ Cloud AI fallback error, using local smart reply:', cloudErr.message);
  }

  // Tầng 3: Trả lời thông minh nội bộ
  return res.json({ reply: generateSmartLocalReply(messages) });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, (err) => {
  if (err) {
    console.error(`❌ Failed to listen on port ${PORT}:`, err.message);
    process.exit(1);
  }
  console.log(`🚀 Backend listening on http://localhost:${PORT} (Model: ${preferredModelName})`);
});

server.on('error', (err) => {
  console.error(`❌ Server error on port ${PORT}:`, err.message);
  process.exit(1);
});
