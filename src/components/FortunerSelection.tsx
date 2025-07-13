'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { fortuners } from '@/lib/fortuners';

interface FortunerSelectionProps {
  selectedFortuner: string | null;
  onSelect: (fortunerId: string) => void;
}

export default function FortunerSelection({ selectedFortuner, onSelect }: FortunerSelectionProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          あなたの占い師を選んでください
        </h2>
        <p className="text-white/60 text-lg">
          それぞれの占い師が持つ独特の力で、あなたの未来を照らします
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {fortuners.map((fortuner, index) => (
          <motion.div
            key={fortuner.id}
            className={`relative p-6 rounded-xl border-2 transition-all cursor-pointer ${
              selectedFortuner === fortuner.id
                ? 'border-mystic-500 bg-mystic-500/10 shadow-lg shadow-mystic-500/20'
                : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(fortuner.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* 選択インジケーター */}
            {selectedFortuner === fortuner.id && (
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 bg-mystic-500 rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </motion.div>
            )}

            {/* 占い師画像 */}
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/20">
                <Image
                  src={fortuner.imageUrl.replace('.png', '.svg')}
                  alt={`${fortuner.name} - ${fortuner.title}`}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // 画像読み込みエラー時のフォールバック
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                {/* フォールバック */}
                <div className="hidden w-full h-full bg-gradient-to-br from-mystic-400 to-mystic-600 flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">
                    {fortuner.name.charAt(0)}
                  </span>
                </div>
              </div>
              
              {/* 光沢効果 */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
              />
            </div>

            {/* 占い師情報 */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-1">
                {fortuner.name}
              </h3>
              <p className="text-mystic-300 text-sm font-medium mb-2">
                {fortuner.title}
              </p>
              <p className="text-white/80 text-xs mb-3 italic">
                "{fortuner.tagline}"
              </p>
              <p className="text-white/60 text-xs mb-4">
                {fortuner.description}
              </p>

              {/* 専門分野 */}
              <div className="mb-4">
                <p className="text-white/60 text-xs mb-2">専門分野:</p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {fortuner.specialties.map((specialty, specialtyIndex) => (
                    <span
                      key={specialtyIndex}
                      className="px-2 py-1 bg-mystic-500/20 text-mystic-300 text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* 性格 */}
              <p className="text-white/50 text-xs italic">
                "{fortuner.personality}"
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedFortuner && (
        <motion.div
          className="text-center p-4 bg-mystic-500/10 border border-mystic-500/30 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-white">
            <span className="text-mystic-300 font-semibold">
              {fortuners.find(f => f.id === selectedFortuner)?.name}
            </span>
            があなたの未来を照らします
          </p>
        </motion.div>
      )}
    </div>
  );
} 