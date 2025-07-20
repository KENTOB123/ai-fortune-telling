import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // 環境変数がない場合はダミー応答を返す
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://your-project.supabase.co') {
      return NextResponse.json({
        readings: [
          {
            id: 'dev-reading-1',
            user_id: 'dev-user',
            teller: 'akari',
            preset: '3cards_tarot',
            cards: ['fool', 'magician', 'priestess'],
            question: null,
            answer: '開発モードでの占い結果1です。',
            created_at: new Date().toISOString()
          },
          {
            id: 'dev-reading-2',
            user_id: 'dev-user',
            teller: 'seren',
            preset: 'cross',
            cards: ['empress', 'emperor', 'hierophant', 'lovers'],
            question: null,
            answer: '開発モードでの占い結果2です。',
            created_at: new Date(Date.now() - 86400000).toISOString()
          }
        ]
      });
    }

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

    // 占い履歴を取得
    const { data, error } = await supabase
      .from('readings')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({
      readings: data || []
    });

  } catch (error: any) {
    console.error('Get readings error:', error);
    
    return NextResponse.json(
      { error: error.message || '履歴の取得に失敗しました' },
      { status: 500 }
    );
  }
} 