'use client';

import { motion } from 'framer-motion';

interface AdBannerProps {
  className?: string;
}

export default function AdBanner({ className = '' }: AdBannerProps) {
  return (
    <motion.div
      className={`bg-gradient-to-r from-mystic-500/20 to-crystalPurple-500/20 border border-mystic-500/30 rounded-xl p-4 text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-center space-x-2 mb-2">
        <span className="text-mystic-300 text-sm font-medium">広告</span>
        <span className="text-white/40 text-xs">Sponsored</span>
      </div>
      <p className="text-white/80 text-sm mb-3">
        Plusプランにアップグレードして広告を非表示に
      </p>
      <motion.a
        href="/pricing"
        className="inline-block bg-gradient-to-r from-mystic-500 to-crystalPurple-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-all duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        プランを見る
      </motion.a>
    </motion.div>
  );
} 