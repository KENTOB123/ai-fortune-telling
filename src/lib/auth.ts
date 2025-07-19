import { supabase, User } from './supabase';

// ユーザー認証状態の管理
export class AuthService {
  // サインアップ
  static async signUp(email: string, password: string) {
    // 開発環境ではダミー応答を返す
    if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return {
        data: {
          user: { id: 'dev-user', email },
          session: { access_token: 'dev-token' }
        },
        error: null
      };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) throw error;
    
    // ユーザープロフィールを作成
    if (data.user) {
      await this.createUserProfile(data.user.id, email);
    }
    
    return data;
  }

  // サインイン
  static async signIn(email: string, password: string) {
    // 開発環境ではダミー応答を返す
    if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return {
        data: {
          user: { id: 'dev-user', email },
          session: { access_token: 'dev-token' }
        },
        error: null
      };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  }

  // サインアウト
  static async signOut() {
    // 開発環境ではダミー応答を返す
    if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return { error: null };
    }

    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  // 現在のユーザーを取得
  static async getCurrentUser() {
    // 開発環境ではダミー応答を返す
    if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return { id: 'dev-user', email: 'dev@example.com' };
    }

    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  }

  // ユーザープロフィールを作成
  static async createUserProfile(userId: string, email: string) {
    // 開発環境ではスキップ
    if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return;
    }

    const { error } = await supabase
      .from('users')
      .insert([
        {
          id: userId,
          email,
          subscription_status: 'free',
          daily_usage_count: 0,
        }
      ]);
    
    if (error) throw error;
  }

  // ユーザープロフィールを取得
  static async getUserProfile(userId: string): Promise<User | null> {
    // 開発環境ではダミー応答を返す
    if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return {
        id: userId,
        email: 'dev@example.com',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        subscription_status: 'free',
        daily_usage_count: 0
      };
    }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  }

  // 使用回数を更新
  static async updateUsageCount(userId: string) {
    // 開発環境ではスキップ
    if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    
    const { data: profile } = await supabase
      .from('users')
      .select('daily_usage_count, last_usage_date')
      .eq('id', userId)
      .single();
    
    if (profile?.last_usage_date !== today) {
      // 新しい日なのでカウントをリセット
      const { error } = await supabase
        .from('users')
        .update({
          daily_usage_count: 1,
          last_usage_date: today,
        })
        .eq('id', userId);
      
      if (error) throw error;
    } else {
      // 同じ日なのでカウントを増加
      const { error } = await supabase
        .from('users')
        .update({
          daily_usage_count: profile.daily_usage_count + 1,
        })
        .eq('id', userId);
      
      if (error) throw error;
    }
  }

  // 使用可能回数をチェック
  static async checkUsageLimit(userId: string): Promise<boolean> {
    // 開発環境では常にtrueを返す
    if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return true;
    }

    const profile = await this.getUserProfile(userId);
    if (!profile) return false;
    
    const limits = {
      free: 3,
      plus: 10,
      premium: Infinity
    };
    
    const limit = limits[profile.subscription_status];
    return profile.daily_usage_count < limit;
  }
} 