'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

// タロットカードデータ
const tarotCards = [
  { id: 'fool', name: '愚者', meaning: '新しい始まり、純粋さ、冒険心' },
  { id: 'magician', name: '魔術師', meaning: '創造力、意志力、可能性' },
  { id: 'high_priestess', name: '女教皇', meaning: '直感、神秘、内なる知恵' },
  { id: 'empress', name: '女帝', meaning: '豊かさ、母性、創造性' },
  { id: 'emperor', name: '皇帝', meaning: '権威、安定、リーダーシップ' },
  { id: 'hierophant', name: '教皇', meaning: '伝統、教育、精神的な導き' },
  { id: 'lovers', name: '恋人', meaning: '愛、選択、調和' },
  { id: 'chariot', name: '戦車', meaning: '勝利、意志力、進歩' },
  { id: 'strength', name: '力', meaning: '勇気、忍耐、内なる強さ' },
  { id: 'hermit', name: '隠者', meaning: '内省、孤独、知恵' },
  { id: 'wheel', name: '運命の輪', meaning: '変化、運命、循環' },
  { id: 'justice', name: '正義', meaning: 'バランス、真実、公正' },
  { id: 'hanged', name: '吊るされた男', meaning: '犠牲、新しい視点、一時停止' },
  { id: 'death', name: '死神', meaning: '終わりと始まり、変容、解放' },
  { id: 'temperance', name: '節制', meaning: 'バランス、調和、節度' },
  { id: 'devil', name: '悪魔', meaning: '束縛、欲望、物質主義' },
  { id: 'tower', name: '塔', meaning: '突然の変化、崩壊、啓示' },
  { id: 'star', name: '星', meaning: '希望、癒し、インスピレーション' },
  { id: 'moon', name: '月', meaning: '直感、幻想、無意識' },
  { id: 'sun', name: '太陽', meaning: '喜び、成功、活力' },
  { id: 'judgement', name: '審判', meaning: '復活、覚醒、新しい使命' },
  { id: 'world', name: '世界', meaning: '完成、統合、達成' }
];

export default function CollectionPage() {
  const [collectedCards, setCollectedCards] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    fetchCollection();
  }, []);

  const fetchCollection = async () => {
    try {
      // 開発環境ではダミーデータを返す
      if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
        const dummyCards = ['fool', 'magician', 'high_priestess', 'empress', 'emperor'];
        setCollectedCards(dummyCards);
        setCompletionPercentage(Math.round((dummyCards.length / tarotCards.length) * 100));
        setLoading(false);
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('card_collection')
        .select('card_id')
        .eq('user_id', user.id);

      if (error) throw error;

      const cardIds = data?.map(item => item.card_id) || [];
      setCollectedCards(cardIds);
      setCompletionPercentage(Math.round((cardIds.length / tarotCards.length) * 100));
    } catch (error) {
      console.error('Fetch collection error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight-950 pt-20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-mystic-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-white/60">コレクションを読み込み中...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight-950 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            タロット図鑑
          </motion.h1>
          <motion.p
            className="text-white/60 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            収集したカードのコレクション
          </motion.p>
        </div>

        {/* 進捗バー */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-surface-900 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">コレクション進捗</h3>
              <span className="text-mystic-300 font-bold text-lg">
                {completionPercentage}%
              </span>
            </div>
            <div className="w-full bg-surface-800 rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-mystic-500 to-crystalPurple-500 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 1, delay: 0.6 }}
              />
            </div>
            <p className="text-white/60 text-sm mt-2">
              {collectedCards.length} / {tarotCards.length} 枚収集済み
            </p>
          </div>
        </motion.div>

        {/* カードグリッド */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {tarotCards.map((card, index) => {
            const isCollected = collectedCards.includes(card.id);
            return (
              <motion.div
                key={card.id}
                className={`relative group cursor-pointer ${
                  isCollected ? '' : 'grayscale blur-sm'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative">
                  <Image
                    src={`/cards/dodal/${card.id}.jpg`}
                    alt={card.name}
                    width={120}
                    height={180}
                    className={`rounded-lg border-2 transition-all duration-300 ${
                      isCollected
                        ? 'border-mystic-400 shadow-lg shadow-mystic-400/20'
                        : 'border-white/20 opacity-50'
                    }`}
                  />
                  
                  {/* 収集済みバッジ */}
                  {isCollected && (
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 bg-mystic-500 rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  )}
                </div>

                {/* カード情報 */}
                <div className="mt-2 text-center">
                  <h4 className={`text-sm font-semibold ${
                    isCollected ? 'text-white' : 'text-white/40'
                  }`}>
                    {card.name}
                  </h4>
                  <p className={`text-xs ${
                    isCollected ? 'text-white/60' : 'text-white/20'
                  }`}>
                    {isCollected ? card.meaning : '未収集'}
                  </p>
                </div>

                {/* ホバー時の詳細表示 */}
                {isCollected && (
                  <motion.div
                    className="absolute inset-0 bg-black/80 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="text-center p-4">
                      <h5 className="text-white font-semibold mb-2">{card.name}</h5>
                      <p className="text-white/80 text-xs">{card.meaning}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* 未収集カードの説明 */}
        {completionPercentage < 100 && (
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <p className="text-white/60 mb-4">
              占いを続けて、すべてのカードを収集しましょう！
            </p>
            <a
              href="/flow"
              className="inline-block bg-gradient-to-r from-mystic-500 to-crystalPurple-500 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              占いを始める
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
} 