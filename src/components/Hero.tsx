'use client'

import { motion } from 'framer-motion'
import { Sparkles, Star, Moon, Sun, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import ParticleEffect from './ParticleEffect'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <ParticleEffect />
      
      {/* 背景グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-br from-midnight-900 via-midnight-800 to-midnight-900" />
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex justify-center items-center space-x-2 mb-6">
            <Sparkles className="w-8 h-8 text-mystic-400" />
            <span className="text-lg font-medium text-mystic-300">AI技術で未来を覗く</span>
            <Sparkles className="w-8 h-8 text-mystic-400" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-mystic-400 to-crystalPurple-400 bg-clip-text text-transparent">
              神秘的な
            </span>
            <br />
            <span className="text-white">占い体験</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-white/60 mb-8 max-w-2xl mx-auto leading-relaxed">
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
          <Link href="/flow">
            <motion.button 
              className="btn-mystic text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>占いを始める</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
          <Link href="/fortuners">
            <motion.button 
              className="btn-mystic text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>占い師を選ぶ</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
          <Link href="/guide">
            <motion.button 
              className="border-2 border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              占いの種類を見る
            </motion.button>
          </Link>
        </motion.div>

        {/* 特徴カード */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <motion.div 
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-hover"
            whileHover={{ y: -5 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-crystalPurple-500 to-mystic-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">タロット占い</h3>
            <p className="text-white/60 text-sm">
              神秘的なタロットカードで未来を読み解きます
            </p>
          </motion.div>

          <motion.div 
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-hover"
            whileHover={{ y: -5 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-royalGold-500 to-crystalPurple-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Moon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">星座占い</h3>
            <p className="text-white/60 text-sm">
              あなたの星座から運命を導き出します
            </p>
          </motion.div>

          <motion.div 
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-hover"
            whileHover={{ y: -5 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-mystic-500 to-royalGold-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Sun className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">水晶玉占い</h3>
            <p className="text-white/60 text-sm">
              透き通る水晶玉に未来を映し出します
            </p>
          </motion.div>
        </motion.div>

        {/* クォータ情報 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-white/40 text-sm">
            今日の無料回数: <span className="text-mystic-300 font-semibold">3回</span> 残り
          </p>
          <p className="text-white/30 text-xs mt-1">
            リセット時刻: 毎日 09:00 (JST)
          </p>
        </motion.div>
      </div>

      {/* 装飾要素 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-mystic-400 rounded-full mt-2" />
        </motion.div>
      </div>
    </section>
  )
} 