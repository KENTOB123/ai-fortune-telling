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

export async function GET() {
  if (!supabase) {
    return NextResponse.json({
      posts: [
        {
          id: '1',
          text: '今日のタロット占いで「運命の輪」が出て、新しい変化の時期が来ていることを知りました。とても励みになりました！',
          flux: 5,
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          user_id: 'user1'
        },
        {
          id: '2',
          text: 'クリスタルボール占いで恋愛運を占ってもらいました。結果は期待以上で、とても嬉しいです✨',
          flux: 3,
          created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          user_id: 'user2'
        }
      ]
    });
  }

  try {
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;

    return NextResponse.json({ posts: posts || [] });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ posts: [] }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ 
      success: true, 
      message: 'Post created successfully (demo mode)' 
    });
  }

  try {
    const { text } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

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

    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          user_id: user.id,
          text: text.trim(),
          flux: 0
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: 'Post created successfully',
      post: data
    });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
} 