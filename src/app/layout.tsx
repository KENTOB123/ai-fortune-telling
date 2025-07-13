import type { Metadata, Viewport } from 'next'
import './globals.css'

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
      <body className="min-h-screen bg-gradient-to-br from-mystic-50 via-white to-mystic-100">
        {children}
      </body>
    </html>
  )
} 