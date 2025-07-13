'use client';

import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { 
  ClockIcon, 
  HeartIcon, 
  CreditCardIcon, 
  UserIcon 
} from '@heroicons/react/24/outline';

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-midnight-950 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          className="bg-surface-900 border border-surface-800 rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* ヘッダー */}
          <div className="p-6 border-b border-surface-800">
            <h1 className="text-2xl font-mystical text-royalGold-400 mb-2">
              マイページ
            </h1>
            <p className="text-white/60 text-sm">
              あなたの占い体験を管理しましょう
            </p>
          </div>

          {/* タブナビゲーション */}
          <Tabs defaultValue="history" className="w-full">
            <div className="border-b border-surface-800">
              <TabsList className="flex bg-surface-900 p-1">
                <TabsTrigger
                  value="history"
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white/60 hover:text-white data-[state=active]:text-royalGold-400 data-[state=active]:bg-surface-800 rounded-lg transition-all"
                >
                  <ClockIcon className="w-4 h-4" />
                  <span>履歴</span>
                </TabsTrigger>
                <TabsTrigger
                  value="favorites"
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white/60 hover:text-white data-[state=active]:text-royalGold-400 data-[state=active]:bg-surface-800 rounded-lg transition-all"
                >
                  <HeartIcon className="w-4 h-4" />
                  <span>お気に入り</span>
                </TabsTrigger>
                <TabsTrigger
                  value="plan"
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white/60 hover:text-white data-[state=active]:text-royalGold-400 data-[state=active]:bg-surface-800 rounded-lg transition-all"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>契約プラン</span>
                </TabsTrigger>
                <TabsTrigger
                  value="payment"
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white/60 hover:text-white data-[state=active]:text-royalGold-400 data-[state=active]:bg-surface-800 rounded-lg transition-all"
                >
                  <CreditCardIcon className="w-4 h-4" />
                  <span>決済情報</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* タブコンテンツ */}
            <div className="p-6">
              <TabsContent value="history" className="space-y-4">
                <HistoryTab />
              </TabsContent>
              <TabsContent value="favorites" className="space-y-4">
                <FavoritesTab />
              </TabsContent>
              <TabsContent value="plan" className="space-y-4">
                <PlanTab />
              </TabsContent>
              <TabsContent value="payment" className="space-y-4">
                <PaymentTab />
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}

// 履歴タブ
function HistoryTab() {
  const mockHistory = [
    {
      id: 1,
      type: 'タロット',
      fortuner: 'ルナ',
      date: '2024-01-15',
      time: '14:30',
      summary: '恋愛運について'
    },
    {
      id: 2,
      type: '水晶玉',
      fortuner: 'ソレイユ',
      date: '2024-01-14',
      time: '10:15',
      summary: '仕事運について'
    },
    {
      id: 3,
      type: 'Yes/No',
      fortuner: 'ゼファー',
      date: '2024-01-13',
      time: '16:45',
      summary: '転職の決断について'
    }
  ];

  return (
    <div>
      <h2 className="text-xl font-mystical text-royalGold-400 mb-4">占い履歴</h2>
      <div className="space-y-3">
        {mockHistory.map((item) => (
          <motion.div
            key={item.id}
            className="bg-surface-800 border border-surface-700 rounded-lg p-4 hover:border-surface-600 transition-colors"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-white font-medium">{item.type}</h3>
                <p className="text-white/60 text-sm">{item.summary}</p>
                <p className="text-mystic-300 text-sm">占い師: {item.fortuner}</p>
              </div>
              <div className="text-right">
                <p className="text-white/40 text-sm">{item.date}</p>
                <p className="text-white/40 text-sm">{item.time}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// お気に入りタブ
function FavoritesTab() {
  const mockFavorites = [
    { id: 'luna', name: 'ルナ', title: '月の導き手', reason: '恋愛相談が得意' },
    { id: 'soleil', name: 'ソレイユ', title: '太陽の預言者', reason: '明るいアドバイス' }
  ];

  return (
    <div>
      <h2 className="text-xl font-mystical text-royalGold-400 mb-4">お気に入り占い師</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockFavorites.map((fortuner) => (
          <motion.div
            key={fortuner.id}
            className="bg-surface-800 border border-surface-700 rounded-lg p-4 hover:border-royalGold-500/50 transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-white font-medium">{fortuner.name}</h3>
            <p className="text-mystic-300 text-sm mb-2">{fortuner.title}</p>
            <p className="text-white/60 text-sm">{fortuner.reason}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// プランタブ
function PlanTab() {
  return (
    <div>
      <h2 className="text-xl font-mystical text-royalGold-400 mb-4">契約プラン</h2>
      <div className="bg-surface-800 border border-surface-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-white font-medium text-lg">Free プラン</h3>
            <p className="text-white/60 text-sm">現在のプラン</p>
          </div>
          <span className="bg-royalGold-500/20 text-royalGold-400 px-3 py-1 rounded-full text-sm">
            無料
          </span>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-white/80">1日の無料回数</span>
            <span className="text-white">3回</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/80">占いの種類</span>
            <span className="text-white">基本3種類</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/80">履歴保存</span>
            <span className="text-white">30日間</span>
          </div>
        </div>

        <motion.button
          className="w-full bg-gradient-to-r from-royalGold-500 to-royalGold-600 text-white font-medium py-3 px-6 rounded-lg hover:from-royalGold-600 hover:to-royalGold-700 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Premium プランにアップグレード
        </motion.button>
      </div>
    </div>
  );
}

// 決済タブ
function PaymentTab() {
  return (
    <div>
      <h2 className="text-xl font-mystical text-royalGold-400 mb-4">決済情報</h2>
      <div className="bg-surface-800 border border-surface-700 rounded-lg p-6 text-center">
        <div className="w-16 h-16 bg-surface-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white/40" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <h3 className="text-white font-medium mb-2">準備中</h3>
        <p className="text-white/60 text-sm mb-4">
          決済機能は現在開発中です。<br />
          近日中にリリース予定です。
        </p>
        <div className="flex items-center justify-center space-x-2 text-white/40">
          <span>Powered by</span>
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.831 3.47 1.426 3.47 2.338 0 .914-.796 1.431-2.127 1.431-1.72 0-4.516-.924-6.378-2.168l-.9 5.555C8.22 21.827 10.58 23 13.476 23c2.585 0 4.676-.624 6.199-1.588 1.544-.977 2.348-2.614 2.348-4.852 0-4.194-2.457-5.901-6.047-7.41zM24 13.716V0h-5.98v13.716H24z"/>
          </svg>
        </div>
      </div>
    </div>
  );
} 