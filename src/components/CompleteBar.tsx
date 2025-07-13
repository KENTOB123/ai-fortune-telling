'use client';

import { motion } from 'framer-motion';

interface CompleteBarProps {
  onStart: () => void;
}

export default function CompleteBar({ onStart }: CompleteBarProps) {
  return (
    <motion.div
      className="fixed bottom-4 inset-x-0 mx-auto w-fit z-40"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className="bg-gradient-to-r from-mystic-500 to-crystalPurple-500 rounded-full shadow-lg shadow-mystic-500/30 border border-mystic-400/30">
        <button
          onClick={onStart}
          className="px-6 py-3 text-white font-semibold flex items-center space-x-2 hover:scale-105 transition-transform"
        >
          <span>✨ 占いを開始</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
} 