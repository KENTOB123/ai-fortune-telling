'use client';

import { motion } from 'framer-motion';
import { spreads } from '@/lib/spreads';

interface SpreadSelectionProps {
  selectedSpread: string | null;
  onSelect: (spreadId: string) => void;
}

export default function SpreadSelection({ selectedSpread, onSelect }: SpreadSelectionProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          カードの配置方法を選んでください
        </h2>
        <p className="text-white/60 text-lg">
          それぞれのスプレッドが異なる視点からあなたの未来を読み解きます
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {spreads.map((spread, index) => (
          <motion.div
            key={spread.id}
            className={`relative p-6 rounded-xl border-2 transition-all cursor-pointer ${
              selectedSpread === spread.id
                ? 'border-mystic-500 bg-mystic-500/10 shadow-lg shadow-mystic-500/20'
                : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(spread.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* 選択インジケーター */}
            {selectedSpread === spread.id && (
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

            {/* スプレッド情報 */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">
                {spread.name}
              </h3>
              <p className="text-white/80 text-sm mb-4">
                {spread.description}
              </p>
              
              {/* カード数 */}
              <div className="inline-flex items-center px-3 py-1 bg-mystic-500/20 text-mystic-300 text-sm rounded-full mb-4">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                </svg>
                {spread.cardCount}枚のカード
              </div>
            </div>

            {/* カード配置の視覚的表現 */}
            <div className="flex justify-center mb-6">
              <div className={`grid gap-2 ${
                spread.layout === 'single' ? 'grid-cols-1' :
                spread.layout === 'three' ? 'grid-cols-3' :
                spread.layout === 'cross' ? 'grid-cols-3 grid-rows-3' :
                'grid-cols-4 grid-rows-3'
              }`}>
                {spread.positions.map((position, posIndex) => (
                  <motion.div
                    key={position.id}
                    className={`w-8 h-12 rounded border-2 ${
                      selectedSpread === spread.id
                        ? 'border-mystic-400 bg-mystic-400/20'
                        : 'border-white/30 bg-white/10'
                    } flex items-center justify-center`}
                    whileHover={{ scale: 1.1 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: posIndex * 0.05 }}
                  >
                    <span className="text-xs text-white/60 font-medium">
                      {posIndex + 1}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 位置の説明 */}
            <div className="space-y-2">
              <p className="text-white/60 text-xs font-medium mb-2">各位置の意味:</p>
              {spread.positions.slice(0, 3).map((position) => (
                <div key={position.id} className="text-left">
                  <p className="text-white/80 text-xs font-medium">
                    {position.name}
                  </p>
                  <p className="text-white/50 text-xs">
                    {position.description}
                  </p>
                </div>
              ))}
              {spread.positions.length > 3 && (
                <p className="text-white/40 text-xs">
                  他 {spread.positions.length - 3} の位置...
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {selectedSpread && (
        <motion.div
          className="text-center p-4 bg-mystic-500/10 border border-mystic-500/30 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-white">
            <span className="text-mystic-300 font-semibold">
              {spreads.find(s => s.id === selectedSpread)?.name}
            </span>
            でカードを配置します
          </p>
        </motion.div>
      )}
    </div>
  );
} 