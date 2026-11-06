import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSurveyStore } from '../store/useSurveyStore';
import { SURVEY_QUESTIONS } from '../data/surveyQuestions';
import { ChevronRight, ArrowLeft } from 'lucide-react';

export const SurveyEngine = () => {
  const currentQuestionIndex = useSurveyStore((state) => state.currentQuestionIndex);
  const selectedOptionValue = useSurveyStore((state) => state.selectedOptionValue);
  const chooseAnswer = useSurveyStore((state) => state.chooseAnswer);
  const resetAll = useSurveyStore((state) => state.resetAll);

  const currentQ = SURVEY_QUESTIONS[currentQuestionIndex];
  const totalQuestions = SURVEY_QUESTIONS.length;
  const progressPercent = Math.round(((currentQuestionIndex) / totalQuestions) * 100);

  // Variant gạt thẻ (swipe) sang trái với Framer Motion
  const cardVariants = {
    initial: { opacity: 0, x: 80, scale: 0.96 },
    animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
    exit: { opacity: 0, x: -90, scale: 0.96, transition: { duration: 0.3, ease: "easeIn" } }
  };

  return (
    <div className="flex flex-col min-h-[580px] p-5 justify-between select-none">
      {/* Header: Nút thoát & Thanh tiến độ (Progress Bar) */}
      <div className="w-full space-y-3 pt-1">
        <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-700">
          <button
            onClick={resetAll}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={14} /> Trở về
          </button>
          
          <span className="px-2.5 py-0.5 rounded-full bg-white/80 border border-purple-200 text-purple-700 font-bold">
            Câu {currentQuestionIndex + 1} / {totalQuestions}
          </span>
        </div>

        {/* Thanh ngang bo góc, đổ đầy gradient pastel theo tiến độ */}
        <div className="w-full h-3 bg-white/60 backdrop-blur-sm rounded-full p-0.5 border border-purple-200 overflow-hidden shadow-inner">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#a18cd1] to-[#fbc2eb] shadow-sm"
            initial={{ width: `${progressPercent}%` }}
            animate={{ width: `${Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Card câu hỏi chuyển cảnh Swipe Left bằng AnimatePresence */}
      <div className="my-auto py-4 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ.id}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-y2k border-2 border-slate-900 flex flex-col gap-4"
          >
            {/* Nhãn phân loại biến nghiên cứu S-O-R */}
            <div className="flex items-center justify-between">
              <span className="inline-block px-2.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-purple-800 bg-purple-100/90 rounded-md border border-purple-300">
                {currentQ.dimensionLabel}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                SPSS: {currentQ.codeSPSS}
              </span>
            </div>

            {/* Nội dung câu hỏi */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {currentQ.question}
              </h2>
              {currentQ.subtitle && (
                <p className="text-xs text-slate-500 font-medium mt-1">
                  {currentQ.subtitle}
                </p>
              )}
            </div>

            {/* Danh sách các lựa chọn (Options) */}
            <div className="flex flex-col gap-2.5 pt-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOptionValue === opt.value;

                return (
                  <motion.button
                    key={idx}
                    onClick={() => chooseAnswer(currentQ.id, opt.value)}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group shadow-sm ${
                      isSelected
                        ? "border-[#a18cd1] bg-purple-50 text-purple-950 shadow-y2k ring-2 ring-[#a18cd1]/50"
                        : "border-slate-300 bg-white hover:border-slate-800 hover:bg-slate-50 text-slate-800"
                    }`}
                  >
                    <div className="flex flex-col pr-2">
                      <span className="font-bold text-sm sm:text-base leading-snug">
                        {opt.text}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        Điểm Likert: {opt.value}/5
                      </span>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
                        isSelected
                          ? "bg-[#a18cd1] text-white"
                          : "bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-700"
                      }`}
                    >
                      <ChevronRight size={16} />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer gợi ý nhỏ */}
      <div className="text-center text-[11px] font-mono text-slate-500 pb-1">
        Chọn đáp án đúng nhất với phản xạ đầu tiên của bạn 🧠
      </div>
    </div>
  );
};
