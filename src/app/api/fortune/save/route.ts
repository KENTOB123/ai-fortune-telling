import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // 開発環境ではダミー応答を返す
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://your-project.supabase.co') {
      return NextResponse.json({
        message: '占い結果が保存されました（開発モード）',
        history: {
          id: 'dev-history-id',
          user_id: 'dev-user',
          fortuner_id: 'akari',
          spread_type: '3cards_tarot',
          selected_cards: ['fool', 'magician', 'priestess'],
          result_text: '開発モードでの占い結果です。',
          created_at: new Date().toISOString()
        }
      });
    }

    const { fortunerId, spreadType, selectedCards, resultText } = await request.json();

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

    // 占い履歴を保存
    const { data, error } = await supabase
      .from('fortune_history')
      .insert([
        {
          user_id: user.id,
          fortuner_id: fortunerId,
          spread_type: spreadType,
          selected_cards: selectedCards,
          result_text: resultText,
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      message: '占い結果が保存されました',
      history: data
    });

  } catch (error: any) {
    console.error('Save fortune error:', error);
    
    return NextResponse.json(
      { error: error.message || '占い結果の保存に失敗しました' },
      { status: 500 }
    );
  }
} 