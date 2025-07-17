'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  SparklesIcon, 
  EyeIcon, 
  QuestionMarkCircleIcon 
} from '@heroicons/react/24/outline';

const guideTypes = [
  {
    id: 'tarot',
    title: 'タロット',
    description: '過去・現在・未来を多面的に見る伝統的な占い。78枚のカードがあなたの人生の流れを照らし出します。',
    icon: SparklesIcon,
    color: 'from-purple-500 to-indigo-600',
    preset: '3cards_tarot',
    features: ['過去の影響', '現在の状況', '未来の可能性']
  },
  {
    id: 'crystal',
    title: '水晶玉',
    description: 'あなたの現在位置を示す内面羅針盤。心の奥底に眠る真実と、これから進むべき道筋を明らかにします。',
    icon: EyeIcon,
    color: 'from-blue-500 to-cyan-600',
    preset: 'crystal_reading',
    features: ['現在の状態', '内面の真実', '進むべき道']
  },
  {
    id: 'oracle',
    title: 'Yes/No オラクル',
    description: '即断即決が欲しいときのシンプルな占い。複雑な状況を整理し、明確な答えを導き出します。',
    icon: QuestionMarkCircleIcon,
    color: 'from-green-500 to-emerald-600',
    preset: 'yesno',
    features: ['明確な答え', '迅速な判断', '行動指針']
  }
];

export default function GuideSection() {
  return (
    <section className="py-16 bg-surface-950">
      <div className="max-w-6xl mx-auto px-4">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-mystical text-royalGold-400 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            あなたに最適な占いを選んでください
          </motion.h2>
          <motion.p
            className="text-white/70 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            それぞれの占いが持つ独特の力で、あなたの疑問や悩みに最適な答えを導き出します
          </motion.p>
        </div>

        {/* ガイドカード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {guideTypes.map((guide, index) => (
            <motion.div
              key={guide.id}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Link href={`/fortuners?preset=${guide.preset}`}>
                <div className="relative bg-surface-900 border border-surface-800 rounded-xl p-6 h-full transition-all duration-300 hover:border-royalGold-500/50 hover:bg-surface-800/50 group-hover:translate-y-[-4px] group-hover:drop-shadow-lg group-hover:scale-105">
                  {/* 背景画像 */}
                  <div className="absolute inset-0 rounded-xl overflow-hidden opacity-20">
                    <Image
                      src={`/guide/${guide.id}.jpg`}
                      alt={`${guide.title}占い`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* アイコン */}
                  <div className={`relative w-16 h-16 bg-gradient-to-br ${guide.color} rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <guide.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* タイトル */}
                  <h3 className="relative text-xl font-mystical text-royalGold-400 mb-4 text-center group-hover:text-royalGold-300 transition-colors">
                    {guide.title}
                  </h3>

                  {/* 説明 */}
                  <p className="relative text-white/70 text-sm leading-relaxed mb-6 text-center">
                    {guide.description}
                  </p>

                  {/* 特徴 */}
                  <div className="relative space-y-2 mb-6">
                    {guide.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center justify-center text-sm">
                        <div className="w-2 h-2 bg-royalGold-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-white/60">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="relative flex items-center justify-between">
                    <span className="text-royalGold-400 text-sm font-medium">
                      占いを始める
                    </span>
                    <motion.div
                      className="w-6 h-6 text-royalGold-400"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* ホバー時の光沢効果 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
} 