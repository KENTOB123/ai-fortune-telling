import { NextRequest, NextResponse } from 'next/server';
import { generateFortuneReading } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    // 開発環境ではダミー応答を返す
    if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return NextResponse.json({
        message: '占い結果が保存されました（開発モード）',
        reading: {
          id: 'dev-reading-id',
          user_id: 'dev-user',
          teller: 'akari',
          preset: '3cards_tarot',
          cards: ['fool', 'magician', 'priestess'],
          question: null,
          answer: '開発モードでの占い結果です。',
          created_at: new Date().toISOString()
        }
      });
    }

    const { teller, preset, cards, question } = await request.json();

    // 本番環境でのみsupabaseをインポート
    const { supabase } = await import('@/lib/supabase');

    // 認証チェック
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      );
    }

    // OpenAIで占い結果を生成
    const answer = await generateFortuneReading(teller, cards, preset, question);

    // 占い結果をデータベースに保存
    const { data, error } = await supabase
      .from('readings')
      .insert([
        {
          user_id: user.id,
          teller,
          preset,
          cards,
          question,
          answer,
        }
      ])
      .select()
      .single();

    if (error) throw error;

    // カードコレクションに追加（重複は無視）
    for (const cardId of cards) {
      await supabase
        .from('card_collection')
        .upsert(
          { user_id: user.id, card_id: cardId },
          { onConflict: 'user_id,card_id' }
        );
    }

    return NextResponse.json({
      message: '占い結果が保存されました',
      reading: data
    });

  } catch (error: any) {
    console.error('Save reading error:', error);
    
    return NextResponse.json(
      { error: error.message || '占い結果の保存に失敗しました' },
      { status: 500 }
    );
  }
} 