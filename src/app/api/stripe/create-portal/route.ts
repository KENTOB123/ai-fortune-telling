import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

// 開発環境用のダミー値（本番環境では使用されない）
const fallbackSecretKey = 'sk_test_dummy';

// 開発環境ではダミーStripeクライアントを作成
const stripe = process.env.NODE_ENV === 'development' && !stripeSecretKey
  ? null
  : new Stripe(stripeSecretKey || fallbackSecretKey, {
      apiVersion: '2025-06-30.basil',
    });

export async function POST(request: NextRequest) {
  try {
    // 開発環境ではダミー応答を返す
    if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return NextResponse.json({
        url: 'https://example.com/portal'
      });
    }

    const { returnUrl } = await request.json();

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

    // ユーザーのStripe顧客IDを取得
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single();

    if (!profile?.stripe_customer_id) {
      return NextResponse.json(
        { error: 'Stripe顧客が見つかりません' },
        { status: 404 }
      );
    }

    // カスタマーポータルセッションを作成
    if (!stripe) {
      throw new Error('Stripe client is not available');
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: returnUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/mypage`,
    });

    return NextResponse.json({
      url: session.url
    });

  } catch (error: any) {
    console.error('Create portal error:', error);
    
    return NextResponse.json(
      { error: error.message || 'ポータルセッションの作成に失敗しました' },
      { status: 500 }
    );
  }
} 