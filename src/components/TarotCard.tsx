'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, RotateCcw, Heart, Users, Shield, Target } from 'lucide-react'
import { getTarotCard, generateTarotReading } from '@/lib/utils'

interface TarotCardProps {
  onReadingComplete?: (reading: any) => void
}

interface Card {
  name: string
  meaning: string
  reversed: boolean
  image: string
  description: string
  isSelected: boolean
  isRevealed: boolean
}

export default function TarotCard({ onReadingComplete }: TarotCardProps) {
  const [cards, setCards] = useState<Card[]>(() => 
    Array.from({ length: 9 }, () => ({
      ...getTarotCard(),
      isSelected: false,
      isRevealed: false
    }))
  )
  const [selectedCount, setSelectedCount] = useState(0)
  const [isReading, setIsReading] = useState(false)
  const [reading, setReading] = useState<any>(null)
  const [showReading, setShowReading] = useState(false)

  const handleCardClick = (index: number) => {
    if (isReading || showReading) return
    
    const newCards = [...cards]
    if (newCards[index].isSelected) {
      newCards[index].isSelected = false
      setSelectedCount(prev => prev - 1)
    } else if (selectedCount < 3) {
      newCards[index].isSelected = true
      setSelectedCount(prev => prev + 1)
    }
    setCards(newCards)
  }

  const handleStartReading = () => {
    if (selectedCount !== 3 || isReading) return
    
    setIsReading(true)
    const selectedCards = cards.filter(card => card.isSelected)
    
    // カードを順番にめくるアニメーション
    setTimeout(() => {
      const newCards = [...cards]
      newCards[0].isRevealed = true
      setCards(newCards)
    }, 1000)
    
    setTimeout(() => {
      const newCards = [...cards]
      newCards[1].isRevealed = true
      setCards(newCards)
    }, 2000)
    
    setTimeout(() => {
      const newCards = [...cards]
      newCards[2].isRevealed = true
      setCards(newCards)
      
      // 占い結果を生成
      const readingResult = generateTarotReading(selectedCards)
      setReading(readingResult)
      onReadingComplete?.(readingResult)
      setIsReading(false)
      setShowReading(true)
    }, 3000)
  }

  const handleReset = () => {
    setCards(Array.from({ length: 9 }, () => ({
      ...getTarotCard(),
      isSelected: false,
      isRevealed: false
    })))
    setSelectedCount(0)
    setReading(null)
    setShowReading(false)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {!showReading ? (
        <div className="space-y-8">
          {/* 説明 */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-mystic-800 mb-4">3枚のカードを選んでください</h3>
            <p className="text-mystic-600 mb-6">
              心を落ち着かせて、直感に従って3枚のカードを選んでください。
              選んだカードの組み合わせから、あなたの運命を読み解きます。
            </p>
            <div className="flex justify-center items-center space-x-4 mb-6">
              <span className="text-sm text-mystic-600">選択済み: {selectedCount}/3</span>
              {selectedCount === 3 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStartReading}
                  disabled={isReading}
                  className="btn-mystic text-white px-6 py-2 rounded-lg font-semibold shadow-lg disabled:opacity-50"
                >
                  {isReading ? '占っています...' : '占いを開始'}
                </motion.button>
              )}
            </div>
          </div>

          {/* カードグリッド */}
          <div className="grid grid-cols-3 gap-4">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: card.isSelected ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCardClick(index)}
                className={`relative w-full aspect-[2/3] cursor-pointer transition-all duration-300 ${
                  card.isSelected ? 'ring-4 ring-primary-500' : ''
                }`}
              >
                <div className={`tarot-card w-full h-full ${card.isRevealed ? 'flipped' : ''}`}>
                  {/* カードの裏面（模様） */}
                  <div className="tarot-card-front bg-gradient-to-br from-mystic-800 to-mystic-900 rounded-xl shadow-2xl border-2 border-mystic-600 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-transparent"></div>
                    <div className="text-center z-10">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center mb-3 mx-auto">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-white font-semibold text-sm mb-1">タロットカード</h4>
                      <p className="text-mystic-300 text-xs">タップして選択</p>
                    </div>
                    {card.isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{selectedCount}</span>
                      </div>
                    )}
                  </div>

                  {/* カードの表面（結果） */}
                  <div className="tarot-card-back bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl shadow-2xl border-2 border-amber-300 p-4">
                    <div className="text-center h-full flex flex-col justify-center">
                      <div className={`text-3xl mb-3 ${card.reversed ? 'rotate-180' : ''}`}>
                        {card.image}
                      </div>
                      <h4 className="text-mystic-800 font-bold text-sm mb-2">
                        {card.name}
                        {card.reversed && (
                          <span className="text-xs text-mystic-600 ml-1">(逆)</span>
                        )}
                      </h4>
                      <p className="text-mystic-700 text-xs leading-tight">
                        {card.meaning}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* 選ばれたカード */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-mystic-800 mb-6 text-center">選ばれたカード</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cards.filter(card => card.isSelected).map((card, index) => (
                <div key={index} className="text-center">
                  <div className="w-24 h-36 mx-auto bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg border-2 border-amber-300 p-3 mb-3">
                    <div className={`text-2xl mb-2 ${card.reversed ? 'rotate-180' : ''}`}>
                      {card.image}
                    </div>
                    <h4 className="text-mystic-800 font-bold text-sm">
                      {card.name}
                      {card.reversed && <span className="text-xs text-mystic-600">(逆)</span>}
                    </h4>
                  </div>
                  <p className="text-mystic-700 text-sm">{card.meaning}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 占い結果 */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-mystic-800 mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-red-500" />
                現在の状況
              </h3>
              <p className="text-mystic-700 leading-relaxed">{reading.current}</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-mystic-800 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-500" />
                あなたの性格的な特徴
              </h3>
              <p className="text-mystic-700 leading-relaxed">{reading.personality}</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-mystic-800 mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-green-500" />
                相性の良い人の性格
              </h3>
              <p className="text-mystic-700 leading-relaxed">{reading.compatiblePersonality}</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-mystic-800 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-orange-500" />
                相性の悪い人の性格
              </h3>
              <p className="text-mystic-700 leading-relaxed">{reading.incompatiblePersonality}</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-mystic-800 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-purple-500" />
                相性の悪い人との接し方
              </h3>
              <p className="text-mystic-700 leading-relaxed">{reading.howToDealWithIncompatible}</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-mystic-800 mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                幸せになれる方法
              </h3>
              <p className="text-mystic-700 leading-relaxed">{reading.happinessMethod}</p>
            </div>
          </div>

          {/* リセットボタン */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="bg-mystic-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-mystic-700 transition-colors duration-200 flex items-center space-x-2 mx-auto"
          >
            <RotateCcw className="w-4 h-4" />
            <span>もう一度占う</span>
          </motion.button>
        </motion.div>
      )}
    </div>
  )
} 