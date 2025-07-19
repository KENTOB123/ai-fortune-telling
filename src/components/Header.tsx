'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-900/80 backdrop-blur-sm border-b border-surface-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" aria-label="ホームへ戻る" className="w-8 h-8 bg-gradient-to-br from-mystic-500 to-crystalPurple-500 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity">
              <Sparkles className="w-5 h-5 text-white" />
            </Link>
            <span className="font-mystical text-xl font-semibold text-white">AI占い</span>
          </motion.div>

          {/* ナビゲーション */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/guide" className="text-white/70 hover:text-white transition-colors">
              占いガイド
            </Link>
            <Link href="/pricing" className="text-white/70 hover:text-white transition-colors">
              料金プラン
            </Link>
            <Link href="/contact" className="text-white/70 hover:text-white transition-colors">
              お問い合わせ
            </Link>
            <Link 
              href="/flow" 
              className="bg-gradient-to-r from-mystic-500 to-crystalPurple-500 text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-all duration-200"
            >
              無料占いを始める
            </Link>
          </nav>

          {/* モバイルメニューボタン */}
          <motion.button
            onClick={toggleMenu}
            className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* モバイルドロワー */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden border-t border-surface-800 bg-surface-900/95 backdrop-blur-sm"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-4 space-y-4">
                <Link 
                  href="/guide" 
                  className="block px-4 py-2 text-white/80 hover:text-royalGold-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  占いガイド
                </Link>
                <Link 
                  href="/flow?preset=3cards_tarot" 
                  className="block px-4 py-2 text-white/80 hover:text-royalGold-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  タロット占い
                </Link>
                <Link 
                  href="/pricing" 
                  className="block px-4 py-2 text-white/80 hover:text-royalGold-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  料金プラン
                </Link>
                <Link 
                  href="/contact" 
                  className="block px-4 py-2 text-white/80 hover:text-royalGold-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  お問い合わせ
                </Link>
                <Link 
                  href="/flow" 
                  className="block mx-4 mt-4 bg-gradient-to-r from-mystic-500 to-crystalPurple-500 text-white px-6 py-3 rounded-lg font-medium text-center hover:opacity-90 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  無料占いを始める
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
} 