'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  HeartIcon, 
  BriefcaseIcon, 
  QuestionMarkCircleIcon, 
  SparklesIcon,
  CpuChipIcon,
  ShieldCheckIcon 
} from '@heroicons/react/24/outline';

const guideCategories = [
  {
    id: 'love',
    title: '恋愛・人間関係',
    description: '恋愛や人間関係の悩みを解決',
    icon: HeartIcon,
    color: 'from-pink-500 to-rose-500',
    presets: [
      { id: '3cards_love', name: '3枚スプレッド', description: '過去・現在・未来の恋愛運' },
      { id: 'cross_love', name: 'クロススプレッド', description: '詳細な恋愛分析' }
    ]
  },
  {
    id: 'career',
    title: '仕事・キャリア',
    description: '仕事やキャリアの方向性を占う',
    icon: BriefcaseIcon,
    color: 'from-blue-500 to-indigo-500',
    presets: [
      { id: '3cards_career', name: '3枚スプレッド', description: '仕事の流れと可能性' },
      { id: 'celtic_career', name: 'ケルト十字', description: '包括的なキャリア分析' }
    ]
  },
  {
    id: 'decision',
    title: '決断・選択',
    description: '重要な決断をサポート',
    icon: QuestionMarkCircleIcon,
    color: 'from-purple-500 to-violet-500',
    presets: [
      { id: 'single_decision', name: 'シングルカード', description: '直感的なアドバイス' },
      { id: 'cross_decision', name: 'クロススプレッド', description: '多角的な分析' }
    ]
  },
  {
    id: 'spiritual',
    title: 'スピリチュアル',
    description: '精神的な成長と癒し',
    icon: SparklesIcon,
    color: 'from-amber-500 to-yellow-500',
    presets: [
      { id: '3cards_spiritual', name: '3枚スプレッド', description: '精神的な成長の流れ' },
      { id: 'celtic_spiritual', name: 'ケルト十字', description: '深い精神分析' }
    ]
  },
  {
    id: 'health',
    title: '健康・ウェルネス',
    description: '心身の健康とバランス',
    icon: CpuChipIcon,
    color: 'from-green-500 to-emerald-500',
    presets: [
      { id: '3cards_health', name: '3枚スプレッド', description: '健康運とライフスタイル' },
      { id: 'cross_health', name: 'クロススプレッド', description: '総合的な健康分析' }
    ]
  },
  {
    id: 'protection',
    title: '運気・開運',
    description: '運気アップと開運のアドバイス',
    icon: ShieldCheckIcon,
    color: 'from-orange-500 to-red-500',
    presets: [
      { id: '3cards_luck', name: '3枚スプレッド', description: '運気の流れと開運法' },
      { id: 'celtic_luck', name: 'ケルト十字', description: '詳細な運気分析' }
    ]
  }
];

const quickQuestions = [
  {
    id: 'relationship',
    question: '人間関係で悩みがありますか？',
    options: ['はい', 'いいえ']
  },
  {
    id: 'career',
    question: '仕事やキャリアについて迷いがありますか？',
    options: ['はい', 'いいえ']
  }
];

export default function GuidePage() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const router = useRouter();

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleQuickDiagnosis = () => {
    const yesCount = Object.values(answers).filter(answer => answer === 'はい').length;
    
    if (yesCount >= 1) {
      setShowRecommendation(true);
      // 最初の「はい」のカテゴリを選択
      const firstYes = Object.entries(answers).find(([_, answer]) => answer === 'はい');
      if (firstYes) {
        setSelectedCategory(firstYes[0]);
      }
    }
  };

  const handleStartReading = (presetId: string) => {
    router.push(`/flow?preset=${presetId}`);
  };

  const isDiagnosisComplete = Object.keys(answers).length === quickQuestions.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight-900 via-midnight-800 to-midnight-900 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            あなたに最適な占いを
          </motion.h1>
          <motion.p
            className="text-xl text-white/60"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            悩みに合わせて最適な占い方法をご提案します
          </motion.p>
        </div>

        {/* クイック診断 */}
        <motion.div
          className="bg-white/5 border border-white/10 rounded-xl p-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            あなたに最適な占いを3秒で診断
          </h2>
          
          <div className="space-y-6">
            {quickQuestions.map((question, index) => (
              <motion.div
                key={question.id}
                className="space-y-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <p className="text-white text-lg">{question.question}</p>
                <div className="flex space-x-4">
                  {question.options.map((option) => (
                    <motion.button
                      key={option}
                      onClick={() => handleAnswer(question.id, option)}
                      className={`px-6 py-3 rounded-lg font-medium transition-all ${
                        answers[question.id] === option
                          ? 'bg-mystic-500 text-white'
                          : 'bg-white/10 text-white/60 hover:bg-white/20'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {isDiagnosisComplete && (
            <motion.div
              className="text-center mt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.button
                onClick={handleQuickDiagnosis}
                className="btn-mystic px-8 py-3 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                診断結果を見る
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* 診断結果 */}
        <AnimatePresence>
          {showRecommendation && selectedCategory && (
            <motion.div
              className="bg-gradient-to-r from-mystic-500/20 to-crystalPurple-500/20 border border-mystic-500/30 rounded-xl p-6 mb-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                🎯 あなたにおすすめの占い
              </h3>
              <p className="text-white/80 text-center mb-6">
                診断結果に基づいて、最適な占い方法をご提案します
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {guideCategories
                  .find(cat => cat.id === selectedCategory)
                  ?.presets.map((preset) => (
                    <motion.div
                      key={preset.id}
                      className="bg-white/10 border border-white/20 rounded-lg p-4 cursor-pointer hover:bg-white/20 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleStartReading(preset.id)}
                    >
                      <h4 className="text-white font-semibold mb-2">{preset.name}</h4>
                      <p className="text-white/60 text-sm">{preset.description}</p>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* カテゴリ別ガイド */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            悩み別占いガイド
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guideCategories.map((category, index) => (
              <motion.div
                key={category.id}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center mb-4`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
                <p className="text-white/60 text-sm mb-4">{category.description}</p>
                
                <div className="space-y-2">
                  {category.presets.map((preset) => (
                    <motion.button
                      key={preset.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartReading(preset.id);
                      }}
                      className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <p className="text-white font-medium text-sm">{preset.name}</p>
                      <p className="text-white/50 text-xs">{preset.description}</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link href="/flow">
            <motion.button
              className="btn-mystic px-8 py-4 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              自由に占いを選ぶ
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 