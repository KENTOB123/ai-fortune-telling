export interface Fortuner {
  id: string;
  name: string;
  title: string;
  tagline: string;
  catchphrase: string;
  description: string;
  imageUrl: string;
  skills: string[];
  specialties: string[];
  personality: string;
  catch: string;
  persona: string;
  price: number;
  sample: string;
  img: string;
}

export const fortuners: Fortuner[] = [
  {
    id: 'luna',
    name: 'ルナ',
    title: '月の導き手',
    tagline: '月の光に導かれて',
    catchphrase: '月の光に導かれて、あなたの未来を照らします',
    description: '神秘的な月の力を操り、直感力に優れた占い師。感情や人間関係の深層を読み解くのが得意です。',
    imageUrl: '/fortuners/luna.png',
    skills: ['タロット', '恋愛'],
    specialties: ['感情', '人間関係', '直感'],
    personality: '優しく包み込むような話し方で、クライアントの心に寄り添います。',
    catch: '恋はカードに聞いて♪',
    persona: '19歳・大学心理学科。明るい妹系。「だよ♪」語尾。',
    price: 780,
    sample: 'あなたが引いた〈恋人‐正位置〉は、新しい出会いや関係の始まりを示しています。このカードは純粋な愛と調和を象徴しており、あなたの心が開かれ、新しい可能性を受け入れる準備ができていることを意味します。現在の状況では、あなたの直感が正しい方向を指し示しているので、心の声に従って行動することをお勧めします。',
    img: '/fortuners/luna.png'
  },
  {
    id: 'soleil',
    name: 'ソレイユ',
    title: '太陽の預言者',
    tagline: '太陽の輝きと共に',
    catchphrase: '太陽の輝きと共に、あなたの可能性を開花させましょう',
    description: '明るく前向きなエネルギーを司る占い師。運勢の向上や目標達成のアドバイスが得意です。',
    imageUrl: '/fortuners/soleil.png',
    skills: ['水晶玉', '自己成長'],
    specialties: ['運勢向上', '目標達成', '活力'],
    personality: '明るく元気な話し方で、常にポジティブな視点を提供します。',
    catch: '未来は自分で作るものだよ！',
    persona: '25歳・占い師歴5年。明るく前向きな姉御系。「だよ！」語尾。',
    price: 850,
    sample: '水晶玉に映るあなたの未来は、とても明るい光に包まれています。現在の努力が実を結び、大きな成功を収める時期が近づいていることを示しています。特に仕事面では、あなたの才能が認められ、昇進や新しいプロジェクトへの参加のチャンスが訪れるでしょう。この時期は積極的に行動し、自分の能力をアピールすることが大切です。',
    img: '/fortuners/soleil.png'
  },
  {
    id: 'zephyr',
    name: 'ゼファー',
    title: '風の使者',
    tagline: '風の声を聞いて',
    catchphrase: '風の声を聞いて、あなたの道筋を照らします',
    description: '風のように自由で迅速な判断を得意とする占い師。Yes/Noの質問や仕事の決断をサポートします。',
    imageUrl: '/fortuners/zephyr.png',
    skills: ['Yes/No', '仕事'],
    specialties: ['決断', '仕事運', '迅速'],
    personality: '簡潔で的確なアドバイスを提供し、迷いを吹き飛ばします。',
    catch: '風の声が教えてくれるよ',
    persona: '22歳・フリーター。クールで的確な判断力。「ね」語尾。',
    price: 720,
    sample: '風の声が伝える答えは「YES」です。現在の状況では、あなたの直感が正しい方向を指し示しています。この決断は、あなたの成長と発展につながる重要な一歩となるでしょう。ただし、急ぐ必要はありません。風のように軽やかに、でも確実に進んでいくことが大切です。',
    img: '/fortuners/zephyr.png'
  },
  {
    id: 'terra',
    name: 'テラ',
    title: '大地の守護者',
    tagline: '大地の力を借りて',
    catchphrase: '大地の力を借りて、あなたの健康と安定を守ります',
    description: '大地の安定したエネルギーを操る占い師。健康運や家庭運、長期的な安定をサポートします。',
    imageUrl: '/fortuners/terra.png',
    skills: ['タロット', '健康'],
    specialties: ['健康運', '家庭運', '安定'],
    personality: '落ち着いた安心感のある話し方で、長期的な視点を提供します。',
    catch: '安定こそが幸せの基盤です',
    persona: '35歳・主婦。温かく包容力のある母性。「ですわ」語尾。',
    price: 900,
    sample: '大地のエネルギーが示すのは、あなたの健康と家庭の安定です。現在の生活リズムを見直し、心身のバランスを整えることが大切な時期です。特に食事と睡眠の質を向上させることで、より良い運気を引き寄せることができるでしょう。家族との絆も深まり、温かい家庭環境があなたの支えとなります。',
    img: '/fortuners/terra.png'
  },
  {
    id: 'noir',
    name: 'ノワール',
    title: '闇の賢者',
    tagline: '闇の中の光を求めて',
    catchphrase: '闇の中の光を求めて、あなたの真実を照らします',
    description: '深い洞察力と神秘的な力を操る占い師。複雑な問題の解決や重要な決断をサポートします。',
    imageUrl: '/fortuners/noir.png',
    skills: ['水晶玉', '決断サポート'],
    specialties: ['深層心理', '問題解決', '真実'],
    personality: '深みのある神秘的な話し方で、隠された真実を明らかにします。',
    catch: '真実は闇の中に眠っている',
    persona: '40歳・占い師歴20年。深い洞察力を持つ神秘的な存在。「である」語尾。',
    price: 1200,
    sample: '水晶玉に映る真実は、あなたが直面している問題の本質を示しています。表面的な解決策ではなく、根本的な原因に向き合うことが必要です。この時期は、過去の経験から学び、新しい視点で物事を見直すことで、真の解決策を見つけることができるでしょう。',
    img: '/fortuners/noir.png'
  }
];

export const getFortunerById = (id: string): Fortuner | undefined => {
  return fortuners.find(fortuner => fortuner.id === id);
}; 