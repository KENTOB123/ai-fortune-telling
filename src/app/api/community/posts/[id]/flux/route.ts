import { NextRequest, NextResponse } from 'next/server';

// 動的ルートとして設定
export const dynamic = 'force-dynamic';

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

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!supabase) {
    return NextResponse.json({ 
      success: true, 
      message: 'Flux updated successfully (demo mode)' 
    });
  }

  try {
    const postId = params.id;

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

    // 投稿のfluxを1増やす
    const { data, error } = await supabase
      .from('posts')
      .update({ flux: supabase.sql`flux + 1` })
      .eq('id', postId)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: 'Flux updated successfully',
      post: data
    });
  } catch (error) {
    console.error('Error updating flux:', error);
    return NextResponse.json(
      { error: 'Failed to update flux' },
      { status: 500 }
    );
  }
} 