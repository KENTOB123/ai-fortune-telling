'use client';

import Hero from '@/components/Hero';
import GuideSection from '@/components/GuideSection';
import DailyHoroscope from '@/components/DailyHoroscope';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-midnight-950 via-midnight-900 to-midnight-950">
      <Hero />
      <DailyHoroscope />
      <GuideSection />
      
      {/* レビュー＆FAQセクション */}
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
              お客様の声とよくある質問
            </motion.h2>
            <motion.p
              className="text-white/70 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              多くのお客様に愛されている理由と、よくいただく質問にお答えします
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* レビュー */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">お客様の声</h3>
              <div className="space-y-6">
                {[
                  {
                    name: '田中さん (30代女性)',
                    rating: 5,
                    comment: '恋愛運の占いが本当に当たっていて驚きました。アドバイスも具体的で参考になります。'
                  },
                  {
                    name: '佐藤さん (40代男性)',
                    rating: 5,
                    comment: 'キャリアの転機に迷っていた時、この占いで方向性が明確になりました。'
                  },
                  {
                    name: '山田さん (20代女性)',
                    rating: 5,
                    comment: '無料で使えるのに、こんなに詳しい占い結果がもらえるなんて感激です。'
                  }
                ].map((review, index) => (
                  <motion.div
                    key={index}
                    className="bg-surface-900 border border-surface-800 rounded-xl p-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center mb-3">
                      <div className="flex text-yellow-400 mr-3">
                        {Array.from({ length: review.rating }, (_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                      <span className="text-white/60 text-sm">{review.name}</span>
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed">{review.comment}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">よくある質問</h3>
              <div className="space-y-4">
                {[
                  {
                    q: '占いは本当に当たりますか？',
                    a: '当サイトの占いは、伝統的なタロットカードと現代的な心理学を組み合わせた独自のシステムです。多くのお客様から「当たっている」というお声をいただいています。'
                  },
                  {
                    q: '無料で何回まで使えますか？',
                    a: '1日3回まで無料でお使いいただけます。毎日09:00（JST）にリセットされます。'
                  },
                  {
                    q: '占い結果は保存されますか？',
                    a: '無料プランでは結果は保存されません。Plusプラン以上では結果の保存が可能です。'
                  },
                  {
                    q: 'どの占い師を選べばいいですか？',
                    a: 'それぞれの占い師に得意分野があります。恋愛ならルナ、キャリアならソラリス、精神的な成長ならステラがおすすめです。'
                  }
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    className="bg-surface-900 border border-surface-800 rounded-xl p-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="text-white font-semibold mb-2">Q. {faq.q}</h4>
                    <p className="text-white/70 text-sm leading-relaxed">A. {faq.a}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
} 