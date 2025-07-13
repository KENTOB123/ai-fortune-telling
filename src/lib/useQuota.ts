import { useState, useEffect } from 'react';

const QUOTA_KEY = 'dailyCount';
const RESET_HOUR = 9; // UTC+9 の09:00

interface QuotaInfo {
  count: number;
  lastReset: string;
  canUse: boolean;
}

export const useQuota = () => {
  const [quotaInfo, setQuotaInfo] = useState<QuotaInfo>({
    count: 0,
    lastReset: '',
    canUse: true
  });

  // 日付が変わったかチェック
  const shouldReset = (lastReset: string): boolean => {
    const lastResetDate = new Date(lastReset);
    const now = new Date();
    
    // 日本時間で09:00にリセット
    const jstNow = new Date(now.getTime() + (9 * 60 * 60 * 1000));
    const jstLastReset = new Date(lastResetDate.getTime() + (9 * 60 * 60 * 1000));
    
    return jstNow.getDate() !== jstLastReset.getDate() || 
           jstNow.getMonth() !== jstLastReset.getMonth() || 
           jstNow.getFullYear() !== jstLastReset.getFullYear();
  };

  // クォータをリセット
  const resetQuota = () => {
    const now = new Date().toISOString();
    const newQuotaInfo = {
      count: 0,
      lastReset: now,
      canUse: true
    };
    
    localStorage.setItem(QUOTA_KEY, JSON.stringify(newQuotaInfo));
    setQuotaInfo(newQuotaInfo);
  };

  // クォータを使用
  const useQuota = (): boolean => {
    if (!quotaInfo.canUse) return false;
    
    const newCount = quotaInfo.count + 1;
    const newQuotaInfo = {
      ...quotaInfo,
      count: newCount,
      canUse: newCount < 3 // 1日3回まで無料
    };
    
    localStorage.setItem(QUOTA_KEY, JSON.stringify(newQuotaInfo));
    setQuotaInfo(newQuotaInfo);
    
    return true;
  };

  // 初期化
  useEffect(() => {
    const stored = localStorage.getItem(QUOTA_KEY);
    
    if (stored) {
      const parsed = JSON.parse(stored);
      
      if (shouldReset(parsed.lastReset)) {
        resetQuota();
      } else {
        setQuotaInfo({
          ...parsed,
          canUse: parsed.count < 3
        });
      }
    } else {
      resetQuota();
    }
  }, []);

  return {
    quotaInfo,
    useQuota,
    resetQuota
  };
}; 