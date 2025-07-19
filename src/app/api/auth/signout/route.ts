import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // 開発環境ではダミー応答を返す
    if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return NextResponse.json({
        message: 'ログアウトに成功しました（開発モード）'
      });
    }

    // 本番環境でのみAuthServiceをインポート
    const { AuthService } = await import('@/lib/auth');
    await AuthService.signOut();

    return NextResponse.json({
      message: 'ログアウトに成功しました'
    });

  } catch (error: any) {
    console.error('Signout error:', error);
    
    return NextResponse.json(
      { error: error.message || 'ログアウトに失敗しました' },
      { status: 500 }
    );
  }
} 