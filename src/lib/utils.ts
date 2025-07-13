import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateParticles(count: number = 20) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    delay: Math.random() * 6,
  }))
}

export function getZodiacSign(month: number, day: number): string {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "牡羊座"
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "牡牛座"
  if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) return "双子座"
  if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) return "蟹座"
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "獅子座"
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "乙女座"
  if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) return "天秤座"
  if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) return "蠍座"
  if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) return "射手座"
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "山羊座"
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "水瓶座"
  return "魚座"
}

export function getBirthstone(month: number): string {
  const birthstones = [
    "ガーネット", "アメジスト", "アクアマリン", "ダイヤモンド",
    "エメラルド", "パール", "ルビー", "ペリドット",
    "サファイア", "オパール", "トパーズ", "ターコイズ"
  ]
  return birthstones[month - 1] || "ガーネット"
}

export function getLuckyColor(zodiacSign: string): string {
  const luckyColors: Record<string, string> = {
    "牡羊座": "赤",
    "牡牛座": "緑",
    "双子座": "黄色",
    "蟹座": "銀",
    "獅子座": "金",
    "乙女座": "ベージュ",
    "天秤座": "ピンク",
    "蠍座": "紫",
    "射手座": "青",
    "山羊座": "茶",
    "水瓶座": "水色",
    "魚座": "海色"
  }
  return luckyColors[zodiacSign] || "紫"
}

export function getLuckyItem(zodiacSign: string): string {
  const luckyItems: Record<string, string> = {
    "牡羊座": "赤い財布",
    "牡牛座": "緑の植物",
    "双子座": "黄色いハンカチ",
    "蟹座": "銀のアクセサリー",
    "獅子座": "金のリング",
    "乙女座": "ベージュのバッグ",
    "天秤座": "ピンクの花",
    "蠍座": "紫のクリスタル",
    "射手座": "青い石",
    "山羊座": "茶色の革製品",
    "水瓶座": "水色の小物",
    "魚座": "海のモチーフ"
  }
  return luckyItems[zodiacSign] || "クリスタル"
}

export function getDailyZodiacRanking(): Array<{ sign: string; rank: number; fortune: string }> {
  const signs = ["牡羊座", "牡牛座", "双子座", "蟹座", "獅子座", "乙女座", "天秤座", "蠍座", "射手座", "山羊座", "水瓶座", "魚座"]
  const fortunes = [
    "今日は新しい出会いがありそうです。積極的に行動しましょう。",
    "仕事運が上昇中です。重要な決断をするのに良い日です。",
    "恋愛運が高まっています。素敵な出会いを期待できます。",
    "健康運が良好です。運動や食事に気を配りましょう。",
    "金運が上昇しています。投資や貯蓄を検討するのに良い日です。",
    "家族運が高まっています。家族との時間を大切にしましょう。",
    "学習運が上昇中です。新しいスキルを身につけるのに良い日です。",
    "旅行運が高まっています。遠出をするのに適した日です。",
    "芸術運が上昇しています。創造的な活動を楽しみましょう。",
    "人間関係運が良好です。友人との交流を深めましょう。",
    "精神運が高まっています。瞑想やリラックスタイムを設けましょう。",
    "直感運が上昇中です。第六感を信じて行動しましょう。"
  ]
  
  // ランダムにランキングを生成
  const shuffled = [...signs].sort(() => Math.random() - 0.5)
  return shuffled.map((sign, index) => ({
    sign,
    rank: index + 1,
    fortune: fortunes[Math.floor(Math.random() * fortunes.length)]
  }))
}

export function getZodiacDailyFortune(zodiacSign: string): string {
  const dailyFortunes: Record<string, string> = {
    "牡羊座": "今日はリーダーシップを発揮できる日です。新しいプロジェクトを始めるのに適しています。周りの人を引っ張っていく力が高まっているので、積極的に行動しましょう。",
    "牡牛座": "安定と実用性を重んじる今日は、着実に成果を積み上げるのに適した日です。急ぐ必要はありません。一歩ずつ確実に進んでいきましょう。",
    "双子座": "好奇心旺盛でコミュニケーション能力が高まっている今日は、多くの人との出会いを通じて成長できる日です。新しい情報や知識を積極的に吸収しましょう。",
    "蟹座": "感受性豊かで家族を大切にする今日は、愛と絆の深さを理解できる日です。家族や大切な人との時間を優先し、心の安らぎを得ましょう。",
    "獅子座": "自信に満ちた今日は、創造性と表現力で周りを魅了できる日です。自分の才能を存分に発揮し、注目を集めることができます。",
    "乙女座": "細やかな観察力と完璧主義の今日は、質の高い仕事を成し遂げるのに適した日です。細部までこだわり、完璧な結果を目指しましょう。",
    "天秤座": "バランス感覚に優れた今日は、調和の取れた人間関係を築くのに適した日です。対立を避け、みんなが幸せになる方法を考えましょう。",
    "蠍座": "深い洞察力と情熱を持つ今日は、真実を見抜く力が高まっている日です。隠された真実を発見し、深い理解を得ることができます。",
    "射手座": "自由と冒険を愛する今日は、広い視野で人生を楽しむのに適した日です。新しい場所や新しい体験を求めて行動しましょう。",
    "山羊座": "責任感と忍耐力に優れた今日は、長期的な目標を達成するのに適した日です。計画を立て、着実に実行していきましょう。",
    "水瓶座": "独創性と人道主義の精神を持つ今日は、社会に貢献する大きな可能性がある日です。革新的なアイデアで人々を助けることができます。",
    "魚座": "直感力と芸術性に富んだ今日は、美しいものに敏感で創造的な才能を発揮できる日です。芸術活動や瞑想を楽しみましょう。"
  }
  return dailyFortunes[zodiacSign] || "今日は特別な日になりそうです。直感を信じて行動しましょう。"
}

