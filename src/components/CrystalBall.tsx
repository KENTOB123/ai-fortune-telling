'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, Sparkles, RotateCcw, MessageCircle } from 'lucide-react'

interface CrystalBallProps {
  onReadingComplete?: (reading: { question: string; vision: string; advice: string; energy: 'positive' | 'neutral' | 'challenging' }) => void
}

export default function CrystalBall({ onReadingComplete }: CrystalBallProps) {
  const [isReading, setIsReading] = useState(false)
  const [reading, setReading] = useState<{ question: string; vision: string; advice: string; energy: 'positive' | 'neutral' | 'challenging' } | null>(null)
  const [question, setQuestion] = useState('')

  const visions = [
    "あなたの未来には明るい光が差しています。新しい出会いが運命を変えるでしょう。",
    "水晶玉に映るのは、あなたの努力が実を結ぶ瞬間です。",
    "遠くに美しい風景が見えます。旅があなたを成長させるでしょう。",
    "愛のエネルギーが強く感じられます。大切な人との絆が深まります。",
    "仕事面で大きなチャンスが訪れます。勇気を持って挑戦してください。",
    "健康と幸福があなたを包んでいます。心身ともに充実した日々が続きます。",
    "創造性が開花する時期です。新しいアイデアが次々と生まれるでしょう。",
    "家族との時間があなたに力を与えます。絆がより深まります。"
  ]

  const detailedAdvice = [
    "あなたの直感は非常に鋭く、正しい方向を示しています。今日一日、この直感を信じて行動してください。周りの人とのコミュニケーションを大切にし、自分の気持ちを素直に伝えることで、より深い関係を築くことができます。新しいことに挑戦する勇気を持ち、失敗を恐れずに一歩踏み出してください。あなたの努力は必ず報われ、素晴らしい結果が待っています。今日一日、自分を信じて前向きに過ごしてください。",
    
    "あなたの周りには素晴らしい人々が集まっています。今日は特に、周りの人との協力を大切にしてください。一人ではできないことも、みんなでなら必ず実現できます。自分の能力を過小評価せず、自信を持って行動してください。小さな成功体験を積み重ねることで、大きな自信につながります。今日一日、感謝の気持ちを忘れずに、周りの人に優しく接してください。",
    
    "あなたは大きな可能性を秘めています。今日は新しいことに挑戦するのに最適な日です。変化を恐れず、自分の夢に向かって一歩ずつ進んでください。創造性が高まっているので、新しいアイデアを形にしてみましょう。周りの人からのアドバイスも大切にし、謙虚な姿勢で学び続けてください。今日一日、自分の成長を実感できる素晴らしい日になるでしょう。",
    
    "あなたの価値は計り知れません。今日は特に、自分自身を大切にすることを忘れないでください。無理をせず、自分のペースで進んでいくことが重要です。周りの人との関係も大切にし、お互いを理解し合える関係を築いてください。小さな幸せに気づくことで、人生はより豊かになります。今日一日、自分らしく過ごすことで、素晴らしい発見があるでしょう。",
    
    "あなたの努力は必ず実を結びます。今日は特に、目標に向かって着実に進んでいくことが重要です。急ぐ必要はありません。一歩ずつ確実に進んでいきましょう。周りの人との協力も大切にし、お互いを支え合える関係を築いてください。今日一日、自分のペースを守りながら、着実に成果を積み上げてください。",
    
    "あなたの愛する人との時間は、人生の宝です。今日は特に、大切な人との関係を深めるのに適した日です。素直な気持ちを伝え、お互いを理解し合える時間を大切にしてください。家族や友人との絆を深めることで、心の安らぎを得ることができます。今日一日、愛する人との時間を優先し、素晴らしい思い出を作ってください。",
    
    "あなたの夢は必ず実現します。今日は特に、自分の夢に向かって行動するのに適した日です。諦めずに、一歩ずつ着実に進んでいきましょう。周りの人からのサポートも大切にし、お互いを支え合える関係を築いてください。今日一日、自分の夢を信じて、前向きに行動してください。",
    
    "あなたの内なる強さは、どんな困難も乗り越えることができます。今日は特に、自分の力を信じて行動するのに適した日です。新しいことに挑戦する勇気を持ち、失敗を恐れずに一歩踏み出してください。周りの人との協力も大切にし、お互いを支え合える関係を築いてください。今日一日、自分を信じて、素晴らしい成果を上げてください。"
  ]

  const handleReading = () => {
    if (!question.trim() || isReading) return

    setIsReading(true)
    
    // 水晶玉の効果音やアニメーションを模擬
    setTimeout(() => {
      const randomVision = visions[Math.floor(Math.random() * visions.length)]
      const randomAdvice = detailedAdvice[Math.floor(Math.random() * detailedAdvice.length)]
      const energies: ('positive' | 'neutral' | 'challenging')[] = ['positive', 'neutral', 'challenging']
      const randomEnergy = energies[Math.floor(Math.random() * energies.length)]

      const newReading = {
        question: question,
        vision: randomVision,
        advice: randomAdvice,
        energy: randomEnergy
      }

      setReading(newReading)
      onReadingComplete?.(newReading)
      setIsReading(false)
    }, 3000)
  }

  const handleReset = () => {
    setReading(null)
    setQuestion('')
  }

  const getEnergyColor = (energy: string) => {
    switch (energy) {
      case 'positive': return 'from-green-500 to-emerald-500'
      case 'neutral': return 'from-blue-500 to-cyan-500'
      case 'challenging': return 'from-orange-500 to-red-500'
      default: return 'from-purple-500 to-pink-500'
    }
  }

  return (
    <div className="max-w-2xl mx-auto text-center">
      {/* 水晶玉 */}
      <div className="relative mb-8">
        <motion.div
          className="w-64 h-64 mx-auto crystal-ball rounded-full flex items-center justify-center relative"
          animate={isReading ? { 
            scale: [1, 1.1, 1],
            boxShadow: [
              "0 0 30px rgba(147, 51, 234, 0.3)",
              "0 0 50px rgba(147, 51, 234, 0.6)",
              "0 0 30px rgba(147, 51, 234, 0.3)"
            ]
          } : {}}
          transition={{ duration: 2, repeat: isReading ? Infinity : 0 }}
        >
          {isReading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-white text-4xl"
            >
              <Sparkles />
            </motion.div>
          ) : reading ? (
            <div className="text-center text-white p-6">
              <Eye className="w-12 h-12 mx-auto mb-4" />
              <p className="text-sm font-medium">未来が見えています...</p>
            </div>
          ) : (
            <div className="text-center text-white p-6">
              <Eye className="w-12 h-12 mx-auto mb-4" />
              <p className="text-sm font-medium">質問を入力してください</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* 質問入力 */}
      {!reading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="水晶玉に聞きたいことを入力してください..."
            className="w-full p-4 border-2 border-mystic-300 rounded-lg resize-none focus:border-primary-500 focus:outline-none transition-colors duration-200"
            rows={4}
            disabled={isReading}
          />
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReading}
            disabled={!question.trim() || isReading}
            className="btn-mystic text-white px-8 py-3 rounded-lg font-semibold mt-4 shadow-lg disabled:opacity-50"
          >
            {isReading ? '占っています...' : '水晶玉を覗く'}
          </motion.button>
        </motion.div>
      )}

      {/* 占い結果 */}
      {reading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* エネルギー表示 */}
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r ${getEnergyColor(reading.energy)} text-white text-sm font-medium`}>
            <Sparkles className="w-4 h-4" />
            <span>
              {reading.energy === 'positive' && 'ポジティブなエネルギー'}
              {reading.energy === 'neutral' && 'バランスの取れたエネルギー'}
              {reading.energy === 'challenging' && '成長のエネルギー'}
            </span>
          </div>

          {/* 質問 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-mystic-800 mb-3 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2 text-blue-500" />
              あなたの質問
            </h3>
            <p className="text-mystic-700 leading-relaxed">{reading.question}</p>
          </div>

          {/* ビジョン */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-mystic-800 mb-3">水晶玉に映る未来</h3>
            <p className="text-mystic-700 leading-relaxed">{reading.vision}</p>
          </div>

          {/* アドバイス */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-mystic-800 mb-3">水晶玉からのアドバイス</h3>
            <p className="text-mystic-700 leading-relaxed whitespace-pre-line">{reading.advice}</p>
          </div>

          {/* リセットボタン */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="bg-mystic-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-mystic-700 transition-colors duration-200 flex items-center space-x-2 mx-auto"
          >
            <RotateCcw className="w-4 h-4" />
            <span>もう一度占う</span>
          </motion.button>
        </motion.div>
      )}
    </div>
  )
} 