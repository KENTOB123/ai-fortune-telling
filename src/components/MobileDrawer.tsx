'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  href: string;
  label: string;
}

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

export default function MobileDrawer({ isOpen, onClose, navItems }: MobileDrawerProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* オーバーレイ */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* ドロワー */}
          <motion.div
            className="fixed top-0 right-0 h-full w-80 bg-midnight-900/95 backdrop-blur-md z-50 border-l border-white/10"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-6">
              {/* ヘッダー */}
              <div className="flex items-center justify-between mb-8">
                <Link 
                  href="/" 
                  className="flex items-center space-x-2 text-white"
                  onClick={onClose}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-mystic-500 to-crystalPurple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">🔮</span>
                  </div>
                  <span className="text-white font-bold text-xl">AI占い</span>
                </Link>
                <button
                  onClick={onClose}
                  className="p-2 text-white/60 hover:text-white transition-colors"
                  aria-label="メニューを閉じる"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* ナビゲーション */}
              <nav className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={`block px-4 py-3 rounded-lg transition-colors ${
                        pathname === item.href
                          ? 'bg-mystic-500/20 text-mystic-300 border border-mystic-500/30'
                          : 'text-white/80 hover:text-white hover:bg-white/5'
                      }`}
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* フッター情報 */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xs text-white/50 text-center">
                  エンタメ目的の占いサービスです
                </p>
                <p className="text-xs text-white/50 text-center mt-1">
                  リセット時刻: 毎日 09:00 (JST)
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 