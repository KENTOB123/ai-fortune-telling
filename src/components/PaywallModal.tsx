'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const plans = [
  {
    id: 'monthly',
    name: '月額プラン',
    price: '¥980',
    period: '月',
    features: [
      '無制限の占い',
      '詳細な結果分析',
      '過去の占い履歴',
      '優先サポート'
    ],
    popular: false
  },
  {
    id: 'yearly',
    name: '年額プラン',
    price: '¥9,800',
    period: '年',
    features: [
      '無制限の占い',
      '詳細な結果分析',
      '過去の占い履歴',
      '優先サポート',
      '特別な占い師とのセッション',
      '2ヶ月分お得'
    ],
    popular: true
  }
];

export default function PaywallModal({ isOpen, onClose }: PaywallModalProps) {
  const handlePlanSelect = (planId: string) => {
    // Stripe Checkout の実装
    console.log('Selected plan:', planId);
    // ここでStripe Checkoutを呼び出す
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* オーバーレイ */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* モーダル */}
          <motion.div
            className="relative bg-midnight-800 border border-white/10 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* ヘッダー */}
            <div className="text-center mb-8">
              <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="モーダルを閉じる"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              <div className="w-16 h-16 bg-gradient-to-br from-mystic-400 to-mystic-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">✨</span>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">
                VIP会員になって
              </h2>
              <p className="text-white/60">
                無制限の占い体験を楽しもう
              </p>
            </div>

            {/* プラン選択 */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  className={`relative p-6 rounded-xl border-2 transition-all cursor-pointer ${
                    plan.popular
                      ? 'border-mystic-500 bg-mystic-500/10'
                      : 'border-white/20 bg-white/5 hover:border-white/40'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePlanSelect(plan.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-mystic-500 text-white text-xs px-3 py-1 rounded-full">
                        人気
                      </span>
                    </div>
                  )}

                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {plan.name}
                    </h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-white">
                        {plan.price}
                      </span>
                      <span className="text-white/60">/{plan.period}</span>
                    </div>

                    <ul className="space-y-2 text-left">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-white/80">
                          <svg className="w-4 h-4 text-mystic-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* フッター */}
            <div className="text-center">
              <p className="text-xs text-white/40 mb-4">
                いつでもキャンセル可能。エンタメ目的のサービスです。
              </p>
              <motion.button
                onClick={onClose}
                className="text-white/60 hover:text-white text-sm underline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                後で決める
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 