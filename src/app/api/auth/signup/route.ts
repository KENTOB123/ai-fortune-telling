import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // 開発環境ではダミー応答を返す
    if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return NextResponse.json({
        message: 'アカウントが作成されました（開発モード）',
        user: { id: 'dev-user', email: 'dev@example.com' }
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
    const data = await AuthService.signUp(email, password);

    return NextResponse.json({
      message: 'アカウントが作成されました。確認メールをチェックしてください。',
      user: (data as any).user || (data as any).data?.user
    });

  } catch (error: any) {
    console.error('Signup error:', error);
    
    return NextResponse.json(
      { error: error.message || 'サインアップに失敗しました' },
      { status: 500 }
    );
  }
} 