export function getTarotCard(): { name: string; meaning: string; reversed: boolean; image: string; description: string } {
  const tarotCards = [
    { 
      name: "愚者", 
      meaning: "新しい始まり、純粋さ、冒険心",
      image: "🎭",
      description: "無邪気で自由な精神を表すカード。新しい旅立ちや未知への挑戦を示しています。"
    },
    { 
      name: "魔術師", 
      meaning: "創造力、意志力、スキル",
      image: "🔮",
      description: "無限の可能性と創造力を表すカード。自分の才能を活用する時を示しています。"
    },
    { 
      name: "女教皇", 
      meaning: "直感、神秘、内なる知恵",
      image: "🌙",
      description: "深い知恵と直感力を表すカード。内なる声に耳を傾ける時を示しています。"
    },
    { 
      name: "女帝", 
      meaning: "豊かさ、母性、自然",
      image: "👑",
      description: "豊穣と母性愛を表すカード。自然の恵みと愛情に満ちた時を示しています。"
    },
    { 
      name: "皇帝", 
      meaning: "権威、リーダーシップ、安定",
      image: "⚔️",
      description: "強力なリーダーシップと安定を表すカード。統治と保護の時を示しています。"
    },
    { 
      name: "教皇", 
      meaning: "伝統、教育、精神的な導き",
      image: "📖",
      description: "伝統的な価値観と精神的な導きを表すカード。学習と成長の時を示しています。"
    },
    { 
      name: "恋人", 
      meaning: "愛、調和、選択",
      image: "💕",
      description: "愛と調和を表すカード。重要な選択と関係性の深化を示しています。"
    },
    { 
      name: "戦車", 
      meaning: "勝利、意志力、進歩",
      image: "🏛️",
      description: "勝利と進歩を表すカード。目標に向かって突き進む時を示しています。"
    },
    { 
      name: "力", 
      meaning: "内なる強さ、勇気、忍耐",
      image: "🦁",
      description: "内なる強さと勇気を表すカード。困難に立ち向かう力を示しています。"
    },
    { 
      name: "隠者", 
      meaning: "内省、孤独、知恵",
      image: "🕯️",
      description: "内省と知恵を表すカード。一人の時間で深い洞察を得る時を示しています。"
    },
    { 
      name: "運命の輪", 
      meaning: "変化、運命、転機",
      image: "🎡",
      description: "運命の変化を表すカード。人生の転機と新しいサイクルの始まりを示しています。"
    },
    { 
      name: "正義", 
      meaning: "バランス、真実、公平",
      image: "⚖️",
      description: "正義とバランスを表すカード。公平な判断と真実の追求を示しています。"
    },
    { 
      name: "吊るされた男", 
      meaning: "犠牲、新しい視点、一時停止",
      image: "🙃",
      description: "新しい視点と犠牲を表すカード。物事を逆から見る時を示しています。"
    },
    { 
      name: "死神", 
      meaning: "終わりと始まり、変容、解放",
      image: "💀",
      description: "終わりと新しい始まりを表すカード。変容と解放の時を示しています。"
    },
    { 
      name: "節制", 
      meaning: "バランス、調和、節制",
      image: "🕊️",
      description: "バランスと調和を表すカード。適度と節制の重要性を示しています。"
    },
    { 
      name: "悪魔", 
      meaning: "欲望、束縛、物質主義",
      image: "😈",
      description: "欲望と束縛を表すカード。物質的な誘惑と解放の必要性を示しています。"
    },
    { 
      name: "塔", 
      meaning: "突然の変化、崩壊、啓示",
      image: "⚡",
      description: "突然の変化と崩壊を表すカード。古い価値観の崩壊と新しい啓示を示しています。"
    },
    { 
      name: "星", 
      meaning: "希望、信仰、癒し",
      image: "⭐",
      description: "希望と癒しを表すカード。未来への希望と精神的な回復を示しています。"
    },
    { 
      name: "月", 
      meaning: "直感、幻想、不安",
      image: "🌙",
      description: "直感と幻想を表すカード。無意識の世界と直感の重要性を示しています。"
    },
    { 
      name: "太陽", 
      meaning: "成功、喜び、活力",
      image: "☀️",
      description: "成功と喜びを表すカード。明るい未来と活力に満ちた時を示しています。"
    },
    { 
      name: "審判", 
      meaning: "復活、再生、新しい人生",
      image: "🎺",
      description: "復活と再生を表すカード。新しい人生の始まりと覚醒を示しています。"
    },
    { 
      name: "世界", 
      meaning: "完成、達成、調和",
      image: "🌍",
      description: "完成と達成を表すカード。目標の達成と完全な調和を示しています。"
    }
  ]
  
  const card = tarotCards[Math.floor(Math.random() * tarotCards.length)]
  const reversed = Math.random() > 0.5
  
  return {
    ...card,
    reversed
  }
}

