import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '今日の星座占い | AI占い',
  description: '毎朝更新！AIが贈る12星座の運勢。無料でチェック',
  keywords: ['星座占い', '今日の運勢', '12星座', '無料占い', 'AI占い'],
  openGraph: {
    title: '今日の星座占い | AI占い',
    description: '毎朝更新！AIが贈る12星座の運勢。無料でチェック',
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary',
    title: '今日の星座占い | AI占い',
    description: '毎朝更新！AIが贈る12星座の運勢。無料でチェック',
  },
};

export default function DailyHoroscopeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 