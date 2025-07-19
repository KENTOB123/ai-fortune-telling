import { NextRequest, NextResponse } from 'next/server';

// 条件付きインポートでSupabaseクライアントを取得
let supabase: any = null;
try {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { createClient } = require('@supabase/supabase-js');
    supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
  }
} catch (error) {
  console.log('Supabase client not available');
}

export async function GET(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({
      stardust: 5,
      streak: 3,
      is_premium: false
    });
  }

  try {
    // ユーザー認証を確認
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // JWTトークンからユーザーIDを取得
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // プロフィール情報を取得
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('stardust, streak, is_premium')
      .eq('id', user.id)
      .single();

    if (error) throw error;

    return NextResponse.json({
      stardust: profile.stardust || 0,
      streak: profile.streak || 0,
      is_premium: profile.is_premium || false
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
} 