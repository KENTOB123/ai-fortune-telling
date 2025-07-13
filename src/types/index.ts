export interface FortuneResult {
  id: string
  type: 'tarot' | 'zodiac' | 'crystal' | 'general'
  question: string
  answer: string
  timestamp: Date
  details?: {
    zodiacSign?: string
    birthstone?: string
    luckyColor?: string
    tarotCard?: {
      name: string
      meaning: string
      reversed: boolean
    }
  }
}

export interface UserProfile {
  name: string
  birthDate: Date
  zodiacSign: string
  birthstone: string
  luckyColor: string
}

export interface FortuneHistory {
  id: string
  results: FortuneResult[]
  createdAt: Date
}

export interface TarotCard {
  name: string
  meaning: string
  reversed: boolean
  image?: string
}

export interface ZodiacInfo {
  sign: string
  element: string
  quality: string
  ruler: string
  luckyColor: string
  luckyNumber: number
  description: string
}

export interface CrystalBallReading {
  question: string
  vision: string
  advice: string
  energy: 'positive' | 'neutral' | 'challenging'
} 