import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// 開発環境では環境変数が設定されていなくてもビルドを許可
if (process.env.NODE_ENV === 'production' && (!supabaseUrl || !supabaseAnonKey)) {
  throw new Error('Supabase environment variables are not configured');
}

// 開発環境用のダミー値（本番環境では使用されない）
const fallbackUrl = 'https://your-project.supabase.co';
const fallbackKey = 'your-anon-key';

export const supabase = createClient(
  supabaseUrl || fallbackUrl,
  supabaseAnonKey || fallbackKey
);

// サービスロールキーを使用したクライアント（管理者権限）
export const supabaseAdmin = supabaseServiceKey 
  ? createClient(supabaseUrl || fallbackUrl, supabaseServiceKey)
  : null;

// 型定義
export interface Profile {
  id: string;
  display_name?: string;
  avatar_url?: string;
  created_at: string;
  is_premium: boolean;
}

export interface Reading {
  id: string;
  user_id: string;
  teller: string;
  preset: string;
  cards: string[];
  question?: string;
  answer: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  subscription_status: 'free' | 'plus' | 'premium';
  subscription_end_date?: string;
  daily_usage_count: number;
  last_usage_date?: string;
}

export interface FortuneHistory {
  id: string;
  user_id: string;
  fortuner_id: string;
  spread_type: string;
  selected_cards: string[];
  result_text: string;
  created_at: string;
}

export interface FavoriteFortuner {
  id: string;
  user_id: string;
  fortuner_id: string;
  created_at: string;
} 