'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // モックログイン処理
    setTimeout(() => {
      setIsLoading(false);
      router.push('/mypage');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-midnight-950 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左サイド - メリット */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h1 className="text-3xl font-semibold mb-6">メンバーサインイン</h1>
              <ul className="space-y-1 text-sm mb-6 list-disc list-inside text-white/80">
                <li>占い履歴を保存して振り返り</li>
                <li>お気に入り占い師をブックマーク</li>
                <li>会員限定スプレッドを解放</li>
              </ul>
            </div>
          </motion.div>

          {/* 右サイド - フォーム */}
          <motion.div
            className="bg-surface-900 border border-surface-800 rounded-xl p-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* ログインフォーム */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* メールアドレス */}
              <div>
                <label htmlFor="email" className="block text-white/80 text-sm font-medium mb-2">
                  メールアドレス
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface-800 border border-surface-700 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-royalGold-500/50 transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>

              {/* パスワード */}
              <div>
                <label htmlFor="password" className="block text-white/80 text-sm font-medium mb-2">
                  パスワード
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-surface-800 border border-surface-700 rounded-lg px-4 py-3 pr-12 text-white placeholder-white/40 focus:outline-none focus:border-royalGold-500/50 transition-colors"
                    placeholder="パスワードを入力"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* ログインボタン */}
              <motion.button
                type="submit"
                disabled={isLoading || !email || !password}
                className="w-full bg-gradient-to-r from-royalGold-500 to-royalGold-600 text-white font-medium py-3 px-6 rounded-lg hover:from-royalGold-600 hover:to-royalGold-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-royalGold-500/50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    ログイン中...
                  </div>
                ) : (
                  'ログイン'
                )}
              </motion.button>
            </form>

            {/* リンク */}
            <div className="mt-6 text-center space-y-3">
              <a
                href="#"
                className="block text-royalGold-400 hover:text-royalGold-300 text-sm transition-colors"
              >
                パスワードを忘れた方
              </a>
              <p className="mt-4 text-sm text-white/70">
                初めての方は <Link href="/register" className="underline">無料登録</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 