'use client';

import { motion } from 'framer-motion';
import { ClockIcon } from '@heroicons/react/24/outline';

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-midnight-950 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          className="bg-surface-900 border border-surface-800 rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* ヘッダー */}
          <div className="p-6 border-b border-surface-800">
            <h1 className="text-2xl font-mystical text-royalGold-400 mb-2">
              占い履歴
            </h1>
            <p className="text-white/60 text-sm">
              過去の占い結果を確認できます
            </p>
          </div>

          {/* プレースホルダー */}
          <div className="p-12 text-center">
            <motion.div
              className="w-24 h-24 bg-surface-800 rounded-full flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ClockIcon className="w-12 h-12 text-white/40" />
            </motion.div>
            <h2 className="text-xl font-semibold text-white mb-4">
              占い履歴がまだありません
            </h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              初回の占いを実行すると、ここに履歴が表示されます。
              占い結果は自動的に保存され、いつでも確認できます。
            </p>
            <motion.a
              href="/flow"
              className="inline-block bg-gradient-to-r from-mystic-500 to-crystalPurple-500 text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              初回占いを始める
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 