# AI 占い - 無料で本格的なタロット占いを体験

Next.js 14 + React 18 + TypeScript + Tailwind CSS + Framer Motion で構築された本格的な AI 占いアプリケーション。

## 🔒 セキュリティ重要事項

**⚠️ 本番環境での運用前に必ず以下を確認してください：**

1. **環境変数の設定**

   - すべての環境変数が正しく設定されていることを確認
   - ダミー値やテスト用の値が本番環境に残っていないことを確認

2. **JWT Secret の変更**

   - `supabase-schema.sql`の`'your-jwt-secret'`を実際の秘密鍵に変更
   - 秘密鍵生成: `openssl rand -base64 32`

3. **API Keys の管理**

   - Stripe の本番用 API keys を使用
   - Supabase の本番用プロジェクトを使用
   - OpenAI の本番用 API key を使用

4. **Webhook 設定**

   - Stripe の Webhook エンドポイントを本番 URL に設定
   - Webhook secret を適切に管理

5. **データベースセキュリティ**
   - Row Level Security (RLS) が有効になっていることを確認
   - 適切なポリシーが設定されていることを確認

## 機能

### フロントエンド

- 🎴 **タロット占い**: 78 枚のカードを使用した本格的な占い
- 🔮 **水晶玉占い**: 内面を深く読み解く占い
- ✨ **Yes/No オラクル**: 即断即決のシンプル占い
- 🌟 **今日の星座占い**: 日替わりの運勢
- 📱 **レスポンシブデザイン**: モバイルファースト
- 🎨 **美しい UI/UX**: アニメーションとモダンデザイン

### バックエンド & データベース

- 🔐 **認証システム**: Supabase Auth
- 💾 **データベース**: Supabase PostgreSQL
- 💳 **支払いシステム**: Stripe
- 📊 **使用回数管理**: プラン別制限
- 📝 **履歴保存**: 占い結果の永続化

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local` ファイルを作成し、以下の環境変数を設定：

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Stripe Price IDs
NEXT_PUBLIC_STRIPE_PLUS_PRICE_ID=price_your_plus_plan_id
NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID=price_your_premium_plan_id
STRIPE_PLUS_PRICE_ID=price_your_plus_plan_id
STRIPE_PREMIUM_PRICE_ID=price_your_premium_plan_id

# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# OpenAI
OPENAI_API_KEY=your_openai_api_key
```

### 3. Supabase セットアップ

#### 3.1 Supabase プロジェクト作成

1. [Supabase](https://supabase.com) でアカウント作成
2. 新しいプロジェクトを作成
3. プロジェクトの URL と anon key を取得

#### 3.2 データベーススキーマ作成

Supabase の SQL Editor で `supabase-schema.sql` の内容を実行：

```sql
-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create users table
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  subscription_status TEXT DEFAULT 'free' CHECK (subscription_status IN ('free', 'plus', 'premium')),
  subscription_end_date TIMESTAMP WITH TIME ZONE,
  daily_usage_count INTEGER DEFAULT 0,
  last_usage_date DATE,
  stripe_customer_id TEXT
);

-- Create fortune_history table
CREATE TABLE fortune_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  fortuner_id TEXT NOT NULL,
  spread_type TEXT NOT NULL,
  selected_cards TEXT[] NOT NULL,
  result_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create favorite_fortuners table
CREATE TABLE favorite_fortuners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  fortuner_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, fortuner_id)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE fortune_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorite_fortuners ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for fortune_history
CREATE POLICY "Users can view own fortune history" ON fortune_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own fortune history" ON fortune_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for favorite_fortuners
CREATE POLICY "Users can view own favorite fortuners" ON favorite_fortuners
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorite fortuners" ON favorite_fortuners
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorite fortuners" ON favorite_fortuners
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_fortune_history_user_id ON fortune_history(user_id);
CREATE INDEX idx_fortune_history_created_at ON fortune_history(created_at);
CREATE INDEX idx_favorite_fortuners_user_id ON favorite_fortuners(user_id);

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO users (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 4. Stripe セットアップ

#### 4.1 Stripe アカウント作成

1. [Stripe](https://stripe.com) でアカウント作成
2. ダッシュボードから API keys を取得

#### 4.2 商品・価格設定

Stripe ダッシュボードで以下の商品を作成：

**Plus プラン**

- 価格: ¥480/月
- 商品名: Plus Plan
- 価格 ID を取得して環境変数に設定

**Premium プラン**

- 価格: ¥1,280/月
- 商品名: Premium Plan
- 価格 ID を取得して環境変数に設定

#### 4.3 Webhook 設定

1. Stripe ダッシュボードで Webhook エンドポイントを作成
2. エンドポイント URL: `https://your-domain.com/api/stripe/webhook`
3. イベント: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
4. Webhook secret を取得して環境変数に設定

### 5. 開発サーバー起動

```bash
npm run dev
```

## アーキテクチャ

### フロントエンド

- **Next.js 14**: App Router
- **React 18**: Hooks, Suspense
- **TypeScript**: 型安全性
- **Tailwind CSS**: スタイリング
- **Framer Motion**: アニメーション

### バックエンド

- **Supabase**: 認証・データベース
- **Stripe**: 支払い処理
- **OpenAI**: AI 占い生成
- **Vercel KV**: キャッシュ

### データベース設計

- **users**: ユーザー情報・サブスクリプション状態
- **fortune_history**: 占い履歴
- **favorite_fortuners**: お気に入り占い師

## デプロイ

### Vercel

1. GitHub リポジトリを Vercel に接続
2. 環境変数を設定
3. 自動デプロイ

### 環境変数設定

Vercel ダッシュボードで以下の環境変数を設定：

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PLUS_PRICE_ID`
- `NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID`
- `STRIPE_PLUS_PRICE_ID`
- `STRIPE_PREMIUM_PRICE_ID`
- `NEXT_PUBLIC_BASE_URL`
- `OPENAI_API_KEY`

## ライセンス

MIT License
