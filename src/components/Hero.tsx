'use client'

import { motion } from 'framer-motion'
import { Sparkles, Star, Moon, Sun } from 'lucide-react'
import ParticleEffect from './ParticleEffect'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleEffect />
      
      {/* 背景グラデーション */}
      <div className="absolute inset-0 mystic-gradient opacity-10" />
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex justify-center items-center space-x-2 mb-6">
            <Sparkles className="w-8 h-8 text-primary-500" />
            <span className="text-lg font-medium text-mystic-600">AI技術で未来を覗く</span>
            <Sparkles className="w-8 h-8 text-primary-500" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-mystic-900 mb-6">
            <span className="text-gradient">神秘的な</span>
            <br />
            <span className="text-mystic-800">占い体験</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-mystic-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            AI技術を駆使した最新の占いで、あなたの未来を覗いてみませんか？
            タロット、星座、水晶玉占いで、運命の扉を開きましょう。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <button className="btn-mystic text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg">
            占いを始める
          </button>
          <button className="border-2 border-mystic-300 text-mystic-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-mystic-50 transition-colors duration-200">
            占いの種類を見る
          </button>
        </motion.div>

        {/* 特徴カード */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg card-hover">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-mystic-800 mb-2">タロット占い</h3>
            <p className="text-mystic-600 text-sm">
              神秘的なタロットカードで未来を読み解きます
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg card-hover">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Moon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-mystic-800 mb-2">星座占い</h3>
            <p className="text-mystic-600 text-sm">
              あなたの星座から運命を導き出します
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg card-hover">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Sun className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-mystic-800 mb-2">水晶玉占い</h3>
            <p className="text-mystic-600 text-sm">
              透き通る水晶玉に未来を映し出します
            </p>
          </div>
        </motion.div>
      </div>

      {/* 装飾要素 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-mystic-300 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-mystic-400 rounded-full mt-2" />
        </motion.div>
      </div>
    </section>
  )
} 