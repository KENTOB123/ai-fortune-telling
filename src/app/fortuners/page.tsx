import { FORTUNERS } from "@/data/fortuners";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';

export default function FortunersPage() {
  const searchParams = useSearchParams();
  const preset = searchParams.get('preset');
  return (
    <div className="min-h-screen bg-midnight text-white px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">占い師一覧</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {FORTUNERS.map(f => (
          <article key={f.id} className="bg-surface/70 rounded-xl p-6 space-y-4">
            <Image 
              src={f.img} 
              alt={f.name} 
              width={240} 
              height={320} 
              className="rounded-lg mx-auto"
            />
            <h2 className="text-xl font-semibold text-center">{f.name}</h2>
            <p className="text-crystal text-sm text-center">{f.catch}</p>
            <p className="text-xs text-center">料金 : ¥{f.price}</p>
            <p className="text-sm whitespace-pre-wrap line-clamp-6">{f.bio}</p>
            <Link href={preset ? `/flow?preset=${preset}&teller=${f.id}` : `/fortuners/${f.id}`} className="btn-mystic w-full text-center">
              {preset ? 'この占い師でリーディング' : '詳細を見る'}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
} 