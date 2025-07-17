'use client';

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

export default function OracleGuidePage() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);

  const handleAsk = () => {
    // ダミー回答
    const answers = ['はい', 'いいえ', 'どちらでもありません'];
    setAnswer(answers[Math.floor(Math.random() * answers.length)]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-midnight-950 to-surface-900 pt-20">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* ヒーロー画像 */}
        <div className="relative w-full h-48 mb-8 rounded-xl overflow-hidden">
          <Image 
            src="/guide/oracle.png" 
            alt="Yes/Noオラクル" 
            fill 
            priority
            sizes="(max-width: 768px) 80vw, 400px"
            className="object-cover" 
          />
        </div>
        {/* 概要 */}
        <h1 className="text-3xl font-bold text-white mb-4 text-center">Yes/No オラクルとは？</h1>
        <p className="text-white/80 text-center mb-8 leading-relaxed">
          シンプルに「はい」「いいえ」で答えが欲しいときに最適なAI占いです。<br />
          迷ったとき、背中を押してほしいとき、気軽に質問してみましょう。
        </p>
        {/* サンプル質問入力 */}
        <div className="bg-surface-900/80 rounded-xl p-6 mb-6">
          <label className="block text-white/80 mb-2">質問例：</label>
          <input
            type="text"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="例: 明日告白してもいいですか？"
            className="w-full px-4 py-3 rounded-lg bg-surface-800 text-white mb-4 focus:outline-none"
          />
          <button
            className="btn-mystic w-full mb-4"
            onClick={handleAsk}
            disabled={!question.trim()}
          >
            AIに聞く
          </button>
          {answer && (
            <div className="text-center mt-4">
              <span className="text-2xl font-bold text-mystic-300">{answer}</span>
            </div>
          )}
        </div>
        {/* CTA */}
        <div className="text-center mt-8">
          <Link href="/flow?preset=yesno">
            <button className="btn-mystic px-8 py-3 text-lg">Yes/Noオラクルで占う</button>
          </Link>
        </div>
      </div>
    </main>
  );
} 