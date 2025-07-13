'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Sparkles, ArrowLeft, Heart, Users, Shield, Target } from 'lucide-react'
import Header from '@/components/Header'
import TarotCard from '@/components/TarotCard'
import Link from 'next/link'

export default function TarotPage() {
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
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-mystic-900">タロット占い</h1>
            </div>
            
            <p className="text-lg text-mystic-600 max-w-2xl mx-auto">
              神秘的なタロットカードで未来を読み解きます。心を落ち着かせて、3枚のカードを選んでください。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* タロットカード */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center"
            >
              <TarotCard onReadingComplete={handleReadingComplete} />
            </motion.div>

            {/* 占いの説明と履歴 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              {/* タロット占いの説明 */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-mystic-800 mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-primary-500" />
                  タロット占いについて
                </h2>
                <div className="space-y-3 text-mystic-700">
                  <p>
                    タロットカードは、78枚のカードからなる神秘的な占術です。大アルカナ22枚と小アルカナ56枚で構成され、
                    それぞれが人生の様々な側面を表しています。
                  </p>
                  <p>
                    3枚のカードを選ぶことで、あなたの現在の状況や未来の可能性が映し出されます。
                    正位置と逆位置で異なる意味を持つため、より深い洞察を得ることができます。
                  </p>
                  <p>
                    心を落ち着かせ、直感に従ってカードを選んでください。
                    選んだカードの組み合わせから、人間関係や性格について詳しく読み解きます。
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
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <Star className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium text-mystic-800">タロット占い #{index + 1}</span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start space-x-2">
                            <Heart className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <p className="text-mystic-700">{reading.current}</p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <Users className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <p className="text-mystic-700">{reading.personality}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* タロットの種類 */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-mystic-800 mb-4">タロットの種類</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-mystic-800 mb-2">大アルカナ</h4>
                    <p className="text-sm text-mystic-600">22枚の主要なカード。人生の大きな流れや重要な出来事を表します。</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-mystic-800 mb-2">小アルカナ</h4>
                    <p className="text-sm text-mystic-600">56枚のカード。日常生活や具体的な状況を表します。</p>
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