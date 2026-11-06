import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useSurveyStore } from '../store/useSurveyStore';
import { exportReceiptToImage } from '../utils/exportImage';
import { Download, Sparkles, RotateCcw, Share2, Award, Zap, AlertCircle, ArrowRight } from 'lucide-react';

export const ReceiptResult = () => {
  const receiptRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);

  const results = useSurveyStore((state) => state.results);
  const goToDashboard = useSurveyStore((state) => state.goToDashboard);
  const startSurvey = useSurveyStore((state) => state.startSurvey);
  const resetAll = useSurveyStore((state) => state.resetAll);

  // Dự phòng: lấy kết quả từ localStorage nếu state tạm thời rỗng
  const effectiveResults = results || (() => {
    try {
      const session = JSON.parse(localStorage.getItem('tram_chua_lanh_session'));
      return (session && JSON.parse(localStorage.getItem(`tram_survey_${session}`))) ||
             JSON.parse(localStorage.getItem('tram_latest_survey_result'));
    } catch { return null; }
  })();

  if (!effectiveResults) return null;

  const { sStats, fomoStats, pressureStats, rStats, persona } = effectiveResults;

  // Xử lý xuất ảnh hoá đơn bằng html2canvas
  const handleSaveBill = async () => {
    if (!receiptRef.current) return;
    setIsExporting(true);
    await exportReceiptToImage(receiptRef.current, `hoa-don-cam-xuc-${persona.title.toLowerCase().replace(/\s+/g, '-')}.png`);
    setIsExporting(false);
  };

  // Ngày giờ hiện tại định dạng bill
  const now = new Date();
  const formattedDate = `${now.toLocaleDateString('vi-VN')} ${now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`;

  const totalDamagePercent = Math.round((sStats.percentage + fomoStats.percentage + pressureStats.percentage + rStats.percentage) / 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full min-h-screen flex flex-col justify-between py-6 px-4 sm:px-8 select-none"
    >
      {/* Top Header */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between pb-4 border-b border-purple-100">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧾</span>
          <div>
            <h1 className="text-base sm:text-lg font-black text-slate-800">
              Biên Lai Đo Lường Sóng Não S-O-R
            </h1>
            <p className="text-[11px] font-mono text-purple-600">
              Chi nhánh FYP TikTok Thế Hệ Z
            </p>
          </div>
        </div>

        <button
          onClick={resetAll}
          className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 py-1.5 px-3 rounded-full hover:bg-white border border-transparent hover:border-slate-200 transition cursor-pointer"
        >
          <RotateCcw size={14} />
          <span className="hidden sm:inline">Khảo sát lại</span>
        </button>
      </div>

      {/* Main Desktop Grid */}
      <div className="max-w-6xl mx-auto w-full py-6 md:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: The Thermal Receipt Paper */}
        <div className="lg:col-span-5 flex justify-center w-full">
          <div
            ref={receiptRef}
            className="receipt-sawtooth-top receipt-sawtooth-bottom w-full max-w-md bg-white text-slate-900 font-mono px-6 sm:px-8 pt-7 pb-16 shadow-receipt relative border-x border-slate-200"
            style={{ fontFamily: '"Space Mono", monospace' }}
          >
            {/* Header Biên lai */}
            <div className="text-center space-y-1.5 pb-4 border-b-2 border-dashed border-slate-300">
              <h2 className="text-lg font-black tracking-tighter uppercase">
                TRẠM CHECK-IN CẢM XÚC
              </h2>
              <p className="text-[11px] text-slate-500 uppercase tracking-widest">
                CHI NHÁNH: FYP TIKTOK THẾ HỆ Z
              </p>
              <div className="text-[10px] text-slate-400 flex justify-between pt-1 font-mono">
                <span>HĐ: #{Math.floor(100000 + Math.random() * 900000)}</span>
                <span>{formattedDate}</span>
              </div>
            </div>

            {/* Tiêu đề bảng */}
            <div className="py-2 flex justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <span>CHỈ SỐ TÂM LÝ (S-O-R)</span>
              <span>MỨC ĐỘ / ĐIỂM</span>
            </div>

            {/* Lưới dữ liệu (Itemized Grid) */}
            <div className="py-3 space-y-2.5 text-xs">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold">Tiếp xúc Flexing (S)</p>
                  <p className="text-[10px] text-slate-400">Clip chủ tịch & làm giàu</p>
                </div>
                <div className="text-right">
                  <span className="font-bold">{sStats.percentage}%</span>
                  <p className="text-[10px] text-slate-500">{sStats.mean}/5.0</p>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold">Sợ Bỏ Lại (O - FOMO)</p>
                  <p className="text-[10px] text-slate-400">Tâm lý hụt hẫng xã hội</p>
                </div>
                <div className="text-right">
                  <span className="font-bold">{fomoStats.percentage}%</span>
                  <p className="text-[10px] text-slate-500">{fomoStats.mean}/5.0</p>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold">Áp lực Thành Đạt (O)</p>
                  <p className="text-[10px] text-slate-400">Nỗi sợ thất bại tuổi 25</p>
                </div>
                <div className="text-right">
                  <span className="font-bold">{pressureStats.percentage}%</span>
                  <p className="text-[10px] text-slate-500">{pressureStats.mean}/5.0</p>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold">Overthinking (R)</p>
                  <p className="text-[10px] text-slate-400">Vẽ kịch bản lúc 2h sáng</p>
                </div>
                <div className="text-right">
                  <span className="font-bold">{rStats.percentage}%</span>
                  <p className="text-[10px] text-slate-500">{rStats.mean}/5.0</p>
                </div>
              </div>
            </div>

            {/* Phân cách nét đứt */}
            <div className="border-t-2 border-dashed border-slate-300 py-2.5 my-1 text-xs">
              <div className="flex justify-between font-bold text-slate-800">
                <span>TỔNG THIỆT HẠI:</span>
                <span>{totalDamagePercent}% PIN</span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>HÌNH THỨC TT:</span>
                <span>SỰ KIỆT SỨC TÂM HỒN</span>
              </div>
            </div>

            {/* CON DẤU PERSONA (Rubber Stamp Effect) */}
            <div className="py-5 my-2 flex flex-col items-center justify-center relative">
              <motion.div
                initial={{ scale: 2.2, rotate: -25, opacity: 0 }}
                animate={{ scale: 1, rotate: -4, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 350, damping: 20 }}
                className="border-4 border-dashed border-rose-600 rounded-xl px-4 py-2.5 text-center bg-rose-50/50 shadow-sm"
              >
                <span className="text-[10px] uppercase font-bold text-rose-500 block tracking-widest">
                  KẾT QUẢ ĐÃ ĐƯỢC CHỨNG THỰC
                </span>
                <span className="text-base sm:text-lg font-black text-rose-600 uppercase tracking-tight block">
                  {persona.title}
                </span>
              </motion.div>

              <p className="text-[10px] text-center text-slate-500 mt-3.5 mb-2 italic leading-relaxed px-3">
                "{persona.description}"
              </p>
            </div>

            {/* Barcode & Thông điệp cuối Bill */}
            <div className="pt-3 pb-2 border-t border-slate-200 text-center space-y-2">
              <div className="w-full h-9 barcode-pattern mx-auto opacity-80" />
              <p className="text-[9px] tracking-widest text-slate-400 uppercase">
                SCAN TO HEAL • TIKTOK S-O-R RESEARCH
              </p>
              <p className="text-[10px] font-bold text-slate-600">
                Cảm ơn bạn đã đóng góp mẫu dữ liệu khoa học!
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Persona Insight Breakdown & Action CTAs */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Persona Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-purple-100 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-2xl">
                  {persona.title.includes('Overthinking') ? '🌪️' : persona.title.includes('Healing') ? '🍵' : persona.title.includes('Vô tri') ? '🦦' : '💼'}
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-purple-600 font-bold block">
                    Phân Tích Persona Nghiên Cứu
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
                    {persona.title}
                  </h2>
                </div>
              </div>
              <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-full border border-purple-200">
                {persona.tagline}
              </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {persona.description}
            </p>
          </div>

          {/* 4 Dimension Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-xs">
              <span className="text-xs font-bold text-slate-500 block mb-1">Tiêu thụ Flex (S)</span>
              <span className="text-2xl font-black text-[#8b7fd6]">{sStats.percentage}%</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">{sStats.mean} / 5.0</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-xs">
              <span className="text-xs font-bold text-slate-500 block mb-1">Sợ Bỏ Lại (FOMO)</span>
              <span className="text-2xl font-black text-amber-500">{fomoStats.percentage}%</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">{fomoStats.mean} / 5.0</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-xs">
              <span className="text-xs font-bold text-slate-500 block mb-1">Áp lực Thành Đạt</span>
              <span className="text-2xl font-black text-rose-500">{pressureStats.percentage}%</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">{pressureStats.mean} / 5.0</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-xs">
              <span className="text-xs font-bold text-slate-500 block mb-1">Overthinking (R)</span>
              <span className="text-2xl font-black text-indigo-500">{rStats.percentage}%</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Phản ứng não bộ</span>
            </div>
          </div>

          {/* Action CTAs Panel */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-purple-100 space-y-4">
            <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <Zap size={16} className="text-purple-600" /> Hành Động Tiếp Theo
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <motion.button
                onClick={handleSaveBill}
                disabled={isExporting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="py-3.5 px-4 bg-white border border-slate-300 hover:border-purple-300 font-bold text-sm rounded-2xl shadow-xs flex items-center justify-center gap-2 cursor-pointer transition text-slate-800"
              >
                <Download size={16} className="text-purple-600" />
                <span>{isExporting ? "Đang xuất bill..." : "Lưu Bill (PNG)"}</span>
              </motion.button>

              <motion.button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Trạm Check-in Cảm Xúc',
                      text: `Tui vừa đo sóng não TikTok, kết quả là ${persona.title} 🤣 Bạn hệ gì?`,
                      url: window.location.href
                    });
                  } else {
                    navigator.clipboard?.writeText(window.location.href);
                    alert("Đã copy link! Gửi cho hội bạn thân ngay nhé 💌");
                  }
                }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="py-3.5 px-4 bg-[#e6f4ff] hover:bg-[#d4edff] text-[#0066cc] border border-[#bce0fd] font-bold text-sm rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition"
              >
                <Share2 size={16} />
                <span>Chia sẻ bạn bè (BB)</span>
              </motion.button>
            </div>

            {/* Big Primary CTA to Garden */}
            <motion.button
              onClick={goToDashboard}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-4 px-6 bg-gradient-to-r from-[#8b7fd6] via-[#a18cd1] to-[#ff8fb8] text-white font-black text-base rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg transition-all"
            >
              <Sparkles size={18} className="text-yellow-200" />
              <span>🌱 Tiếp tục vào Khu Vườn (Trạm Chữa Lành)</span>
              <ArrowRight size={18} />
            </motion.button>

            <motion.button
              onClick={startSurvey}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-3 px-5 bg-slate-50 hover:bg-purple-50 text-slate-600 hover:text-purple-700 border border-slate-200 hover:border-purple-200 font-bold text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <RotateCcw size={15} />
              <span>🔄 Làm lại khảo sát mới (18 câu hỏi)</span>
            </motion.button>
          </div>

        </div>

      </div>

      {/* Subtle Bottom Bar */}
      <div className="max-w-6xl mx-auto w-full pt-4 text-center">
        <button
          onClick={resetAll}
          className="text-slate-400 hover:text-slate-700 text-xs font-medium transition inline-flex items-center gap-1 cursor-pointer py-1"
        >
          <RotateCcw size={13} />
          <span>Về trang chủ Trạm Check-in</span>
        </button>
      </div>
    </motion.div>
  );
};
