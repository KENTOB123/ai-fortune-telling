export const TAROT_PENTS = [
  {
    id:"pentacles-ace",
    jp:"ペンタクルのエース",
    en:"Ace of Pentacles",
    upright:"繁栄・潜在的成功・新しい財産",
    reversed:"浪費・機会損失・不安"
  },
  {
    id:"pentacles-2",
    jp:"ペンタクルの2",
    en:"Two of Pentacles",
    upright:"バランス・適応・選択",
    reversed:"不均衡・混乱・優先順位の誤り"
  },
  {
    id:"pentacles-3",
    jp:"ペンタクルの3",
    en:"Three of Pentacles",
    upright:"協力・チームワーク・熟練",
    reversed:"孤立・不協和・未熟"
  },
  {
    id:"pentacles-4",
    jp:"ペンタクルの4",
    en:"Four of Pentacles",
    upright:"安定・蓄積・所有",
    reversed:"貪欲・執着・閉鎖性"
  },
  {
    id:"pentacles-5",
    jp:"ペンタクルの5",
    en:"Five of Pentacles",
    upright:"困難・貧困・孤立",
    reversed:"回復・希望・支援"
  }
  // TODO: 残り73枚のカードデータを追加予定
] as const;

export type TarotCard = (typeof TAROT_PENTS)[number]; 