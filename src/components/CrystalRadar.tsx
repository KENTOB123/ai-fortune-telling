'use client';

import { motion } from 'framer-motion';
import { CRYSTAL_TYPES, CrystalType } from '@/lib/crystalTypes';

interface CrystalRadarProps {
  selectedTypes: string[];
  onTypeSelect?: (typeId: string) => void;
  showAll?: boolean;
}

export default function CrystalRadar({ selectedTypes, onTypeSelect, showAll = true }: CrystalRadarProps) {
  const displayTypes = showAll ? CRYSTAL_TYPES : CRYSTAL_TYPES.filter(type => selectedTypes.includes(type.id));

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2">あなたの現在の状態</h3>
        <p className="text-white/60 text-sm">
          各カテゴリの強さを確認できます
        </p>
      </div>

      {/* レーダーチャート風の表示 */}
      <div className="relative">
        {/* 背景の円 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 border border-white/10 rounded-full"></div>
          <div className="absolute w-48 h-48 border border-white/20 rounded-full"></div>
          <div className="absolute w-32 h-32 border border-white/30 rounded-full"></div>
          <div className="absolute w-16 h-16 border border-white/40 rounded-full"></div>
        </div>

        {/* カテゴリポイント */}
        <div className="relative w-64 h-64 mx-auto">
          {CRYSTAL_TYPES.map((type, index) => {
            const angle = (index * 360) / CRYSTAL_TYPES.length;
            const radius = 100; // 中心からの距離
            const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
            const y = Math.sin((angle - 90) * Math.PI / 180) * radius;
            
            const isSelected = selectedTypes.includes(type.id);
            const strength = isSelected ? 1 : 0.3;

            return (
              <motion.div
                key={type.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: strength,
                  opacity: showAll ? 1 : (isSelected ? 1 : 0.3)
                }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                    isSelected 
                      ? `bg-gradient-to-br ${type.color} shadow-lg shadow-current/30`
                      : 'bg-white/10 border border-white/20'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onTypeSelect?.(type.id)}
                >
                  <span className="text-lg">{type.icon}</span>
                </motion.div>
                
                {/* ラベル */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap">
                  <p className={`text-xs font-medium ${
                    isSelected ? 'text-white' : 'text-white/50'
                  }`}>
                    {type.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* カテゴリ詳細 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {displayTypes.map((type) => {
          const isSelected = selectedTypes.includes(type.id);
          
          return (
            <motion.div
              key={type.id}
              className={`p-3 rounded-lg border transition-all cursor-pointer ${
                isSelected
                  ? `bg-gradient-to-br ${type.color} border-transparent`
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onTypeSelect?.(type.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg">{type.icon}</span>
                <span className={`text-sm font-medium ${
                  isSelected ? 'text-white' : 'text-white/80'
                }`}>
                  {type.label}
                </span>
              </div>
              <p className={`text-xs ${
                isSelected ? 'text-white/90' : 'text-white/60'
              }`}>
                {type.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* 選択されたカテゴリの詳細 */}
      {selectedTypes.length > 0 && (
        <motion.div
          className="mt-6 p-4 bg-white/5 border border-white/10 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h4 className="text-white font-semibold mb-3">あなたの現在の状態</h4>
          <div className="space-y-2">
            {selectedTypes.map((typeId) => {
              const type = CRYSTAL_TYPES.find(t => t.id === typeId);
              if (!type) return null;
              
              return (
                <div key={typeId} className="flex items-start space-x-3">
                  <span className="text-lg">{type.icon}</span>
                  <div>
                    <p className="text-white font-medium">{type.label}</p>
                    <p className="text-white/70 text-sm">{type.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
} 