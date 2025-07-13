'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface TarotCardProps {
  id: string;
  name: string;
  isSelected: boolean;
  isDisabled?: boolean;
  onSelect: (id: string) => void;
  imageUrl?: string;
  className?: string;
}

export default function TarotCard({
  id,
  name,
  isSelected,
  isDisabled = false,
  onSelect,
  imageUrl,
  className = ''
}: TarotCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (isDisabled) return;
    
    if (!isSelected) {
      onSelect(id);
    }
    setIsFlipped(true);
  };

  const handleMouseEnter = () => {
    if (!isDisabled) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      whileHover={!isDisabled ? { scale: 1.08, rotate: -2 } : {}}
      whileTap={!isDisabled ? { scale: 0.95, rotate: 2 } : {}}
             animate={{ 
         opacity: 1, 
         y: isSelected ? -20 : 0 
       }}
       initial={{ opacity: 0, y: 20 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* カード本体 */}
      <motion.div
        className={`w-full aspect-[2/3] rounded-lg border-2 transition-all duration-300 ${
          isSelected
            ? 'border-mystic-400 shadow-lg shadow-mystic-400/50'
            : isDisabled
            ? 'border-white/20 opacity-50'
            : 'border-white/30 hover:border-white/50'
        } ${isDisabled ? 'opacity-50' : ''}`}
        style={{
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
      >
        {/* カード背面 */}
        <motion.div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-full h-full bg-gradient-to-br from-mystic-600 to-mystic-800 rounded-lg flex items-center justify-center relative overflow-hidden">
            {/* 装飾パターン */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
            </div>
            
            {/* 中央のシンボル */}
            <div className="relative z-10 text-center">
              <motion.div
                className="w-12 h-12 mx-auto mb-3 bg-mystic-400/20 rounded-full flex items-center justify-center"
                animate={{
                  rotate: isHovered ? 360 : 0,
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-mystic-300 text-xl">✨</span>
              </motion.div>
              <p className="text-white/60 text-xs font-medium">TAROT</p>
            </div>

            {/* 光沢効果 */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{
                x: isHovered ? ['-100%', '100%'] : '-100%',
              }}
              transition={{
                duration: 1.5,
                repeat: isHovered ? Infinity : 0,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>

        {/* カード表面（フリップ後） */}
        <motion.div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-royalGold-400 to-royalGold-600 rounded-lg flex items-center justify-center relative overflow-hidden">
            <Image
              src={`/cards/dodal/${id}.jpg`}
              alt={`${name} - タロットカード`}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* 選択インジケーター */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 bg-mystic-500 rounded-full flex items-center justify-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* カード名 */}
      <motion.p
        className="text-center mt-2 text-xs font-medium"
        animate={{
          color: isSelected ? 'rgb(147, 51, 234)' : 'rgba(255, 255, 255, 0.6)'
        }}
      >
        {name}
      </motion.p>

      {/* 発光エフェクト */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            className="absolute inset-0 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: 'radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%)',
              filter: 'blur(10px)',
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
} 