'use client'

import { TAROT_PENTS } from "@/data/tarot";
export default function TarotList() {
  return (
    <div className="min-h-screen bg-midnight text-white px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">タロット一覧（ペンタクル）</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {TAROT_PENTS.map(card => (
          <article key={card.id} className="bg-surface/70 rounded-xl p-6 space-y-3">
            <p className="text-lg font-semibold">{card.jp}</p>
            <p className="text-sm text-crystal">{card.en}</p>
            <p className="text-xs"><span className="font-bold">正位置：</span>{card.upright}</p>
            <p className="text-xs"><span className="font-bold">逆位置：</span>{card.reversed}</p>
          </article>
        ))}
      </div>
    </div>
  );
} 