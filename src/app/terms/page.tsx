export default function TermsPage() {
  return (
    <div className="min-h-screen bg-midnight-950 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-surface-900 border border-surface-800 rounded-xl p-8">
          <h1 className="text-3xl font-mystical text-royalGold-400 mb-8">利用規約</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-white/60 text-sm mb-6">
              最終更新日: 2024年1月15日
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-mystical text-royalGold-400 mb-4">第1条（適用）</h2>
              <p className="text-white/80 mb-4">
                本規約は、当社が提供するAI占いサービス（以下「本サービス」）の利用条件を定めるものです。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-mystical text-royalGold-400 mb-4">第2条（サービスの内容）</h2>
              <p className="text-white/80 mb-4">
                本サービスは、AI技術を活用した占いコンテンツを提供するエンターテイメントサービスです。
                占い結果は参考情報であり、重要な人生の決断は必ずご自身の判断で行ってください。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-mystical text-royalGold-400 mb-4">第3条（利用料金）</h2>
              <p className="text-white/80 mb-4">
                本サービスは、無料プランと有料プランを提供します。
                有料プランの料金体系は別途定める料金表に従います。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-mystical text-royalGold-400 mb-4">第4条（禁止事項）</h2>
              <ul className="text-white/80 mb-4 list-disc list-inside space-y-2">
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>当社のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
                <li>本サービスの運営を妨害するおそれのある行為</li>
                <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
                <li>他のユーザーに成りすます行為</li>
                <li>当社のサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-mystical text-royalGold-400 mb-4">第5条（免責事項）</h2>
              <p className="text-white/80 mb-4">
                当社は、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。
                占い結果は参考情報であり、その結果に基づく行動や判断について当社は一切の責任を負いません。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-mystical text-royalGold-400 mb-4">第6条（サービス内容の変更等）</h2>
              <p className="text-white/80 mb-4">
                当社は、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-mystical text-royalGold-400 mb-4">第7条（利用規約の変更）</h2>
              <p className="text-white/80 mb-4">
                当社は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。
                なお、本規約の変更後、本サービスの利用を継続した場合には、変更後の規約に同意したものとみなします。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-mystical text-royalGold-400 mb-4">第8条（準拠法・裁判管轄）</h2>
              <p className="text-white/80 mb-4">
                本規約の解釈にあたっては、日本法を準拠法とします。
                本サービスに関して紛争が生じた場合には、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
              </p>
            </section>

            <div className="mt-12 p-6 bg-surface-800 rounded-lg">
              <h3 className="text-lg font-mystical text-royalGold-400 mb-4">お問い合わせ</h3>
              <p className="text-white/80 text-sm">
                本規約に関するお問い合わせは、以下のメールアドレスまでお願いいたします。
              </p>
              <p className="text-royalGold-400 text-sm mt-2">
                support@ai-fortune-telling.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 