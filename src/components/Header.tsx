'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { name: 'ホーム', href: '/' },
    { name: 'タロット占い', href: '/tarot' },
    { name: '星座占い', href: '/zodiac' },
    { name: '水晶玉占い', href: '/crystal' },
    { name: '占い履歴', href: '/history' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-mystic-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ロゴ */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">AI占い</span>
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
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-mystic-700 hover:text-primary-600 hover:bg-mystic-100 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* モバイルメニュー */}
        <motion.div
          initial={false}
          animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-4 py-2 text-mystic-700 hover:text-primary-600 hover:bg-mystic-100 rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </header>
  )
} 