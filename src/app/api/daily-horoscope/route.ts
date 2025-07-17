import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import OpenAI from 'openai';

export const revalidate = 86400; // 24h

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sign = (searchParams.get('sign') ?? 'aries') as string;

  // ① キャッシュがあれば返却
  const cacheKey = `horoscope:${sign}:${new Date().toISOString().slice(0,10)}`;
  const cached = await kv.get(cacheKey);
  if (cached) return NextResponse.json(cached);

  // ② OpenAI で生成
  const openai = new OpenAI();
  const sys = `You are a fortune teller. Output today's horoscope for ${sign} in Japanese (120字以内). Include lucky color & item.`;
  const res = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{role:'system',content:sys}],
    max_tokens: 200, temperature:0.8
  });
  
  const content = res.choices[0]?.message?.content;
  if (!content) {
    return NextResponse.json(
      { error: 'Failed to generate horoscope' },
      { status: 500 }
    );
  }
  
  const text = content.trim();

  // ③ 24h キャッシュ
  await kv.set(cacheKey, { sign, text }, { ex: 60*60*25 });
  return NextResponse.json({ sign, text });
} 