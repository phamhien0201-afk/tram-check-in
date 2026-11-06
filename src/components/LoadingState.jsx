import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSurveyStore } from '../store/useSurveyStore';

export const LoadingState = () => {
  const showReceipt = useSurveyStore((state) => state.showReceipt);
  const [subTextIndex, setSubTextIndex] = useState(0);

  const subTexts = [
    "Đang phân tích hệ tư tưởng...",
    "Giải mã sóng não TikTok S-O-R...",
    "Đo lường hàm lượng FOMO và áp lực đồng trang lứa...",
    "Khởi tạo hóa đơn thiệt hại cảm xúc..."
  ];

  useEffect(() => {
    // Luân chuyển subtext tạo cảm giác xử lý dữ liệu định lượng
    const textInterval = setInterval(() => {
      setSubTextIndex((prev) => (prev + 1) % subTexts.length);
    }, 600);

    // Kéo dài đúng 2.5 giây (2500ms) rồi chuyển sang màn hình Hóa đơn (ReceiptResult)
    const timer = setTimeout(() => {
      showReceipt();
    }, 2500);

    return () => {
      clearInterval(textInterval);
      clearTimeout(timer);
    };
  }, [showReceipt]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[580px] p-6 text-center select-none">
      {/* Khung máy in và giấy đang in ra */}
      <div className="relative mb-8">
        {/* Hào quang nền */}
        <div className="absolute -inset-6 bg-purple-400/30 rounded-full blur-2xl animate-pulse" />

        {/* Máy in 🖨️ nhấp nháy & nảy nhẹ */}
        <motion.div
          animate={{
            y: [-6, 6, -6],
            scale: [1, 1.05, 1]
          }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "easeInOut"
          }}
          className="relative text-7xl sm:text-8xl filter drop-shadow-xl"
        >
          🖨️
        </motion.div>

        {/* Tờ giấy in trồi ra từ máy */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 40, opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
          className="w-16 bg-white border border-slate-400 rounded-b shadow-sm mx-auto -mt-2 overflow-hidden flex flex-col items-center justify-center p-1"
        >
          <div className="w-10 h-1 bg-slate-300 rounded mb-1" />
          <div className="w-8 h-1 bg-purple-300 rounded" />
        </motion.div>
      </div>

      {/* Dòng chữ monospace nhấp nháy theo yêu cầu */}
      <div className="space-y-3 max-w-xs">
        <motion.p
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut" }}
          className="font-mono text-base sm:text-lg font-bold text-slate-900 tracking-tight"
        >
          {subTexts[subTextIndex]}
        </motion.p>

        {/* Thanh loading chấm pixel */}
        <div className="flex justify-center gap-1.5 pt-2">
          {[0, 1, 2, 3].map((dot) => (
            <motion.div
              key={dot}
              animate={{
                scale: [1, 1.4, 1],
                backgroundColor: ["#cbd5e1", "#a18cd1", "#cbd5e1"]
              }}
              transition={{
                repeat: Infinity,
                duration: 0.8,
                delay: dot * 0.15
              }}
              className="w-2.5 h-2.5 rounded-full bg-slate-300"
            />
          ))}
        </div>

        <p className="font-mono text-xs text-slate-500 pt-3">
          Vui lòng đợi 2.5s để xuất bill hóa đơn...
        </p>
      </div>
    </div>
  );
};
