// 月の状態を判定するユーティリティ関数

// 簡易的な新月・満月判定（実際の運用では外部APIを使用することを推奨）
export const isNewMoon = (): boolean => {
  const today = new Date();
  const day = today.getDate();
  
  // 簡易的な新月判定（月の1日目付近）
  return day >= 1 && day <= 3;
};

export const isFullMoon = (): boolean => {
  const today = new Date();
  const day = today.getDate();
  
  // 簡易的な満月判定（月の15日目付近）
  return day >= 14 && day <= 16;
};

export const isMoonDay = (): boolean => {
  return isNewMoon() || isFullMoon();
};

export const getMoonPhase = (): string => {
  if (isNewMoon()) return 'new';
  if (isFullMoon()) return 'full';
  return 'other';
};

export const getMoonPhaseName = (): string => {
  if (isNewMoon()) return '新月';
  if (isFullMoon()) return '満月';
  return '通常';
};

export const getMoonRitualMessage = (): string => {
  if (isNewMoon()) {
    return '新月の夜は新しい始まりの儀式に最適です。願い事を紙に書き、月の光に照らしてから燃やしましょう。';
  }
  if (isFullMoon()) {
    return '満月の夜は願い事が叶いやすい特別な時間です。水晶を月の光に当てて浄化し、願いを込めましょう。';
  }
  return '';
}; 