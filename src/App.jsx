import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSurveyStore } from './store/useSurveyStore';
import { IntroScreen } from './components/IntroScreen';
import { SurveyEngine } from './components/SurveyEngine';
import { LoadingState } from './components/LoadingState';
import { ReceiptResult } from './components/ReceiptResult';
import { Dashboard } from './components/Dashboard';
import { AuthModal } from './components/AuthModal';

export default function App() {
  const currentStep = useSurveyStore((state) => state.currentStep);

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-[#fff2f7] via-[#faf8fe] to-[#f0edff] text-slate-800 font-sans flex flex-col">
      <div className="w-full flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {currentStep === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full flex-1 flex flex-col"
            >
              <IntroScreen />
            </motion.div>
          )}

          {currentStep === 'survey' && (
            <motion.div
              key="survey"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="w-full flex-1 flex items-center justify-center py-6 px-4"
            >
              <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-purple-100 p-2 sm:p-6">
                <SurveyEngine />
              </div>
            </motion.div>
          )}

          {currentStep === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full flex-1 flex items-center justify-center py-8 px-4"
            >
              <div className="w-full max-w-lg bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-purple-100">
                <LoadingState />
              </div>
            </motion.div>
          )}

          {currentStep === 'receipt' && (
            <motion.div
              key="receipt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full flex-1 flex flex-col"
            >
              <ReceiptResult />
            </motion.div>
          )}

          {currentStep === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full flex-1 flex flex-col"
            >
              <Dashboard />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AuthModal />
    </main>
  );
}
