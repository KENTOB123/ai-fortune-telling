'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Sparkles, RotateCcw, Trophy, Gift } from 'lucide-react'
import { getZodiacSign, getBirthstone, getLuckyColor, getLuckyItem, getDailyZodiacRanking, getZodiacDailyFortune } from '@/lib/utils'

interface ZodiacFormProps {
  onReadingComplete?: (reading: { zodiacSign: string; birthstone: string; luckyColor: string; luckyItem: string; reading: string; ranking: any[] }) => void
}

export default function ZodiacForm({ onReadingComplete }: ZodiacFormProps) {
  const [birthDate, setBirthDate] = useState('')
  const [isReading, setIsReading] = useState(false)
  const [reading, setReading] = useState<{ zodiacSign: string; birthstone: string; luckyColor: string; luckyItem: string; reading: string; ranking: any[] } | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!birthDate || isReading) return

    setIsReading(true)
    
    setTimeout(() => {
      const date = new Date(birthDate)
      const month = date.getMonth() + 1
      const day = date.getDate()
      
      const zodiacSign = getZodiacSign(month, day)
      const birthstone = getBirthstone(month)
      const luckyColor = getLuckyColor(zodiacSign)
      const luckyItem = getLuckyItem(zodiacSign)
      const dailyFortune = getZodiacDailyFortune(zodiacSign)
      const ranking = getDailyZodiacRanking()

      const newReading = {
        zodiacSign,
        birthstone,
        luckyColor,
        luckyItem,
        reading: dailyFortune,
        ranking
      }

      setReading(newReading)
      onReadingComplete?.(newReading)
      setIsReading(false)
    }, 2000)
  }

  const handleReset = () => {
    setReading(null)
    setBirthDate('')
  }

  return (
    <div className="max-w-2xl mx-auto text-center">
      {!reading ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-xl font-semibold text-mystic-800 mb-4">生年月日を入力してください</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="birthDate" className="block text-sm font-medium text-mystic-700 mb-2">
                  生年月日
                </label>
                <input
                  type="date"
                  id="birthDate"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full p-4 border-2 border-mystic-300 rounded-lg focus:border-primary-500 focus:outline-none transition-colors duration-200"
                  required
                  disabled={isReading}
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={!birthDate || isReading}
                className="btn-mystic text-white px-8 py-4 rounded-lg font-semibold shadow-lg disabled:opacity-50 w-full"
              >
                {isReading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-5 h-5" />
                    </motion.div>
                    <span>占っています...</span>
                  </div>
                ) : (
                  '星座占いを始める'
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* 結果表示 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-xl font-semibold text-mystic-800 mb-6">あなたの星座占い結果</h3>
            
            <div className="space-y-4 text-left">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                <span className="font-medium text-mystic-800">星座:</span>
                <span className="text-mystic-700">{reading.zodiacSign}</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                <span className="font-medium text-mystic-800">誕生石:</span>
                <span className="text-mystic-700">{reading.birthstone}</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                <span className="font-medium text-mystic-800">ラッキーカラー:</span>
                <span className="text-mystic-700">{reading.luckyColor}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg">
                <span className="font-medium text-mystic-800">ラッキーアイテム:</span>
                <span className="text-mystic-700">{reading.luckyItem}</span>
              </div>
            </div>
          </div>

          {/* 今日の運勢 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <h4 className="text-lg font-semibold text-mystic-800 mb-4 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-primary-500" />
              今日の運勢
            </h4>
            <p className="text-mystic-700 leading-relaxed">{reading.reading}</p>
          </div>

          {/* 今日の運勢ランキング */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <h4 className="text-lg font-semibold text-mystic-800 mb-4 flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
              今日の運勢ランキング
            </h4>
            <div className="space-y-3">
              {reading.ranking.slice(0, 5).map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-mystic-50 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    index === 0 ? 'bg-yellow-500' : 
                    index === 1 ? 'bg-gray-400' : 
                    index === 2 ? 'bg-amber-600' : 'bg-mystic-400'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-mystic-800">{item.sign}</span>
                      {index < 3 && (
                        <span className="text-xs text-mystic-600">
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-mystic-600 mt-1">{item.fortune}</p>
                  </div>
                </div>
              ))}
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