import type { Metadata, Viewport } from 'next'
import './globals.css'
import MainNav from '@/components/MainNav'
import MobileDrawer from '@/components/MobileDrawer'

export const metadata: Metadata = {
  title: 'AI占い - 神秘的な未来を覗いてみませんか',
  description: 'AI技術を駆使した神秘的な占い体験。タロット、星座、水晶玉占いで未来を覗いてみましょう。',
  keywords: 'AI占い, タロット, 星座占い, 水晶玉占い, 未来予測',
  authors: [{ name: 'AI占い' }],
  robots: 'index, follow',
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'AI占い - 神秘的な未来を覗いてみませんか',
    description: 'AI技術を駆使した神秘的な占い体験。タロット、星座、水晶玉占いで未来を覗いてみましょう。',
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI占い - 神秘的な未来を覗いてみませんか',
    description: 'AI技術を駆使した神秘的な占い体験。タロット、星座、水晶玉占いで未来を覗いてみましょう。',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen">
        {/* ナビゲーション */}
        <header className="relative z-50">
          <MainNav />
          <div className="md:hidden">
            <MobileDrawer />
          </div>
        </header>

        {/* メインコンテンツ */}
        <main className="pt-20 min-h-screen">
          {children}
        </main>

        {/* フッター */}
        <footer className="bg-midnight-900/50 border-t border-white/10 mt-20">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* サイト情報 */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-mystic-400 to-mystic-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">占</span>
                  </div>
                  <span className="font-mystical text-xl font-semibold text-white">AI占い</span>
                </div>
                <p className="text-white/60 text-sm">
                  AI技術を駆使した神秘的な占い体験を提供します。
                </p>
              </div>

              {/* リンク */}
              <div>
                <h3 className="text-white font-semibold mb-4">サービス</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/tarot" className="text-white/60 hover:text-white text-sm transition-colors">
                      タロット占い
                    </a>
                  </li>
                  <li>
                    <a href="/zodiac" className="text-white/60 hover:text-white text-sm transition-colors">
                      星座占い
                    </a>
                  </li>
                  <li>
                    <a href="/crystal" className="text-white/60 hover:text-white text-sm transition-colors">
                      水晶玉占い
                    </a>
                  </li>
                </ul>
              </div>

              {/* 情報 */}
              <div>
                <h3 className="text-white font-semibold mb-4">情報</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/privacy" className="text-white/60 hover:text-white text-sm transition-colors">
                      プライバシーポリシー
                    </a>
                  </li>
                  <li>
                    <a href="/terms" className="text-white/60 hover:text-white text-sm transition-colors">
                      利用規約
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="text-white/60 hover:text-white text-sm transition-colors">
                      お問い合わせ
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* 免責事項 */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-xs text-white/40 text-center">
                このサービスはエンターテイメント目的で提供されています。
                占い結果は参考程度にお楽しみください。
              </p>
              <p className="text-xs text-white/40 text-center mt-1">
                無料利用回数リセット時刻: 毎日 09:00 (JST)
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
} 