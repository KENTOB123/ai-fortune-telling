export interface Spread {
  id: string;
  name: string;
  description: string;
  cardCount: number;
  layout: 'single' | 'three' | 'cross' | 'celtic';
  positions: SpreadPosition[];
  imageUrl: string;
}

export interface SpreadPosition {
  id: string;
  name: string;
  description: string;
  meaning: string;
}

export const spreads: Spread[] = [
  {
    id: 'single',
    name: 'シングルカード',
    description: '1枚のカードで現在の状況やアドバイスを読み取ります',
    cardCount: 1,
    layout: 'single',
    imageUrl: '/spreads/single.png',
    positions: [
      {
        id: 'present',
        name: '現在の状況',
        description: 'あなたの現在の状況や心境を表します',
        meaning: '今のあなたの状態や心境を映し出します'
      }
    ]
  },
  {
    id: 'three-card',
    name: 'スリーカード',
    description: '過去・現在・未来の流れを読み取ります',
    cardCount: 3,
    layout: 'three',
    imageUrl: '/spreads/three.png',
    positions: [
      {
        id: 'past',
        name: '過去',
        description: '過去の影響や経験を表します',
        meaning: 'あなたの過去の経験や影響を表しています'
      },
      {
        id: 'present',
        name: '現在',
        description: '現在の状況や心境を表します',
        meaning: '今のあなたの状況や心境を映し出しています'
      },
      {
        id: 'future',
        name: '未来',
        description: '近い未来の可能性を表します',
        meaning: 'これから起こりうる出来事や可能性を示しています'
      }
    ]
  },
  {
    id: 'cross',
    name: 'クロススプレッド',
    description: '5枚のカードで詳細な状況分析を行います',
    cardCount: 5,
    layout: 'cross',
    imageUrl: '/spreads/cross.png',
    positions: [
      {
        id: 'center',
        name: '中心（現在）',
        description: '現在の状況や心境を表します',
        meaning: 'あなたの現在の状況や心境を表しています'
      },
      {
        id: 'left',
        name: '過去の影響',
        description: '過去の経験が現在に与える影響を表します',
        meaning: '過去の経験が現在にどのような影響を与えているかを示しています'
      },
      {
        id: 'right',
        name: '未来の可能性',
        description: '近い未来の可能性を表します',
        meaning: 'これから起こりうる出来事や可能性を示しています'
      },
      {
        id: 'top',
        name: '理想・目標',
        description: 'あなたの理想や目標を表します',
        meaning: 'あなたが目指している理想や目標を表しています'
      },
      {
        id: 'bottom',
        name: '基盤・根底',
        description: 'あなたの基盤や根底にあるものを表します',
        meaning: 'あなたの行動や考えの基盤となっているものを示しています'
      }
    ]
  },
  {
    id: 'celtic-cross',
    name: 'ケルト十字',
    description: '10枚のカードで包括的な運命を読み取ります',
    cardCount: 10,
    layout: 'celtic',
    imageUrl: '/spreads/celtic.png',
    positions: [
      {
        id: 'center',
        name: '現在の状況',
        description: '現在の状況や心境を表します',
        meaning: 'あなたの現在の状況や心境を表しています'
      },
      {
        id: 'crossing',
        name: '障害・課題',
        description: '現在直面している障害や課題を表します',
        meaning: 'あなたが現在直面している障害や課題を示しています'
      },
      {
        id: 'foundation',
        name: '基盤',
        description: '状況の基盤となっているものを表します',
        meaning: '現在の状況の基盤となっている要素を表しています'
      },
      {
        id: 'past',
        name: '過去',
        description: '過去の影響を表します',
        meaning: '過去の経験が現在に与える影響を表しています'
      },
      {
        id: 'crown',
        name: '理想',
        description: '理想や目標を表します',
        meaning: 'あなたが目指している理想や目標を表しています'
      },
      {
        id: 'future',
        name: '未来',
        description: '近い未来の可能性を表します',
        meaning: 'これから起こりうる出来事や可能性を示しています'
      },
      {
        id: 'self',
        name: '自己認識',
        description: 'あなたの自己認識を表します',
        meaning: 'あなたが自分自身をどのように認識しているかを表しています'
      },
      {
        id: 'environment',
        name: '環境',
        description: '周囲の環境や影響を表します',
        meaning: 'あなたを取り巻く環境や周囲からの影響を表しています'
      },
      {
        id: 'hopes-fears',
        name: '希望と恐れ',
        description: 'あなたの希望と恐れを表します',
        meaning: 'あなたの心の中にある希望と恐れを表しています'
      },
      {
        id: 'outcome',
        name: '結果',
        description: '最終的な結果や結論を表します',
        meaning: 'この状況の最終的な結果や結論を示しています'
      }
    ]
  }
];

export const getSpreadById = (id: string): Spread | undefined => {
  return spreads.find(spread => spread.id === id);
}; 