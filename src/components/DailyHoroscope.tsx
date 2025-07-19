'use client';

import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdBanner from './AdBanner';

const SIGNS = [
  ['aries','牡羊座'], ['taurus','牡牛座'], ['gemini','双子座'],
  ['cancer','蟹座'], ['leo','獅子座'], ['virgo','乙女座'],
  ['libra','天秤座'], ['scorpio','蠍座'], ['sagittarius','射手座'],
  ['capricorn','山羊座'], ['aquarius','水瓶座'], ['pisces','魚座'],
];

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function DailyHoroscope() {
  const [sign, setSign] = useState(
    () => {
      if (typeof window !== 'undefined') {
        return localStorage.getItem('zodiac') ?? 'aries';
      }
      return 'aries';
    }
  );
  
  const { data, error, isLoading } = useSWR(
    `/api/daily-horoscope?sign=${sign}`, 
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0 // 手動でリフレッシュしない
    }
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('zodiac', sign);
    }
  }, [sign]);

  return (
    <section className="py-16 bg-surface-950">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-mystical text-royalGold-400 text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          今日の星座占い
        </motion.h2>
        
        <div className="max-w-md mx-auto">
          <motion.select 
            value={sign} 
            onChange={e => setSign(e.target.value)}
            className="block w-full mx-auto mb-6 bg-surface-800 border border-surface-700 rounded-lg p-3 text-white focus:border-royalGold-500 focus:outline-none transition-colors"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {SIGNS.map(([k, v]) => (
              <option key={k} value={k} className="bg-surface-800 text-white">
                {v}
              </option>
            ))}
          </motion.select>

          <motion.div 
            className="bg-surface-900 border border-surface-800 rounded-xl p-6 text-white/90 space-y-4 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {isLoading ? (
              <div className="space-y-4">
                <div className="h-28 animate-pulse bg-surface-800 rounded-lg" />
                <div className="h-4 animate-pulse bg-surface-800 rounded w-3/4 mx-auto" />
                <div className="h-10 animate-pulse bg-surface-800 rounded-lg" />
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-400 mb-4">読み込みに失敗しました</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="text-royalGold-400 hover:text-royalGold-300 transition-colors"
                >
                  再試行
                </button>
              </div>
            ) : data ? (
              <>
                <div className="text-center mb-4">
                  <span className="text-royalGold-400 font-semibold">
                    {SIGNS.find(([k]) => k === sign)?.[1]}
                  </span>
                  <span className="text-white/60 ml-2">
                    {new Date().toLocaleDateString('ja-JP', { 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <p className="whitespace-pre-wrap leading-relaxed text-center">
                  {data.text}
                </p>
                <motion.a 
                  href={`/flow/single_card/${sign}`}
                  className="btn-mystic w-full block text-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  詳細鑑定はこちら
                </motion.a>
              </>
            ) : null}
          </motion.div>

          {/* 広告バナー - 無料ユーザーのみ表示 */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <AdBanner />
          </motion.div>
        </div>
      </div>
    </section>
  );
} 