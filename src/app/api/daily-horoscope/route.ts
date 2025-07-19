import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const revalidate = 86400; // 24h

// 条件付きでVercel KVをインポート
let kv: any = null;

export async function GET(req: Request) {
  // Vercel KVの初期化
  if (!kv && process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      const { kv: vercelKv } = await import('@vercel/kv');
      kv = vercelKv;
    } catch (error) {
      console.log('Vercel KV not available');
    }
  }

  const { searchParams } = new URL(req.url);
  const sign = (searchParams.get('sign') ?? 'aries') as string;

  // ① キャッシュがあれば返却（KVが利用可能な場合のみ）
  if (kv) {
    try {
      const cacheKey = `horoscope:${sign}:${new Date().toISOString().slice(0,10)}`;
      const cached = await kv.get(cacheKey);
      if (cached) return NextResponse.json(cached);
    } catch (error) {
      console.log('KV cache error:', error);
    }
  }

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

  // ③ 24h キャッシュ（KVが利用可能な場合のみ）
  if (kv) {
    try {
      const cacheKey = `horoscope:${sign}:${new Date().toISOString().slice(0,10)}`;
      await kv.set(cacheKey, { sign, text }, { ex: 60*60*25 });
    } catch (error) {
      console.log('KV set error:', error);
    }
  }

  return NextResponse.json({ sign, text });
} 