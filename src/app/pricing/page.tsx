'use client';

import { motion } from 'framer-motion';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const plans = [
  {
    name: 'Free',
    price: '¥0',
    period: '月額',
    description: '基本的な占い体験',
    features: [
      { text: '1日3回まで無料占い', included: true },
      { text: '基本的なスプレッド', included: true },
      { text: '占い結果の保存', included: false },
      { text: '広告非表示', included: false },
      { text: '会員限定スプレッド', included: false },
      { text: '占い師のお気に入り', included: false },
      { text: '優先サポート', included: false },
    ],
    buttonText: '無料で始める',
    popular: false,
    color: 'from-gray-500 to-gray-600'
  },
  {
    name: 'Plus',
    price: '¥480',
    period: '月額',
    description: 'より深い占い体験',
    features: [
      { text: '1日10回まで占い', included: true },
      { text: '全スプレッド利用可能', included: true },
      { text: '占い結果の保存（30日）', included: true },
      { text: '広告非表示', included: true },
      { text: '会員限定スプレッド', included: true },
      { text: '占い師のお気に入り', included: true },
      { text: '占い師割引5%', included: false },
      { text: '月次パーソナルレポート', included: false },
    ],
    buttonText: 'Plusプランに登録',
    popular: true,
    color: 'from-mystic-500 to-mystic-600'
  },
  {
    name: 'Premium',
    price: '¥1,280',
    period: '月額',
    description: '究極の占い体験',
    features: [
      { text: '無制限占い', included: true },
      { text: '全スプレッド利用可能', included: true },
      { text: '占い結果の永久保存', included: true },
      { text: '広告完全非表示', included: true },
      { text: '会員限定スプレッド', included: true },
      { text: '占い師のお気に入り', included: true },
      { text: '占い師割引5%', included: true },
      { text: '月次パーソナルレポート', included: true },
    ],
    buttonText: 'Premiumプランに登録',
    popular: false,
    color: 'from-royalGold-500 to-royalGold-600'
  }
];

export default function PricingPage() {
  const handlePlanSelect = (planName: string) => {
    // ダミーのトースト表示
    alert(`${planName}プランの準備中です`);
  };

  return (
    <div className="min-h-screen bg-midnight-950 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            会員プラン
          </motion.h1>
          <motion.p
            className="text-xl text-white/60"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            あなたに最適なプランを選んでください
          </motion.p>
        </div>

        {/* プラン比較表 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative bg-surface-900 border rounded-xl p-6 ${
                plan.popular 
                  ? 'border-mystic-500 shadow-lg shadow-mystic-500/20' 
                  : 'border-surface-800'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* 人気プランバッジ */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-mystic-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    人気
                  </span>
                </div>
              )}

              {/* プラン名と価格 */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-white/60 ml-1">{plan.period}</span>
                </div>
                <p className="text-white/60 text-sm">{plan.description}</p>
              </div>

              {/* 機能リスト */}
              <div className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    {feature.included ? (
                      <CheckIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                    ) : (
                      <XMarkIcon className="w-5 h-5 text-red-400 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${feature.included ? 'text-white' : 'text-white/40'}`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTAボタン */}
              <motion.button
                onClick={() => handlePlanSelect(plan.name)}
                className={`w-full bg-gradient-to-r ${plan.color} text-white font-medium py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-200`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {plan.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* 補足情報 */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-white/60 text-sm mb-4">
            ※ すべてのプランはいつでもキャンセル可能です
          </p>
          <p className="text-white/40 text-xs">
            無料利用回数リセット時刻: 毎日 09:00 (JST)
          </p>
        </motion.div>
      </div>
    </div>
  );
} 