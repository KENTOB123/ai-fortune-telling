'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import FortunerGrid from '@/components/FortunerGrid';
import SpreadSelection from '@/components/SpreadSelection';
import CardReading from '@/components/CardReading';
import ResultPanel from '@/components/ResultPanel';
import Stepper from '@/components/Stepper';
import PaywallModal from '@/components/PaywallModal';
import { useQuota } from '@/lib/useQuota';
import { supabase } from '@/lib/supabase';

type Step = 'fortuner' | 'spread' | 'cards' | 'result';

// プリセット設定
const presets: Record<string, { fortunerId: string; spreadId: string; description: string }> = {
  '3cards_love': {
    fortunerId: 'akari',
    spreadId: '3cards_tarot',
    description: '恋愛運の3枚スプレッド'
  },
  '3cards_career': {
    fortunerId: 'seren',
    spreadId: '3cards_tarot',
    description: 'キャリア運の3枚スプレッド'
  },
  '3cards_spiritual': {
    fortunerId: 'tsumugi',
    spreadId: '3cards_tarot',
    description: '精神成長の3枚スプレッド'
  },
  '3cards_health': {
    fortunerId: 'yumie',
    spreadId: '3cards_tarot',
    description: '健康運の3枚スプレッド'
  },
  '3cards_luck': {
    fortunerId: 'gen',
    spreadId: '3cards_tarot',
    description: '運気アップの3枚スプレッド'
  },
  'cross_love': {
    fortunerId: 'akari',
    spreadId: 'cross',
    description: '詳細な恋愛分析'
  },
  'cross_career': {
    fortunerId: 'seren',
    spreadId: 'cross',
    description: '詳細なキャリア分析'
  },
  'cross_decision': {
    fortunerId: 'tsumugi',
    spreadId: 'cross',
    description: '重要な決断の分析'
  },
  'cross_health': {
    fortunerId: 'yumie',
    spreadId: 'cross',
    description: '詳細な健康分析'
  },
  'cross_spiritual': {
    fortunerId: 'tsumugi',
    spreadId: 'cross',
    description: '深い精神分析'
  },
  'cross_luck': {
    fortunerId: 'gen',
    spreadId: 'cross',
    description: '詳細な運気分析'
  },
  'single_decision': {
    fortunerId: 'tsumugi',
    spreadId: 'single',
    description: '直感的なアドバイス'
  },
  'celtic_career': {
    fortunerId: 'seren',
    spreadId: 'celtic',
    description: '包括的なキャリア分析'
  },
  'celtic_spiritual': {
    fortunerId: 'tsumugi',
    spreadId: 'celtic',
    description: '深い精神分析'
  },
  'celtic_luck': {
    fortunerId: 'gen',
    spreadId: 'celtic',
    description: '詳細な運気分析'
  }
};

export default function FlowPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const preset = searchParams.get('preset');
  const teller = searchParams.get('teller');
  
  const [currentStep, setCurrentStep] = useState<Step>('fortuner');
  const [selectedFortuner, setSelectedFortuner] = useState<string | null>(null);
  const [selectedSpread, setSelectedSpread] = useState<string | null>(null);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [showPaywall, setShowPaywall] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
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

  // tellerが指定されている場合の初期化
  useEffect(() => {
    if (teller) {
      setSelectedFortuner(teller);
      setCurrentStep('spread');
    }
  }, [teller]);

  const handleFortunerSelect = (fortunerId: string) => {
    setSelectedFortuner(fortunerId);
    setCurrentStep('spread');
    
    // URLにtellerを追加
    const params = new URLSearchParams(searchParams);
    params.set('teller', fortunerId);
    router.push(`/flow?${params.toString()}`);
  };

  const handleSpreadSelect = (spreadId: string) => {
    setSelectedSpread(spreadId);
    setCurrentStep('cards');
    
    // URLにpresetを追加
    const params = new URLSearchParams(searchParams);
    params.set('preset', spreadId);
    router.push(`/flow?${params.toString()}`);
  };

  const handleCardsComplete = async (cards: string[]) => {
    if (!consumeQuota()) {
      setShowPaywall(true);
      return;
    }
    
    setSelectedCards(cards);
    setCurrentStep('result');
    setIsLoading(true);

    try {
      // 占い結果を保存
      const response = await fetch('/api/readings/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teller: selectedFortuner,
          preset: selectedSpread,
          cards,
          question: null, // 必要に応じて質問フィールドを追加
        }),
      });

      if (!response.ok) {
        throw new Error('占い結果の保存に失敗しました');
      }

    } catch (error) {
      console.error('Save reading error:', error);
      // エラーが発生しても結果表示は続行
    } finally {
      setIsLoading(false);
    }
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
    router.push('/flow');
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
        {teller && (
          <div className="mb-4 text-center">
            <span className="text-mystic-300 font-semibold">選択された占い師ID:</span> {teller}
          </div>
        )}
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
                <FortunerGrid onSelect={handleFortunerSelect} />
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
                <SpreadSelection selectedSpread={selectedSpread} onSelect={handleSpreadSelect} />
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
                <CardReading onComplete={handleCardsComplete} preset={selectedSpread} />
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
                  fortunerId={selectedFortuner!}
                  spreadId={selectedSpread!}
                  selectedCards={selectedCards}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 戻るボタン */}
        {currentStep !== 'fortuner' && (
          <motion.button
            onClick={handleBack}
            className="fixed bottom-6 left-6 bg-surface-800 text-white px-4 py-2 rounded-lg hover:bg-surface-700 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            戻る
          </motion.button>
        )}

        {/* ローディングオーバーレイ */}
        {isLoading && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-surface-900 p-6 rounded-xl">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mystic-500 mx-auto mb-4"></div>
                占い結果を保存中...
              </div>
            </div>
          </motion.div>
        )}

        {/* ペイウォールモーダル */}
        <PaywallModal isOpen={showPaywall} onClose={() => setShowPaywall(false)} />
      </div>
    </div>
  );
} 