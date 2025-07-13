'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // モック登録処理
    setTimeout(() => {
      setIsLoading(false);
      router.push('/mypage');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-midnight-950 pt-20">
      <div className="max-w-md mx-auto px-4 py-8">
        <motion.div
          className="bg-surface-900 border border-surface-800 rounded-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* ヘッダー */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-mystical text-royalGold-400 mb-2">
              新規登録
            </h1>
            <p className="text-white/60 text-sm">
              神秘的な占い体験を始めましょう
            </p>
          </div>

          {/* 登録フォーム */}
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

            {/* パスワード確認 */}
            <div>
              <label htmlFor="confirmPassword" className="block text-white/80 text-sm font-medium mb-2">
                パスワード確認
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-surface-800 border border-surface-700 rounded-lg px-4 py-3 pr-12 text-white placeholder-white/40 focus:outline-none focus:border-royalGold-500/50 transition-colors"
                  placeholder="パスワードを再入力"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* 利用規約同意 */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-royalGold-500 bg-surface-800 border-surface-700 rounded focus:ring-royalGold-500/50 focus:ring-2"
                required
              />
              <label htmlFor="agreeToTerms" className="text-white/60 text-sm">
                <Link href="/terms" className="text-royalGold-400 hover:text-royalGold-300 underline">
                  利用規約
                </Link>
                と
                <Link href="/privacy" className="text-royalGold-400 hover:text-royalGold-300 underline">
                  プライバシーポリシー
                </Link>
                に同意します
              </label>
            </div>

            {/* 登録ボタン */}
            <motion.button
              type="submit"
              disabled={isLoading || !email || !password || !confirmPassword || !agreeToTerms}
              className="w-full bg-gradient-to-r from-royalGold-500 to-royalGold-600 text-white font-medium py-3 px-6 rounded-lg hover:from-royalGold-600 hover:to-royalGold-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-royalGold-500/50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  登録中...
                </div>
              ) : (
                'アカウントを作成'
              )}
            </motion.button>
          </form>

          {/* リンク */}
          <div className="mt-6 text-center">
            <div className="text-white/40 text-sm">
              すでにアカウントをお持ちの方は{' '}
              <Link href="/login" className="text-royalGold-400 hover:text-royalGold-300">
                ログイン
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 