'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TarotCard from './TarotCard';
import CompleteModal from './CompleteModal';
import CompleteBar from './CompleteBar';
import Link from 'next/link';

interface CardReadingProps {
  onComplete: (selectedCards: string[]) => void;
  preset?: string | null;
}

// 簡易タロットカードデータ
const tarotCards = [
  { id: 'fool', name: '愚者', meaning: '新しい始まり、純粋さ、冒険心' },
  { id: 'magician', name: '魔術師', meaning: '創造力、意志力、可能性' },
  { id: 'priestess', name: '女祭司', meaning: '直感、神秘、内なる知恵' },
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

export default function CardReading({ onComplete, preset }: CardReadingProps) {
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const completeRef = useRef<HTMLDivElement>(null);

  // presetごとのカード枚数
  const presetMap = {
    single: 1,
    '3cards_tarot': 3,
    cross: 5,
    celtic: 10
  };
  
  const counts: Record<string, number> = {
    single_card: 1,
    '3cards_tarot': 3,
    cross_spread: 5,
    celtic_cross: 10,
  };
  const required = preset && counts[preset] ? counts[preset] : 3;

  const handleCardSelect = (cardId: string) => {
    if (selectedCards.includes(cardId)) {
      setSelectedCards(prev => prev.filter(id => id !== cardId));
    } else if (selectedCards.length < required) {
      setSelectedCards(prev => [...prev, cardId]);
    }
  };

  useEffect(() => {
    if (selectedCards.length === required) {
      setShowComplete(true);
      // 自動スクロール
      setTimeout(() => {
        completeRef.current?.scrollIntoView({behavior:"smooth", block:"center"});
      }, 300);
    }
  }, [selectedCards, required]);

  const handleContinue = () => {
    onComplete(selectedCards);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          {required}枚のカードを選んでください
        </h2>
        <p className="text-white/60 text-lg mb-6">
          心を落ち着かせて、直感に従って{required}枚のカードを選んでください
        </p>
        {/* 進捗表示 */}
        <div className="flex justify-center items-center space-x-4 mb-6">
          <span className="text-white/60">{selectedCards.length}/{required} 枚</span>
          <div className="flex space-x-2">
            {Array.from({ length: required }, (_, i) => i + 1).map((num) => (
              <motion.div
                key={num}
                className={`w-3 h-3 rounded-full ${
                  num <= selectedCards.length ? 'bg-mystic-500' : 'bg-white/20'
                }`}
                animate={{
                  scale: num <= selectedCards.length ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* スクロールターゲット */}
      <div ref={completeRef} />
      
      {/* 完了メッセージ */}
      <AnimatePresence>
        {showComplete && (
          <motion.div
            className="text-center p-6 bg-gradient-to-r from-mystic-500/20 to-crystalPurple-500/20 border border-mystic-500/30 rounded-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              ✨ カードが選ばれました！
            </h3>
            <p className="text-white/80 mb-6">
              選ばれたカードからあなたの未来を読み解きます
            </p>
            <motion.button
              onClick={handleContinue}
              className="btn-mystic px-8 py-3 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              占いを開始
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* カードグリッド */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {tarotCards.map((card, index) => {
          const isSelected = selectedCards.includes(card.id);
          const isDisabled = selectedCards.length >= required && !isSelected;
          
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isComplete && !isSelected ? 0.3 : 1,
                y: 0,
                scale: isComplete && !isSelected ? 0.8 : 1
              }}
              transition={{ 
                delay: index * 0.05,
                duration: 0.3
              }}
            >
              <TarotCard
                id={card.id}
                name={card.name}
                isSelected={isSelected}
                isDisabled={isDisabled}
                onSelect={handleCardSelect}
                className="w-full"
              />
            </motion.div>
          );
        })}
      </div>

      {/* 選択されたカードの詳細 */}
      {selectedCards.length > 0 && (
        <motion.div
          className="bg-white/5 border border-white/10 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">
            選ばれたカード ({selectedCards.length}/{required})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedCards.map((cardId, index) => {
              const card = tarotCards.find(c => c.id === cardId);
              if (!card) return null;
              
              return (
                <motion.div
                  key={cardId}
                  className="bg-white/10 border border-white/20 rounded-lg p-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <h4 className="text-white font-semibold mb-2">{card.name}</h4>
                  <p className="text-white/70 text-sm">{card.meaning}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
      
      {/* CompleteModal と CompleteBar */}
      {showComplete && (
        <>
          <CompleteModal open={showComplete} setOpen={setShowComplete} onStart={handleContinue} />
          <CompleteBar onStart={handleContinue} />
          
          {/* 履歴保存バナー */}
          <motion.div
            className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-mystic-500/90 to-crystalPurple-500/90 backdrop-blur-sm border border-mystic-500/30 rounded-xl px-6 py-3 text-white text-center z-40"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link href="/mypage" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
              <span>履歴に保存しました！</span>
              <span className="text-royalGold-300">▶ マイページ</span>
            </Link>
          </motion.div>
        </>
      )}
    </div>
  );
} 