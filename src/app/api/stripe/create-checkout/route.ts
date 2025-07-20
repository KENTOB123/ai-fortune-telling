import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const basicPriceId = process.env.STRIPE_PRICE_BASIC_ID;

// 開発環境用のダミー値（本番環境では使用されない）
const fallbackSecretKey = 'sk_test_dummy';
const fallbackBasicPriceId = 'price_basic_dummy';

// 開発環境ではダミーStripeクライアントを作成
const stripe = process.env.NODE_ENV === 'development' && !stripeSecretKey
  ? null
  : new Stripe(stripeSecretKey || fallbackSecretKey, {
      apiVersion: '2025-06-30.basil',
    });

export async function POST(request: NextRequest) {
  try {
    // 開発環境ではダミー応答を返す
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://your-project.supabase.co') {
      return NextResponse.json({
        sessionId: 'dev-session-id',
        url: 'https://example.com/checkout'
      });
    }

    const { successUrl, cancelUrl } = await request.json();

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

    // チェックアウトセッションを作成
    if (!stripe) {
      throw new Error('Stripe client is not available');
    }

    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: [
        {
          price: basicPriceId || fallbackBasicPriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/mypage?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/pricing?canceled=true`,
      metadata: {
        userId: user.id,
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url
    });

  } catch (error: any) {
    console.error('Create checkout error:', error);
    
    return NextResponse.json(
      { error: error.message || 'チェックアウトセッションの作成に失敗しました' },
      { status: 500 }
    );
  }
} 