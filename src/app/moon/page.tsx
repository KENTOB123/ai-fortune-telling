'use client';

import { motion } from 'framer-motion';
import { notFound } from 'next/navigation';
import { isMoonDay, getMoonPhaseName, getMoonRitualMessage } from '@/lib/moonUtils';

export default function MoonPage() {
  // 月の儀式日でない場合は404を表示
  if (!isMoonDay()) {
    notFound();
  }

  const moonPhase = getMoonPhaseName();
  const ritualMessage = getMoonRitualMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight-900 via-midnight-800 to-midnight-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* ヘッダー */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-silver-400 to-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-silver-500/30">
            <span className="text-4xl">🌙</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {moonPhase}の儀式
          </h1>
          <p className="text-xl text-white/60">
            特別な月の力を借りて、願いを叶えましょう
          </p>
        </motion.div>

        {/* メインコンテンツ */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* 儀式の説明 */}
          <div className="bg-gradient-to-br from-silver-500/10 to-white/5 border border-silver-400/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-3xl mr-3">✨</span>
              今日の儀式について
            </h2>
            <p className="text-white/80 leading-relaxed text-lg">
              {ritualMessage}
            </p>
          </div>

          {/* 儀式の手順 */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="text-2xl mr-3">📋</span>
              儀式の手順
            </h3>
            <div className="space-y-6">
              <motion.div
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-8 h-8 bg-mystic-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">準備</h4>
                  <p className="text-white/70">
                    静かな場所で、心を落ち着かせます。願い事を明確にしましょう。
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="w-8 h-8 bg-mystic-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">願い事を書く</h4>
                  <p className="text-white/70">
                    願い事を紙に書き留めます。具体的で前向きな表現にしましょう。
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="w-8 h-8 bg-mystic-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">月の光に当てる</h4>
                  <p className="text-white/70">
                    書いた願い事を月の光に当て、月の力を込めます。
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="w-8 h-8 bg-mystic-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">感謝を捧げる</h4>
                  <p className="text-white/70">
                    月と宇宙に感謝の気持ちを捧げ、願いが叶うことを信じます。
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* 特別な占い */}
          <div className="bg-gradient-to-br from-mystic-500/10 to-crystalPurple-500/10 border border-mystic-500/30 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-2xl mr-3">🔮</span>
              特別な月の占い
            </h3>
            <p className="text-white/80 mb-6">
              {moonPhase}の特別な力を借りて、あなたの運命を読み解きましょう。
            </p>
            <motion.a
              href="/flow?preset=single&teller=seren"
              className="inline-block bg-gradient-to-r from-mystic-500 to-crystalPurple-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {moonPhase}の特別占いを始める
            </motion.a>
          </div>

          {/* 注意事項 */}
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-400/30 rounded-xl p-6">
            <h4 className="text-white font-semibold mb-3 flex items-center">
              <span className="text-xl mr-2">⚠️</span>
              注意事項
            </h4>
            <ul className="text-white/80 space-y-2 text-sm">
              <li>• 儀式は安全な場所で行ってください</li>
              <li>• 火を使用する場合は十分注意してください</li>
              <li>• 願い事は他人を傷つけるものは避けてください</li>
              <li>• 儀式は娯楽目的であり、結果を保証するものではありません</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 