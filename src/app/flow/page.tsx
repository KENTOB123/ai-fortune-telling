'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import FortunerGrid from '@/components/FortunerGrid';
import SpreadSelection from '@/components/SpreadSelection';
import CardReading from '@/components/CardReading';
import ResultPanel from '@/components/ResultPanel';
import Stepper from '@/components/Stepper';
import PaywallModal from '@/components/PaywallModal';
import { useQuota } from '@/lib/useQuota';

type Step = 'fortuner' | 'spread' | 'cards' | 'result';

// プリセット設定
const presets: Record<string, { fortunerId: string; spreadId: string; description: string }> = {
  '3cards_love': {
    fortunerId: 'luna',
    spreadId: 'three-cards',
    description: '恋愛運の3枚スプレッド'
  },
  '3cards_career': {
    fortunerId: 'solaris',
    spreadId: 'three-cards',
    description: 'キャリア運の3枚スプレッド'
  },
  '3cards_spiritual': {
    fortunerId: 'stella',
    spreadId: 'three-cards',
    description: '精神成長の3枚スプレッド'
  },
  '3cards_health': {
    fortunerId: 'crystal',
    spreadId: 'three-cards',
    description: '健康運の3枚スプレッド'
  },
  '3cards_luck': {
    fortunerId: 'solaris',
    spreadId: 'three-cards',
    description: '運気アップの3枚スプレッド'
  },
  'cross_love': {
    fortunerId: 'luna',
    spreadId: 'cross',
    description: '詳細な恋愛分析'
  },
  'cross_career': {
    fortunerId: 'solaris',
    spreadId: 'cross',
    description: '詳細なキャリア分析'
  },
  'cross_decision': {
    fortunerId: 'stella',
    spreadId: 'cross',
    description: '重要な決断の分析'
  },
  'cross_health': {
    fortunerId: 'crystal',
    spreadId: 'cross',
    description: '詳細な健康分析'
  },
  'cross_spiritual': {
    fortunerId: 'stella',
    spreadId: 'cross',
    description: '深い精神分析'
  },
  'cross_luck': {
    fortunerId: 'solaris',
    spreadId: 'cross',
    description: '詳細な運気分析'
  },
  'single_decision': {
    fortunerId: 'stella',
    spreadId: 'single',
    description: '直感的なアドバイス'
  },
  'celtic_career': {
    fortunerId: 'solaris',
    spreadId: 'celtic-cross',
    description: '包括的なキャリア分析'
  },
  'celtic_spiritual': {
    fortunerId: 'stella',
    spreadId: 'celtic-cross',
    description: '深い精神分析'
  },
  'celtic_luck': {
    fortunerId: 'solaris',
    spreadId: 'celtic-cross',
    description: '詳細な運気分析'
  }
};

export default function FlowPage() {
  const searchParams = useSearchParams();
  const preset = searchParams.get('preset');
  
  const [currentStep, setCurrentStep] = useState<Step>('fortuner');
  const [selectedFortuner, setSelectedFortuner] = useState<string | null>(null);
  const [selectedSpread, setSelectedSpread] = useState<string | null>(null);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [showPaywall, setShowPaywall] = useState(false);
  
  const { quotaInfo, useQuota: consumeQuota } = useQuota();

  // プリセットが指定されている場合の初期化
  useEffect(() => {
    if (preset && presets[preset]) {
      const presetConfig = presets[preset];
      setSelectedFortuner(presetConfig.fortunerId);
      setSelectedSpread(presetConfig.spreadId);
      setCurrentStep('cards');
    }
  }, [preset]);

  const handleFortunerSelect = (fortunerId: string) => {
    setSelectedFortuner(fortunerId);
    setCurrentStep('spread');
  };

  const handleSpreadSelect = (spreadId: string) => {
    setSelectedSpread(spreadId);
    setCurrentStep('cards');
  };

  const handleCardsComplete = (cards: string[]) => {
    if (!consumeQuota()) {
      setShowPaywall(true);
      return;
    }
    
    setSelectedCards(cards);
    setCurrentStep('result');
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'spread':
        setCurrentStep('fortuner');
        break;
      case 'cards':
        setCurrentStep('spread');
        break;
      case 'result':
        setCurrentStep('cards');
        break;
    }
  };

  const handleRestart = () => {
    setCurrentStep('fortuner');
    setSelectedFortuner(null);
    setSelectedSpread(null);
    setSelectedCards([]);
  };

  const steps = [
    { id: 'fortuner', label: '占い師選択', completed: !!selectedFortuner },
    { id: 'spread', label: 'スプレッド選択', completed: !!selectedSpread },
    { id: 'cards', label: 'カード選択', completed: selectedCards.length > 0 },
    { id: 'result', label: '結果表示', completed: currentStep === 'result' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight-900 via-midnight-800 to-midnight-900 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* プリセット情報 */}
        {preset && presets[preset] && (
          <motion.div
            className="bg-gradient-to-r from-mystic-500/20 to-crystalPurple-500/20 border border-mystic-500/30 rounded-xl p-4 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-white text-center">
              <span className="text-mystic-300 font-semibold">プリセット:</span> {presets[preset].description}
            </p>
          </motion.div>
        )}

        {/* ステッパー */}
        <div className="mb-8">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>

        {/* メインコンテンツ */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {currentStep === 'fortuner' && (
              <motion.div
                key="fortuner"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <FortunerGrid
                  onSelect={handleFortunerSelect}
                />
              </motion.div>
            )}

            {currentStep === 'spread' && (
              <motion.div
                key="spread"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SpreadSelection
                  selectedSpread={selectedSpread}
                  onSelect={handleSpreadSelect}
                />
              </motion.div>
            )}

            {currentStep === 'cards' && (
              <motion.div
                key="cards"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CardReading onComplete={handleCardsComplete} />
              </motion.div>
            )}

            {currentStep === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ResultPanel
                  selectedCards={selectedCards}
                  fortunerId={selectedFortuner!}
                  spreadId={selectedSpread!}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ナビゲーションボタン */}
        <div className="flex justify-between items-center mt-8">
          <motion.button
            onClick={handleBack}
            disabled={currentStep === 'fortuner'}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              currentStep === 'fortuner'
                ? 'bg-white/10 text-white/30 cursor-not-allowed'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
            whileHover={currentStep !== 'fortuner' ? { scale: 1.05 } : {}}
            whileTap={currentStep !== 'fortuner' ? { scale: 0.95 } : {}}
          >
            戻る
          </motion.button>

          {currentStep === 'result' && (
            <motion.button
              onClick={handleRestart}
              className="btn-mystic px-6 py-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              新しい占いを始める
            </motion.button>
          )}
        </div>

        {/* 無料回数表示 */}
        <div className="text-center mt-8">
          <p className="text-white/60 text-sm">
            今日の残り無料回数: <span className="text-mystic-300 font-semibold">{3 - quotaInfo.count}</span>回
          </p>
          <p className="text-white/40 text-xs">
            リセット時刻: 毎日 09:00 (JST)
          </p>
        </div>
      </div>

      {/* 課金モーダル */}
      <PaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
      />
    </div>
  );
} 