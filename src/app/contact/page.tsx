'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // モック送信処理
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // 3秒後にリセット
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-midnight-950 pt-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          className="bg-surface-900 border border-surface-800 rounded-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* ヘッダー */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-mystical text-royalGold-400 mb-4">
              お問い合わせ
            </h1>
            <p className="text-white/60 text-lg">
              ご質問やご意見がございましたら、お気軽にお聞かせください
            </p>
          </div>

          {/* 成功メッセージ */}
          {isSubmitted && (
            <motion.div
              className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <p className="text-green-400 text-center font-medium">
                送信しました（ダミー）
              </p>
            </motion.div>
          )}

          {/* お問い合わせフォーム */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 名前 */}
            <div>
              <label htmlFor="name" className="block text-white/80 text-sm font-medium mb-2">
                お名前 <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-surface-800 border border-surface-700 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-royalGold-500/50 transition-colors"
                placeholder="山田 太郎"
                required
              />
            </div>

            {/* メールアドレス */}
            <div>
              <label htmlFor="email" className="block text-white/80 text-sm font-medium mb-2">
                メールアドレス <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-surface-800 border border-surface-700 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-royalGold-500/50 transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>

            {/* 件名 */}
            <div>
              <label htmlFor="subject" className="block text-white/80 text-sm font-medium mb-2">
                件名 <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-surface-800 border border-surface-700 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-royalGold-500/50 transition-colors"
                placeholder="お問い合わせの件名"
                required
              />
            </div>

            {/* 内容 */}
            <div>
              <label htmlFor="message" className="block text-white/80 text-sm font-medium mb-2">
                お問い合わせ内容 <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full bg-surface-800 border border-surface-700 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-royalGold-500/50 transition-colors resize-none"
                placeholder="お問い合わせ内容を詳しくお聞かせください"
                required
              />
            </div>

            {/* 送信ボタン */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-royalGold-500 to-royalGold-600 text-white font-medium py-4 px-6 rounded-lg hover:from-royalGold-600 hover:to-royalGold-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-royalGold-500/50 flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  送信中...
                </div>
              ) : (
                <>
                  <PaperAirplaneIcon className="w-5 h-5 mr-2" />
                  送信する
                </>
              )}
            </motion.button>
          </form>

          {/* 補足情報 */}
          <div className="mt-8 p-6 bg-surface-800 rounded-lg">
            <h3 className="text-lg font-mystical text-royalGold-400 mb-3">お問い合わせについて</h3>
            <ul className="text-white/60 text-sm space-y-2">
              <li>• 通常2-3営業日以内にご返信いたします</li>
              <li>• 個人情報は適切に管理し、お問い合わせ対応以外では使用いたしません</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 