export function generateTarotReading(cards: Array<{ name: string; meaning: string; reversed: boolean; description: string }>): {
  current: string;
  personality: string;
  compatiblePersonality: string;
  incompatiblePersonality: string;
  howToDealWithIncompatible: string;
  happinessMethod: string;
} {
  const cardNames = cards.map(card => card.name).join('、')
  const reversedCount = cards.filter(card => card.reversed).length
  
  const readings = {
    current: [
      `${cardNames}の組み合わせから、あなたは現在大きな変化の時期にいることがわかります。特に人間関係において新しい出会いや既存の関係の深化が期待できる時期です。`,
      `${cardNames}が示すように、あなたの現在は安定と成長のバランスが取れた状態です。周りの人との協力関係が重要になる時期です。`,
      `${cardNames}のエネルギーから、あなたは現在創造性と直感が高まっている時期です。新しいアイデアやプロジェクトを始めるのに適しています。`
    ],
    personality: [
      `${reversedCount}枚の逆位置カードが示すように、あなたは深い洞察力と感受性を持つ人です。直感を信じ、内なる声に耳を傾ける能力に長けています。`,
      `あなたは${cards.length}枚のカードが示すように、バランス感覚に優れ、周りの人との調和を大切にする性格です。`,
      `${cardNames}の組み合わせから、あなたはリーダーシップと創造性を兼ね備えた魅力的な性格の持ち主です。`
    ],
    compatiblePersonality: [
      "あなたと相性の良い人は、同じく直感力に優れ、深い理解力を持つ人です。お互いの内面を理解し合える関係を築けます。",
      "安定感があり、実用性を重んじる人との相性が抜群です。お互いを補完し合える関係を築けます。",
      "創造性豊かで、新しいことに挑戦する勇気を持つ人との相性が良いです。一緒に成長できる関係です。"
    ],
    incompatiblePersonality: [
      "表面的で軽薄な人との相性は良くありません。深い絆を求めるあなたにとって、浅い関係はストレスになります。",
      "支配的で自己中心的な人との相性は悪いです。あなたの自由な精神と対立することが多いでしょう。",
      "過度に現実的で、夢や理想を否定する人との相性は良くありません。あなたの創造性を理解できない人です。"
    ],
    howToDealWithIncompatible: [
      "相性の悪い人とは適度な距離を保ち、必要最小限の関わりに留めましょう。あなたのエネルギーを消耗させないことが重要です。",
      "相手の価値観を理解し、それに合わせて接するのではなく、自分の価値観を大切にしながら、互いを尊重する関係を築きましょう。",
      "コミュニケーションを工夫し、相手の立場を理解しながらも、自分の意見を明確に伝えることが大切です。"
    ],
    happinessMethod: [
      "あなたの幸せは、深い人間関係と創造的な活動にあります。大切な人との時間を増やし、自分の才能を活かせる活動を見つけましょう。",
      "内なる声に耳を傾け、直感を信じて行動することが幸せへの近道です。自分らしさを大切にしながら、周りの人との調和を保ちましょう。",
      "新しいことに挑戦し、成長を続けることで幸せを感じられます。目標を持ち、一歩ずつ着実に進んでいくことが重要です。"
    ]
  }

  return {
    current: readings.current[Math.floor(Math.random() * readings.current.length)],
    personality: readings.personality[Math.floor(Math.random() * readings.personality.length)],
    compatiblePersonality: readings.compatiblePersonality[Math.floor(Math.random() * readings.compatiblePersonality.length)],
    incompatiblePersonality: readings.incompatiblePersonality[Math.floor(Math.random() * readings.incompatiblePersonality.length)],
    howToDealWithIncompatible: readings.howToDealWithIncompatible[Math.floor(Math.random() * readings.howToDealWithIncompatible.length)],
    happinessMethod: readings.happinessMethod[Math.floor(Math.random() * readings.happinessMethod.length)]
  }
} 