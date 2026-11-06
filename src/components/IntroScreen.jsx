import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSurveyStore } from '../store/useSurveyStore';
import { Sparkles, UserCircle, CalendarHeart, X, Wind, Activity, ShieldCheck, HeartHandshake } from 'lucide-react';

export const IntroScreen = () => {
  const { startSurvey, setStep, openAuth, isLoggedIn } = useSurveyStore();
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [emotion, setEmotion] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col min-h-screen select-none relative bg-gradient-to-br from-[#fff0f6] via-[#fcfbff] to-[#f0edff]"
    >
      {/* TOP NAVBAR */}
      <header className="w-full border-b border-purple-100/60 bg-white/60 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🧠✨</span>
            <div>
              <span className="font-extrabold text-sm sm:text-base text-[#4a406e] tracking-tight block">
                Trạm Check-in Cảm Xúc
              </span>
              <span className="text-[10px] font-mono text-[#8b7fd6] uppercase tracking-wider block">
                TikTok S-O-R Research V2.0
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => (isLoggedIn ? setStep('dashboard') : openAuth())}
              className="px-3.5 py-2 sm:px-4 sm:py-2 bg-white hover:bg-purple-50 rounded-full text-xs font-bold text-[#8b7fd6] shadow-sm border border-[#e5e0fa] flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <UserCircle size={16} />
              <span>Đăng nhập / Check-in</span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION DESKTOP GRID */}
      <div className="flex-1 flex items-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 md:py-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Descriptions, Badges, CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-purple-200 text-purple-700 text-xs font-bold shadow-xs">
              <Activity size={14} className="text-[#8b7fd6] animate-pulse" />
              <span>Mô hình nghiên cứu định lượng S-O-R</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#4a406e] leading-[1.15] tracking-tight">
              Hệ Cháy hay <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b9e] to-[#a18cd1]">Hệ Chill</span>?
            </h1>

            <p className="text-[#6d638e] text-base sm:text-lg font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
              Giải mã sóng não TikTok của bạn trước ma trận Flexing, FOMO và Áp lực đồng trang lứa qua thang đo tâm lý chuẩn định lượng 18 câu.
            </p>

            {/* Feature Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="p-3 bg-white/80 rounded-2xl border border-purple-100 shadow-xs flex items-center gap-2.5">
                <span className="text-xl">📱</span>
                <div>
                  <p className="text-[11px] font-bold text-slate-800">Biến S</p>
                  <p className="text-[10px] text-slate-500">Tiêu thụ Flexing</p>
                </div>
              </div>

              <div className="p-3 bg-white/80 rounded-2xl border border-purple-100 shadow-xs flex items-center gap-2.5">
                <span className="text-xl">😰</span>
                <div>
                  <p className="text-[11px] font-bold text-slate-800">Biến O</p>
                  <p className="text-[10px] text-slate-500">FOMO & Áp lực</p>
                </div>
              </div>

              <div className="p-3 bg-white/80 rounded-2xl border border-purple-100 shadow-xs flex items-center gap-2.5">
                <span className="text-xl">🌸</span>
                <div>
                  <p className="text-[11px] font-bold text-slate-800">Vườn Sinh Tồn</p>
                  <p className="text-[10px] text-slate-500">Chữa lành tâm trí</p>
                </div>
              </div>
            </div>

            {/* Call to action */}
            <div className="pt-4 space-y-3">
              <motion.button
                onClick={startSurvey}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#8b7fd6] via-[#b395e8] to-[#ff8fb8] text-white font-extrabold text-base sm:text-lg shadow-lg shadow-purple-200 flex items-center justify-center gap-2.5 cursor-pointer hover:shadow-xl transition-all"
              >
                <Sparkles className="text-yellow-200" size={20} />
                <span>Khám phá sóng não ngay</span>
              </motion.button>
              
              <div className="flex items-center justify-center lg:justify-start gap-4 text-[11px] font-mono text-[#8b7fd6]">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={13} className="text-emerald-600" /> Khảo sát ẩn danh 100%
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <HeartHandshake size={13} className="text-rose-500" /> Căn cứ thang đo SPSS
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual 3D Floating Brain with Decorative Orbit Pills */}
          <div className="lg:col-span-5 flex justify-center items-center py-6">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-square flex items-center justify-center">
              {/* Radial gradient aura */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#ffe6f0] via-[#ede9fe] to-[#e0f2fe] rounded-full blur-3xl opacity-80 animate-pulse" />
              
              {/* 3D Floating Brain */}
              <motion.div
                animate={{ y: [-12, 12, -12], rotate: [-3, 3, -3] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                className="text-8xl sm:text-9xl lg:text-[140px] drop-shadow-2xl z-10 cursor-pointer select-none"
              >
                🧠✨
              </motion.div>

              {/* Orbiting Mood Tags */}
              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{ repeat: Infinity, duration: 3.5 }}
                className="absolute top-4 left-2 sm:left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-md border border-purple-100 text-xs font-bold text-emerald-700 flex items-center gap-1.5 z-20"
              >
                <span>🍵</span> Hệ Chill
              </motion.div>

              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute top-12 right-0 sm:right-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-md border border-purple-100 text-xs font-bold text-rose-600 flex items-center gap-1.5 z-20"
              >
                <span>🌪️</span> Overthinking
              </motion.div>

              <motion.div
                animate={{ y: [8, -8, 8] }}
                transition={{ repeat: Infinity, duration: 3.8 }}
                className="absolute bottom-6 left-6 sm:left-8 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-md border border-purple-100 text-xs font-bold text-purple-700 flex items-center gap-1.5 z-20"
              >
                <span>🪨</span> Nô Lệ Cột Sống
              </motion.div>

              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ repeat: Infinity, duration: 3.2 }}
                className="absolute bottom-8 right-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-md border border-purple-100 text-xs font-bold text-amber-600 flex items-center gap-1.5 z-20"
              >
                <span>🦦</span> Chiến Thần Vô Tri
              </motion.div>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="w-full py-4 text-center text-xs text-[#9c93be] border-t border-purple-100/60 bg-white/40">
        <p className="max-w-6xl mx-auto px-4">
          Nghiên cứu khoa học về tác động của TikTok đến FOMO & Áp lực thành đạt của thế hệ Z (Mô hình S-O-R)
        </p>
      </footer>

      {/* POPUP CHECK-IN MODAL */}
      <AnimatePresence>
        {showCheckIn && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2b2353]/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#e5e0fa]"
            >
              <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100">
                <h3 className="font-black text-[#4a406e] flex items-center gap-2 text-base sm:text-lg">
                  <CalendarHeart className="text-[#ff8fb8]" /> Check-in Tâm Trạng Hôm Nay
                </h3>
                <button
                  onClick={() => setShowCheckIn(false)}
                  className="bg-[#f0edff] text-[#8b7fd6] p-1.5 rounded-full cursor-pointer hover:bg-[#e4deff]"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold text-[#7d749e] mb-2.5">1. Cảm xúc hiện tại của bạn là gì?</p>
                  <div className="grid grid-cols-3 gap-2.5">
                    {['😊 Vui vẻ', '😔 Buồn chán', '🤯 Áp lực'].map(emo => (
                      <button
                        key={emo}
                        onClick={() => setEmotion(emo)}
                        className={`py-3 px-2 text-xs font-bold rounded-2xl border-2 transition-all cursor-pointer ${
                          emotion === emo
                            ? 'border-[#ff8fb8] bg-[#fff0f6] text-[#ff6b9e] shadow-xs'
                            : 'border-[#f4f0fa] bg-[#faf9ff] text-[#7d749e] hover:border-purple-200'
                        }`}
                      >
                        {emo}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-[#7d749e] mb-2">2. Điều gì đang diễn ra trong đầu bạn?</p>
                  <textarea
                    placeholder="Viết vài dòng chia sẻ xả stress nhé (không phán xét)..."
                    className="w-full p-4 rounded-2xl bg-[#faf9ff] border-2 border-[#f4f0fa] text-xs h-28 outline-none focus:border-[#8b7fd6] text-slate-700 resize-none transition"
                  />
                </div>

                {emotion === '🤯 Áp lực' && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-[#e6f9f1] border border-[#bbf2d5] rounded-2xl text-xs text-[#2d8a5c]"
                  >
                    <span className="font-bold flex items-center gap-1.5 mb-1 text-sm">
                      <Wind size={16} /> Gợi ý thư giãn cấp tốc (4-7-8):
                    </span>
                    Hãy hít vào bằng mũi trong 4 giây, giữ hơi trong 7 giây, và từ từ thở ra bằng miệng trong 8 giây. Cơ thể bạn sẽ dịu lại ngay!
                  </motion.div>
                )}

                <div className="pt-2">
                  <motion.button
                    onClick={() => {
                      alert('Đã lưu nhật ký cảm xúc!');
                      setShowCheckIn(false);
                      setStep('dashboard');
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-4 bg-gradient-to-r from-[#8b7fd6] to-[#a398e0] text-white rounded-2xl font-bold text-sm sm:text-base flex justify-center items-center cursor-pointer shadow-md hover:opacity-95"
                  >
                    Ghi nhận & Vào Vườn Ngay 🌸
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
