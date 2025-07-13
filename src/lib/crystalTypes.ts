export interface CrystalType {
  id: string;
  label: string;
  description: string;
  color: string;
  icon: string;
}

export const CRYSTAL_TYPES: CrystalType[] = [
  {
    id: 'balance',
    label: 'バランス',
    description: '心身の調和とバランスを保つ時期です。内なる声に耳を傾け、自分らしさを見つけましょう。',
    color: 'from-emerald-400 to-teal-500',
    icon: '⚖️'
  },
  {
    id: 'growth',
    label: '成長',
    description: '自分を高める時期です。新しいスキルや知識を身につけ、可能性を広げましょう。',
    color: 'from-blue-400 to-indigo-500',
    icon: '🌱'
  },
  {
    id: 'love',
    label: '愛情',
    description: '恋愛・人間関係に焦点を当てる時期です。大切な人との絆を深めましょう。',
    color: 'from-pink-400 to-rose-500',
    icon: '💕'
  },
  {
    id: 'challenge',
    label: '挑戦',
    description: '新しい課題と向き合う時期です。勇気を持って一歩踏み出しましょう。',
    color: 'from-orange-400 to-red-500',
    icon: '⚡'
  },
  {
    id: 'rest',
    label: '休息',
    description: '立ち止まり内省する時期です。心と体を休め、次のステップを考えましょう。',
    color: 'from-purple-400 to-violet-500',
    icon: '🌙'
  },
  {
    id: 'wisdom',
    label: '知恵',
    description: '深い洞察と知恵を得る時期です。経験から学び、より良い判断をしましょう。',
    color: 'from-amber-400 to-yellow-500',
    icon: '🧠'
  },
  {
    id: 'creativity',
    label: '創造性',
    description: '創造的なエネルギーが高まる時期です。新しいアイデアを形にしましょう。',
    color: 'from-cyan-400 to-blue-500',
    icon: '🎨'
  },
  {
    id: 'abundance',
    label: '豊かさ',
    description: '物質的・精神的な豊かさが訪れる時期です。感謝の気持ちを大切にしましょう。',
    color: 'from-green-400 to-emerald-500',
    icon: '💰'
  }
];

export const getCrystalTypeById = (id: string): CrystalType | undefined => {
  return CRYSTAL_TYPES.find(type => type.id === id);
}; 