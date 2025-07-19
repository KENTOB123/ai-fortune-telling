import OpenAI from 'openai';

// 開発環境ではダミーOpenAIクライアントを作成
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export const systemPrompts: Record<string, string> = {
  akari: `あなたは灯里（あかり）、優しくて直感的な占い師です。タロットカードを通じて、ユーザーの心に寄り添い、温かく励ましの言葉をかけます。占い結果は希望に満ち、前向きなアドバイスを心がけます。`,
  
  seren: `あなたは星乃（せれん）、神秘的で深い洞察力を持つ占い師です。タロットカードの奥深い意味を読み解き、ユーザーの人生の流れを宇宙的な視点から分析します。占い結果は哲学的で、人生の大きな流れを理解できるよう導きます。`,
  
  tsumugi: `あなたは紬（つむぎ）、伝統的で確かな技術を持つ占い師です。古典的なタロット解釈を基に、実践的で具体的なアドバイスを提供します。占い結果は現実的で、すぐに行動に移せるような指針を示します。`,
  
  yumie: `あなたは夢絵（ゆめえ）、芸術的で創造的な占い師です。タロットカードを芸術作品として捉え、美しい比喩や詩的な表現で占い結果を伝えます。占い結果は想像力豊かで、心に響くメッセージを届けます。`,
  
  gen: `あなたは玄（げん）、経験豊富で知恵深い占い師です。長年の経験から得た人生の知恵をタロットカードと組み合わせ、深い洞察を提供します。占い結果は成熟した視点から、人生の本質を見据えたアドバイスをします。`
};

export async function chatCompletion(teller: string, userMsg: string) {
  const systemPrompt = systemPrompts[teller];
  
  if (!systemPrompt) {
    throw new Error(`Unknown teller: ${teller}`);
  }

  // 開発環境ではダミー応答を返す
  if (!openai) {
    const dummyResponses = [
      `${teller}による占い結果です。あなたの運命は明るく、新しい可能性が開かれています。`,
      `${teller}が読み解いた結果、あなたは現在重要な転換期に立っています。`,
      `${teller}の直感によると、あなたの未来は希望に満ちています。`
    ];
    return dummyResponses[Math.floor(Math.random() * dummyResponses.length)];
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMsg }
      ],
      max_tokens: 500,
      temperature: 0.8
    });

    return completion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('占いの生成に失敗しました。しばらく時間をおいて再度お試しください。');
  }
}

// 占い結果の生成（カード情報を含む）
export async function generateFortuneReading(
  teller: string, 
  cards: string[], 
  preset: string,
  question?: string
) {
  const cardNames = cards.map(card => {
    // カード名を日本語に変換
    const cardMap: Record<string, string> = {
      'fool': '愚者', 'magician': '魔術師', 'high_priestess': '女教皇',
      'empress': '女帝', 'emperor': '皇帝', 'hierophant': '教皇',
      'lovers': '恋人', 'chariot': '戦車', 'strength': '力',
      'hermit': '隠者', 'wheel': '運命の輪', 'justice': '正義',
      'hanged': '吊るされた男', 'death': '死神', 'temperance': '節制',
      'devil': '悪魔', 'tower': '塔', 'star': '星',
      'moon': '月', 'sun': '太陽', 'judgement': '審判',
      'world': '世界'
    };
    return cardMap[card] || card;
  }).join('、');

  const presetNames: Record<string, string> = {
    'single': '1枚スプレッド',
    '3cards_tarot': '3枚スプレッド',
    'cross': 'クロススプレッド',
    'celtic': 'ケルト十字スプレッド'
  };

  const presetName = presetNames[preset] || preset;

  let userMessage = `選ばれたカード: ${cardNames}\nスプレッド: ${presetName}\n\n`;
  
  if (question) {
    userMessage += `質問: ${question}\n\n`;
  }
  
  userMessage += `これらのカードから、ユーザーの運命を読み解いてください。`;

  return await chatCompletion(teller, userMessage);
} 