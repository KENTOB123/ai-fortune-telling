import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'AI占い - 無料で本格的なタロット占いを体験',
    template: '%s | AI占い'
  },
  description: 'AI技術と伝統的なタロットカードを組み合わせた本格的な占いサイト。恋愛、キャリア、健康など、あなたの悩みに最適なアドバイスを提供します。無料でお試しいただけます。',
  keywords: ['占い', 'タロット', 'AI占い', '恋愛運', 'キャリア運', '健康運', '無料占い'],
  authors: [{ name: 'AI占い' }],
  creator: 'AI占い',
  publisher: 'AI占い',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ai-fortune-telling-ochre.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://ai-fortune-telling-ochre.vercel.app',
    title: 'AI占い - 無料で本格的なタロット占いを体験',
    description: 'AI技術と伝統的なタロットカードを組み合わせた本格的な占いサイト。恋愛、キャリア、健康など、あなたの悩みに最適なアドバイスを提供します。',
    siteName: 'AI占い',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI占い - 本格的なタロット占い',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI占い - 無料で本格的なタロット占いを体験',
    description: 'AI技術と伝統的なタロットカードを組み合わせた本格的な占いサイト。',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  )
} 