'use client';

import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, User as UserProfile } from '@/lib/supabase';
import { AuthService } from '@/lib/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 初期認証状態を取得
    const getInitialUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        
        if (user) {
          const userProfile = await AuthService.getUserProfile(user.id);
          setProfile(userProfile);
        }
      } catch (error) {
        console.error('Auth error:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialUser();

    // 認証状態の変更を監視
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const userProfile = await AuthService.getUserProfile(session.user.id);
          setProfile(userProfile);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      const data = await AuthService.signUp(email, password);
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const data = await AuthService.signIn(email, password);
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const signOut = async () => {
    try {
      await AuthService.signOut();
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const checkUsageLimit = async () => {
    if (!user) return false;
    return await AuthService.checkUsageLimit(user.id);
  };

  return {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    checkUsageLimit,
    isAuthenticated: !!user,
  };
} 