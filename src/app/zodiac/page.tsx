'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sparkles, ArrowLeft, Trophy } from 'lucide-react'
import Header from '@/components/Header'
import ZodiacForm from '@/components/ZodiacForm'
import Link from 'next/link'

export default function ZodiacPage() {
  const [readingHistory, setReadingHistory] = useState<Array<any>>([])

  const handleReadingComplete = (reading: any) => {
    setReadingHistory(prev => [reading, ...prev.slice(0, 2)]) // 最新3件を保持
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-mystic-50 via-white to-mystic-100">
      <Header />
      
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ページヘッダー */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Link href="/" className="inline-flex items-center text-mystic-600 hover:text-primary-600 mb-6 transition-colors duration-200">
              <ArrowLeft className="w-4 h-4 mr-2" />
              ホームに戻る
            </Link>
            
            <div className="flex justify-center items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Moon className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-mystic-900">星座占い</h1>
            </div>
            
            <p className="text-lg text-mystic-600 max-w-2xl mx-auto">
              あなたの星座から運命を導き出します。生年月日を入力して、星座の神秘的な力を感じてください。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* 星座占いフォーム */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center"
            >
              <ZodiacForm onReadingComplete={handleReadingComplete} />
            </motion.div>

            {/* 占いの説明と履歴 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              {/* 星座占いの説明 */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-mystic-800 mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-primary-500" />
                  星座占いについて
                </h2>
                <div className="space-y-3 text-mystic-700">
                  <p>
                    星座占いは、生まれた時の太陽の位置によって決まる12の星座を基に、
                    性格や運命を読み解く占術です。
                  </p>
                  <p>
                    それぞれの星座には固有の特徴があり、誕生石やラッキーカラー、ラッキーアイテムも関連しています。
                    あなたの星座が持つ力を理解することで、より良い人生を歩むことができます。
                  </p>
                  <p>
                    星座のエネルギーは、あなたの性格や行動パターンに影響を与えます。
                    自分の星座の特徴を活かして、幸せな人生を創造してください。
                  </p>
                </div>
              </div>

              {/* 最近の占い履歴 */}
              {readingHistory.length > 0 && (
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-mystic-800 mb-4">最近の占い結果</h3>
                  <div className="space-y-4">
                    {readingHistory.map((reading, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-mystic-50 rounded-lg border border-mystic-200"
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                            <Moon className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium text-mystic-800">{reading.zodiacSign} #{index + 1}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                          <div className="flex justify-between">
                            <span className="text-mystic-600">ラッキーカラー:</span>
                            <span className="text-mystic-700">{reading.luckyColor}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-mystic-600">ラッキーアイテム:</span>
                            <span className="text-mystic-700">{reading.luckyItem}</span>
                          </div>
                        </div>
                        <p className="text-sm text-mystic-600">{reading.reading}</p>
                        {reading.ranking && reading.ranking.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-mystic-200">
                            <div className="flex items-center space-x-2 mb-2">
                              <Trophy className="w-4 h-4 text-yellow-500" />
                              <span className="text-xs font-medium text-mystic-700">今日の1位: {reading.ranking[0]?.sign}</span>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* 12星座の特徴 */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-mystic-800 mb-4">12星座の特徴</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg">
                    <span className="font-medium text-mystic-800">牡羊座 (3/21-4/19)</span>
                    <p className="text-mystic-600">リーダーシップ、冒険心</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                    <span className="font-medium text-mystic-800">牡牛座 (4/20-5/20)</span>
                    <p className="text-mystic-600">安定、実用性</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg">
                    <span className="font-medium text-mystic-800">双子座 (5/21-6/21)</span>
                    <p className="text-mystic-600">好奇心、コミュニケーション</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                    <span className="font-medium text-mystic-800">蟹座 (6/22-7/22)</span>
                    <p className="text-mystic-600">感受性、家族愛</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                    <span className="font-medium text-mystic-800">獅子座 (7/23-8/22)</span>
                    <p className="text-mystic-600">自信、創造性</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <span className="font-medium text-mystic-800">乙女座 (8/23-9/22)</span>
                    <p className="text-mystic-600">完璧主義、分析力</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg">
                    <span className="font-medium text-mystic-800">天秤座 (9/23-10/23)</span>
                    <p className="text-mystic-600">バランス、調和</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                    <span className="font-medium text-mystic-800">蠍座 (10/24-11/22)</span>
                    <p className="text-mystic-600">洞察力、情熱</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                    <span className="font-medium text-mystic-800">射手座 (11/23-12/21)</span>
                    <p className="text-mystic-600">自由、冒険</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg">
                    <span className="font-medium text-mystic-800">山羊座 (12/22-1/19)</span>
                    <p className="text-mystic-600">責任感、忍耐力</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg">
                    <span className="font-medium text-mystic-800">水瓶座 (1/20-2/18)</span>
                    <p className="text-mystic-600">独創性、人道主義</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg">
                    <span className="font-medium text-mystic-800">魚座 (2/19-3/20)</span>
                    <p className="text-mystic-600">直感力、芸術性</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
} 