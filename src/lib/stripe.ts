import { loadStripe } from '@stripe/stripe-js';

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const plusPriceId = process.env.NEXT_PUBLIC_STRIPE_PLUS_PRICE_ID;
const premiumPriceId = process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID;

// 開発環境では環境変数が設定されていなくてもビルドを許可
if (process.env.NODE_ENV === 'production' && (!stripePublishableKey || !plusPriceId || !premiumPriceId)) {
  throw new Error('Stripe environment variables are not configured');
}

// 開発環境用のダミー値（本番環境では使用されない）
const fallbackPublishableKey = 'pk_test_dummy';
const fallbackPlusPriceId = 'price_plus_dummy';
const fallbackPremiumPriceId = 'price_premium_dummy';

export const stripePromise = loadStripe(stripePublishableKey || fallbackPublishableKey);

// プラン設定
export const PLANS = {
  plus: {
    name: 'Plus',
    price: 480,
    priceId: plusPriceId || fallbackPlusPriceId,
    features: [
      '1日10回まで占い',
      '全スプレッド利用可能',
      '占い結果の保存（30日）',
      '広告非表示',
      '会員限定スプレッド',
      '占い師のお気に入り'
    ]
  },
  premium: {
    name: 'Premium',
    price: 1280,
    priceId: premiumPriceId || fallbackPremiumPriceId,
    features: [
      '無制限占い',
      '全スプレッド利用可能',
      '占い結果の永久保存',
      '広告完全非表示',
      '会員限定スプレッド',
      '占い師のお気に入り',
      '占い師割引5%',
      '月次パーソナルレポート'
    ]
  }
}; 