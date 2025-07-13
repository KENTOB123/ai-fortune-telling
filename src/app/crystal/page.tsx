'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, Sparkles, ArrowLeft, MessageCircle } from 'lucide-react'
import Header from '@/components/Header'
import CrystalBall from '@/components/CrystalBall'
import Link from 'next/link'

export default function CrystalPage() {
  const [readingHistory, setReadingHistory] = useState<Array<any>>([])

  const handleReadingComplete = (reading: any) => {
    setReadingHistory(prev => [reading, ...prev.slice(0, 2)]) // 最新3件を保持
  }

  const getEnergyColor = (energy: string) => {
    switch (energy) {
      case 'positive': return 'from-green-500 to-emerald-500'
      case 'neutral': return 'from-blue-500 to-cyan-500'
      case 'challenging': return 'from-orange-500 to-red-500'
      default: return 'from-purple-500 to-pink-500'
    }
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
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-mystic-900">水晶玉占い</h1>
            </div>
            
            <p className="text-lg text-mystic-600 max-w-2xl mx-auto">
              透き通る水晶玉に未来を映し出します。心を清めて、水晶玉に質問を投げかけてください。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* 水晶玉 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center"
            >
              <CrystalBall onReadingComplete={handleReadingComplete} />
            </motion.div>

            {/* 占いの説明と履歴 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              {/* 水晶玉占いの説明 */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-mystic-800 mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-primary-500" />
                  水晶玉占いについて
                </h2>
                <div className="space-y-3 text-mystic-700">
                  <p>
                    水晶玉占いは、古代から伝わる神秘的な占術です。透き通る水晶玉を通して、
                    未来の可能性や隠された真実を読み取ります。
                  </p>
                  <p>
                    水晶玉は、あなたの心の奥底にある質問に答え、未来への道筋を示してくれます。
                    心を落ち着かせ、純粋な気持ちで質問を投げかけてください。
                  </p>
                  <p>
                    水晶玉に映る映像は、あなたの直感や潜在意識からのメッセージです。
                    受け取ったメッセージを大切に、人生の指針としてください。
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
                          <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                            <Eye className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium text-mystic-800">水晶玉占い #{index + 1}</span>
                        </div>
                        
                        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r ${getEnergyColor(reading.energy)} text-white text-xs font-medium mb-3`}>
                          <Sparkles className="w-3 h-3" />
                          <span>
                            {reading.energy === 'positive' && 'ポジティブ'}
                            {reading.energy === 'neutral' && 'バランス'}
                            {reading.energy === 'challenging' && '成長'}
                          </span>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-start space-x-2">
                            <MessageCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <p className="text-mystic-700 font-medium">質問: {reading.question}</p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <Eye className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                            <p className="text-mystic-700">ビジョン: {reading.vision}</p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <Sparkles className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <p className="text-mystic-700">アドバイス: {reading.advice.substring(0, 100)}...</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* 水晶玉の種類 */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-mystic-800 mb-4">水晶玉の種類</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-mystic-800 mb-2">天然水晶</h4>
                    <p className="text-sm text-mystic-600">最も純粋で強力なエネルギーを持つ水晶玉です。</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-mystic-800 mb-2">人工水晶</h4>
                    <p className="text-sm text-mystic-600">現代技術で作られた美しい水晶玉です。</p>
                  </div>
                </div>
              </div>

              {/* 占いのコツ */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-mystic-800 mb-4">占いのコツ</h3>
                <div className="space-y-3 text-sm text-mystic-700">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>心を落ち着かせ、リラックスした状態で質問してください。</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>具体的で明確な質問を心に浮かべてください。</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>直感を信じて、水晶玉に映る映像を受け取ってください。</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>結果は参考程度に受け取り、最終的な判断は自分で行ってください。</p>
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