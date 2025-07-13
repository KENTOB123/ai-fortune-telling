'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import CrystalRadar from './CrystalRadar';
import { getFortunerById } from '@/lib/fortuners';
import { getSpreadById } from '@/lib/spreads';

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

interface ResultPanelProps {
  selectedCards: string[];
  fortunerId: string;
  spreadId: string;
}

interface ReadingResult {
  current: string;
  personality: string;
  compatiblePersonality: string;
  incompatiblePersonality: string;
  howToDealWithIncompatible: string;
  happinessMethod: string;
}

export default function ResultPanel({ selectedCards, fortunerId, spreadId }: ResultPanelProps) {
  const [reading, setReading] = useState<ReadingResult | null>(null);
  const [isReading, setIsReading] = useState(true);
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [crystalTypes, setCrystalTypes] = useState<string[]>([]);
  const [understandingLevel, setUnderstandingLevel] = useState(0);

  const fortuner = getFortunerById(fortunerId);
  const spread = getSpreadById(spreadId);

  // 占い結果の生成（簡易版）
  const generateReading = (): ReadingResult => {
    const results = [
      {
        current: "現在、あなたは人生の転換期に立っています。新しい可能性が開かれつつあり、変化を受け入れる準備が整っています。",
        personality: "あなたは直感力が強く、創造的な思考を持つ人です。他人の気持ちを理解する能力に長けており、深い洞察力を持っています。",
        compatiblePersonality: "あなたと相性の良い人は、同じく創造的で直感的な人です。お互いの価値観を理解し合え、深い絆を築けるでしょう。",
        incompatiblePersonality: "論理的で現実的な人とは価値観の違いから摩擦が生じる可能性があります。",
        howToDealWithIncompatible: "相手の視点を理解しようと努め、共通点を見つけることで関係を改善できます。",
        happinessMethod: "自分の直感を信じ、創造的な活動に時間を費やすことで幸せを感じられます。"
      },
      {
        current: "あなたは現在、内なる成長の時期を迎えています。自己探求を通じて、より深い自己理解を得ることができるでしょう。",
        personality: "あなたは内省的で知的な人です。物事を深く考える傾向があり、精神的な成長を重視します。",
        compatiblePersonality: "同じく知的で内省的な人と深い関係を築けます。お互いの成長をサポートし合えるでしょう。",
        incompatiblePersonality: "表面的で軽薄な人とは価値観の違いから距離を感じるかもしれません。",
        howToDealWithIncompatible: "相手の良い面を見つけ、表面的な交流でも価値を見出すことが大切です。",
        happinessMethod: "読書や瞑想、自己探求の時間を持つことで心の平安を得られます。"
      },
      {
        current: "現在、あなたは人間関係において重要な時期を迎えています。愛と絆について深く考える機会が訪れています。",
        personality: "あなたは愛情深く、共感力の高い人です。他人を思いやる心を持ち、深い人間関係を大切にします。",
        compatiblePersonality: "同じく愛情深く、思いやりのある人と深い絆を築けます。お互いを支え合える関係になれるでしょう。",
        incompatiblePersonality: "自己中心的で感情に鈍感な人とは関係が難しいかもしれません。",
        howToDealWithIncompatible: "相手の立場を理解し、適度な距離を保つことで関係を維持できます。",
        happinessMethod: "大切な人との時間を大切にし、愛情を表現することで幸せを感じられます。"
      }
    ];

    return results[Math.floor(Math.random() * results.length)];
  };

  // 水晶玉カテゴリの選択
  const selectCrystalTypes = () => {
    const allTypes = ['balance', 'growth', 'love', 'challenge', 'rest', 'wisdom', 'creativity', 'abundance'];
    const selected = allTypes.sort(() => 0.5 - Math.random()).slice(0, 3);
    setCrystalTypes(selected);
  };

  useEffect(() => {
    const result = generateReading();
    setReading(result);
    selectCrystalTypes();
    
    // 理解度の段階的上昇
    const understandingInterval = setInterval(() => {
      setUnderstandingLevel(prev => {
        if (prev < 100) {
          return prev + 10;
        }
        return prev;
      });
    }, 2000);

    return () => clearInterval(understandingInterval);
  }, []);

  useEffect(() => {
    if (!reading) return;

    const messages = [
      reading.current,
      reading.personality,
      reading.compatiblePersonality,
      reading.incompatiblePersonality,
      reading.howToDealWithIncompatible,
      reading.happinessMethod
    ];

    if (messageIndex < messages.length) {
      const message = messages[messageIndex];
      let charIndex = 0;
      
      const typeInterval = setInterval(() => {
        if (charIndex < message.length) {
          setCurrentMessage(message.substring(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            setMessageIndex(prev => prev + 1);
            setCurrentMessage('');
          }, 1000);
        }
      }, 50);

      return () => clearInterval(typeInterval);
    } else {
      setIsReading(false);
    }
  }, [reading, messageIndex]);

  if (!reading || !fortuner || !spread) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin w-8 h-8 border-2 border-mystic-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-white/60">占い結果を生成中...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ヘッダー */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          {fortuner.name}の占い結果
        </h2>
        <p className="text-white/60">
          {spread.name}による詳細な読み解き
        </p>
      </div>

      {/* 選ばれたカード */}
      <motion.div
        className="bg-white/5 border border-white/10 rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <span className="text-2xl mr-2">🎴</span>
          選ばれたカード
        </h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {selectedCards.map((cardId, index) => {
            const card = tarotCards.find(c => c.id === cardId);
            return (
              <motion.div
                key={cardId}
                className="text-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Image 
                  src={`/cards/dodal/${cardId}.jpg`} 
                  alt={card?.name || cardId} 
                  width={80} 
                  height={130}
                  className="mx-auto rounded-lg"
                />
                <p className="text-center text-sm mt-1 text-white/70">
                  {card?.meaning || cardId}
                </p>
                <p className="text-center text-xs mt-1 text-white/50">
                  {card?.name || cardId}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* 水晶玉レーダー */}
      <motion.div
        className="bg-white/5 border border-white/10 rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <CrystalRadar 
          selectedTypes={crystalTypes}
          showAll={true}
        />
      </motion.div>

      {/* 占い結果 */}
      <motion.div
        className="bg-white/5 border border-white/10 rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <span className="text-2xl mr-2">🔮</span>
          詳細な読み解き
        </h3>

        <div className="space-y-6">
          {/* 現在の状況 */}
          <motion.div
            className="bg-gradient-to-r from-mystic-500/10 to-crystalPurple-500/10 border border-mystic-500/20 rounded-lg p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h4 className="text-white font-semibold mb-2 flex items-center">
              <span className="text-lg mr-2">⚡</span>
              現在の状況
            </h4>
            <p className="text-white/80 leading-relaxed">
              {isReading && messageIndex === 0 ? currentMessage : reading.current}
            </p>
          </motion.div>

          {/* あなたの性格 */}
          <motion.div
            className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-lg p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
          >
            <h4 className="text-white font-semibold mb-2 flex items-center">
              <span className="text-lg mr-2">🧠</span>
              あなたの性格的な特徴
            </h4>
            <p className="text-white/80 leading-relaxed">
              {isReading && messageIndex === 1 ? currentMessage : reading.personality}
            </p>
          </motion.div>

          {/* 相性の良い人 */}
          <motion.div
            className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 }}
          >
            <h4 className="text-white font-semibold mb-2 flex items-center">
              <span className="text-lg mr-2">💕</span>
              相性の良い人の性格
            </h4>
            <p className="text-white/80 leading-relaxed">
              {isReading && messageIndex === 2 ? currentMessage : reading.compatiblePersonality}
            </p>
          </motion.div>

          {/* 相性の悪い人 */}
          <motion.div
            className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3 }}
          >
            <h4 className="text-white font-semibold mb-2 flex items-center">
              <span className="text-lg mr-2">⚠️</span>
              相性の悪い人の性格
            </h4>
            <p className="text-white/80 leading-relaxed">
              {isReading && messageIndex === 3 ? currentMessage : reading.incompatiblePersonality}
            </p>
          </motion.div>

          {/* 接し方 */}
          <motion.div
            className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/20 rounded-lg p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
          >
            <h4 className="text-white font-semibold mb-2 flex items-center">
              <span className="text-lg mr-2">🤝</span>
              相性の悪い人との接し方
            </h4>
            <p className="text-white/80 leading-relaxed">
              {isReading && messageIndex === 4 ? currentMessage : reading.howToDealWithIncompatible}
            </p>
          </motion.div>

          {/* 幸せになる方法 */}
          <motion.div
            className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 rounded-lg p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.7 }}
          >
            <h4 className="text-white font-semibold mb-2 flex items-center">
              <span className="text-lg mr-2">✨</span>
              幸せになれる方法
            </h4>
            <p className="text-white/80 leading-relaxed">
              {isReading && messageIndex === 5 ? currentMessage : reading.happinessMethod}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* 理解度表示 */}
      <motion.div
        className="bg-white/5 border border-white/10 rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0 }}
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <span className="text-2xl mr-2">📊</span>
          理解度
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-white/60">あなたの自己理解度</span>
            <span className="text-white font-semibold">{understandingLevel}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-mystic-500 to-crystalPurple-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${understandingLevel}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-white/60 text-sm">
            {understandingLevel < 30 && "まだ始まったばかりです。もっと深く知りましょう。"}
            {understandingLevel >= 30 && understandingLevel < 70 && "良い理解が進んでいます。さらに深めましょう。"}
            {understandingLevel >= 70 && "素晴らしい理解度です！あなたの成長が感じられます。"}
          </p>
        </div>
      </motion.div>

      {/* アクションボタン */}
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2 }}
      >
        <motion.button
          className="btn-mystic px-8 py-4 text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          もっと深く知る
        </motion.button>
        <div>
          <motion.button
            className="bg-white/10 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            次の課題を解決する
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
} 