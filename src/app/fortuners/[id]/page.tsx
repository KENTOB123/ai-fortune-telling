'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FORTUNERS } from '@/data/fortuners';
import { notFound } from 'next/navigation';

export default function FortunerProfilePage() {
  const params = useParams();
  const fortunerId = params.id as string;
  const fortuner = FORTUNERS.find(f => f.id === fortunerId);

  if (!fortuner) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-midnight-950 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          className="bg-surface-900 border border-surface-800 rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Hero セクション */}
          <div className="relative h-64 bg-gradient-to-br from-mystic-500/20 to-crystal-500/20">
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="relative h-full flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  className="relative w-32 h-32 mx-auto mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-royalGold-500/30">
                    <Image
                      src={fortuner.img}
                      alt={fortuner.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    {/* フォールバック */}
                    <div className="hidden w-full h-full bg-gradient-to-br from-mystic-400 to-mystic-600 flex items-center justify-center">
                      <span className="text-white font-bold text-3xl">
                        {fortuner.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                </motion.div>
                <motion.h1
                  className="text-3xl font-mystical text-royalGold-400 mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {fortuner.name}
                </motion.h1>
                <motion.p
                  className="text-mystic-300 text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {fortuner.catch}
                </motion.p>
              </div>
            </div>
          </div>

          {/* プロフィール情報 */}
          <div className="p-8">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-mystical text-royalGold-400">自己紹介</h2>
                <span className="bg-royalGold-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  ¥{fortuner.price}
                </span>
              </div>
              <p className="text-white/70 text-sm mb-4">
                <strong>キャッチ:</strong> {fortuner.catch}
              </p>
              <p className="text-white/70 text-sm mb-4">
                <strong>ペルソナ:</strong> {fortuner.persona}
              </p>
            </motion.div>

            {/* 得意分野 */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-xl font-mystical text-royalGold-400 mb-4">得意分野</h2>
              <div className="flex flex-wrap gap-2">
                {fortuner.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-mystic-500/20 text-mystic-300 text-sm rounded-full border border-mystic-500/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>



            {/* 自己紹介 */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
            >
              <h2 className="text-xl font-mystical text-royalGold-400 mb-4">自己紹介</h2>
              <section className="mt-8 whitespace-pre-wrap leading-relaxed text-sm bg-surface/60 p-6 rounded">
                {fortuner.bio}
              </section>
            </motion.div>

            {/* サンプル回答 */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
            >
              <h2 className="text-xl font-mystical text-royalGold-400 mb-4">サンプル回答</h2>
              <blockquote className="bg-white/5 border-l-4 border-royalGold-500 pl-4 py-4 text-white/80 leading-relaxed italic">
                {fortuner.sample}
              </blockquote>
            </motion.div>

            {/* CTA */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Link href={`/flow?fortuner=${fortuner.id}`}>
                <motion.button
                  className="bg-gradient-to-r from-royalGold-500 to-royalGold-600 text-white font-medium py-4 px-8 rounded-lg hover:from-royalGold-600 hover:to-royalGold-700 transition-all duration-200 text-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {fortuner.name}で占いを始める
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 