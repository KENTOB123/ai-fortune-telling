import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // 開発環境ではダミー応答を返す
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://your-project.supabase.co') {
      return NextResponse.json({
        message: 'ログインに成功しました（開発モード）',
        user: { id: 'dev-user', email: 'dev@example.com' },
        session: { access_token: 'dev-token' }
      });
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'メールアドレスとパスワードが必要です' },
        { status: 400 }
      );
    }

    // 本番環境でのみAuthServiceをインポート
    const { AuthService } = await import('@/lib/auth');
    const data = await AuthService.signIn(email, password);

    return NextResponse.json({
      message: 'ログインに成功しました',
      user: (data as any).user || (data as any).data?.user,
      session: (data as any).session || (data as any).data?.session
    });

  } catch (error: any) {
    console.error('Signin error:', error);
    
    return NextResponse.json(
      { error: error.message || 'ログインに失敗しました' },
      { status: 500 }
    );
  }
} 