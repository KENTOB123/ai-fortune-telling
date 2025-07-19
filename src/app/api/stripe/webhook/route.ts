import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// 開発環境用のダミー値（本番環境では使用されない）
const fallbackSecretKey = 'sk_test_dummy';
const fallbackWebhookSecret = 'whsec_dummy';

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
      return NextResponse.json({ received: true });
    }

    const body = await request.text();
    const signature = request.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      if (!stripe) {
        throw new Error('Stripe client is not available');
      }
      event = stripe.webhooks.constructEvent(body, signature, (webhookSecret || fallbackWebhookSecret) as string);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // 本番環境でのみsupabaseをインポート
    const { supabaseAdmin } = await import('@/lib/supabase');

    // イベントタイプに応じて処理
    switch (event.type) {
      case 'invoice.paid':
        await handleInvoicePaid(event.data.object as Stripe.Invoice);
        break;
      
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;
      
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });

  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  if (!stripe) return;
  
  if ((invoice as any).subscription) {
    const subscription = await stripe.subscriptions.retrieve((invoice as any).subscription as string);
    const customerId = subscription.customer as string;
    
    // 顧客IDからユーザーを検索してpremiumフラグを更新
    const { supabaseAdmin } = await import('@/lib/supabase');
    if (supabaseAdmin) {
      await supabaseAdmin
        .from('profiles')
        .update({ is_premium: true })
        .eq('stripe_customer_id', customerId);
    }
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  
  // 顧客IDからユーザーを検索してpremiumフラグをfalseに更新
  const { supabaseAdmin } = await import('@/lib/supabase');
  if (supabaseAdmin) {
    await supabaseAdmin
      .from('profiles')
      .update({ is_premium: false })
      .eq('stripe_customer_id', customerId);
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  if (session.mode === 'subscription' && session.subscription) {
    const userId = session.metadata?.userId;
    const customerId = session.customer as string;
    
    if (userId) {
      // ユーザープロフィールにStripe顧客IDを保存
      const { supabaseAdmin } = await import('@/lib/supabase');
      if (supabaseAdmin) {
        await supabaseAdmin
          .from('profiles')
          .update({ 
            stripe_customer_id: customerId,
            is_premium: true 
          })
          .eq('id', userId);
      }
    }
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  
  // 顧客IDからユーザーを検索
  const { supabaseAdmin } = await import('@/lib/supabase');
  if (supabaseAdmin) {
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('stripe_customer_id', customerId)
      .single();

    if (profile) {
      // サブスクリプションの状態に応じてpremiumフラグを更新
      const isPremium = subscription.status === 'active';
      await supabaseAdmin
        .from('profiles')
        .update({ is_premium: isPremium })
        .eq('id', profile.id);
    }
  }
} 