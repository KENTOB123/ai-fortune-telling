'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import ParticleEffect from './ParticleEffect'

// Dynamic imports for icons
const Sparkles = dynamic(() => import('lucide-react').then(m => m.Sparkles), { ssr: false });
const Star = dynamic(() => import('lucide-react').then(m => m.Star), { ssr: false });
const Moon = dynamic(() => import('lucide-react').then(m => m.Moon), { ssr: false });
const Sun = dynamic(() => import('lucide-react').then(m => m.Sun), { ssr: false });
const ArrowRight = dynamic(() => import('lucide-react').then(m => m.ArrowRight), { ssr: false });

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <ParticleEffect />
      
      {/* 背景グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-br from-midnight-900/80 via-midnight-800/80 to-surface-900/80" />
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-md">
            AI が占う３種の占術を無料体験
          </h1>
          <p className="text-lg sm:text-xl text-white/60 mb-8 max-w-2xl mx-auto leading-relaxed">
            タロット・水晶玉・Yes/Noオラクルの３つのAI占いを今すぐ体験。<br />
            1日3回まで無料、月額プランもご用意しています。
          </p>
          {/* 信頼&価格バッジ */}
          <div className="flex flex-wrap justify-center gap-2 mt-4 text-base sm:text-lg">
            <span className="px-3 py-1 bg-emerald-600/20 rounded-full text-white/80">無料3回/日</span>
            <span className="px-3 py-1 bg-royalGold-600/20 rounded-full text-white/80">月額¥780〜</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Link href="/flow" className="btn-mystic">
            無料占いを始める
          </Link>
          <Link href="/pricing" className="btn-ghost ml-3 hidden sm:inline-flex">
            プランを見る
          </Link>
        </motion.div>

        {/* 占い師サムネイル */}
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
            <div className="w-16 h-16 rounded-full overflow-hidden mb-4 mx-auto">
              <Image
                src="/assets/fortune-tellers/akari.png"
                alt="灯里 Akari"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">灯里 Akari</h3>
            <p className="text-white/60 text-sm">
              恋愛占いのエキスパート
            </p>
          </motion.div>

          <motion.div 
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-hover"
            whileHover={{ y: -5 }}
          >
            <div className="w-16 h-16 rounded-full overflow-hidden mb-4 mx-auto">
              <Image
                src="/assets/fortune-tellers/seren.png"
                alt="星乃 Seren"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">星乃 Seren</h3>
            <p className="text-white/60 text-sm">
              キャリア占いの専門家
            </p>
          </motion.div>

          <motion.div 
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-hover"
            whileHover={{ y: -5 }}
          >
            <div className="w-16 h-16 rounded-full overflow-hidden mb-4 mx-auto">
              <Image
                src="/assets/fortune-tellers/tsumugi.png"
                alt="紡 Tsumugi"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">紡 Tsumugi</h3>
            <p className="text-white/60 text-sm">
              数秘術のセルフコーチ
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