'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import MobileDrawer from './MobileDrawer';

const navItems = [
  { href: '/', label: 'ホーム' },
  { href: '/guide', label: '占いガイド' },
  { href: '/tarot', label: 'タロット一覧' },
  { href: '/fortuners', label: '占い師一覧' },
  { href: '/flow', label: '占いを始める' },
  { href: '/pricing', label: '料金プラン' },
];

export default function MainNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center relative h-16">
            {/* ロゴ - 中央 */}
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                className="w-8 h-8 bg-gradient-to-br from-mystic-500 to-crystalPurple-500 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-white font-bold text-lg">🔮</span>
              </motion.div>
              <span className="text-white font-bold text-xl">AI占い</span>
            </Link>

            {/* デスクトップナビ - 右端 */}
            <div className="hidden md:flex items-center space-x-8 absolute right-0">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white/80 hover:text-white transition-colors duration-200 relative group"
                >
                  {item.label}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-mystic-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
                    initial={false}
                  />
                </Link>
              ))}
              
              {/* ログインボタン */}
              <Link
                href="/login"
                className="bg-gradient-to-r from-royalGold-500 to-royalGold-600 text-white px-4 py-2 rounded-lg hover:from-royalGold-600 hover:to-royalGold-700 transition-all duration-200 font-medium"
              >
                ログイン
              </Link>
            </div>

            {/* モバイルメニューボタン - 右端 */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden absolute right-0 p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
              aria-label="メニューを開く"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* モバイルドロワー */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
      />
    </>
  );
} 