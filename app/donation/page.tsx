export default function DonationPage() {
  return (
    <div className="max-w-container mx-auto px-4 w-full overflow-x-hidden py-12 pt-8 max-w-2xl mx-auto">
      <h1 className="text-4xl text-accent mb-8 pb-2 border-b border-accent">寄付について</h1>

      <section className="mb-12">
        <p className="text-xl text-muted text-center max-w-2xl mx-auto">
          横浜国立大学管弦楽団の活動を支えていただける皆様からのご寄付を心よりお待ちしております。
          皆様のご支援により、より充実した音楽活動を継続することができます。
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl mb-4 text-text-secondary">寄付金の使途</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 mt-8 max-mobile:grid-cols-1 max-mobile:gap-4">
          <div className="glass-card p-8 rounded-xl text-center max-mobile:p-6">
            <h3 className="text-accent mb-4 text-xl">楽器・楽譜の購入</h3>
            <p className="text-base leading-loose">演奏に必要な楽器の購入・メンテナンスや、新しい楽譜の購入に使用されます。</p>
          </div>
          <div className="glass-card p-8 rounded-xl text-center max-mobile:p-6">
            <h3 className="text-accent mb-4 text-xl">演奏会開催</h3>
            <p className="text-base leading-loose">定期演奏会や学外での演奏会の開催費用（会場費、音響設備など）に使用されます。</p>
          </div>
          <div className="glass-card p-8 rounded-xl text-center max-mobile:p-6">
            <h3 className="text-accent mb-4 text-xl">指導者への謝礼</h3>
            <p className="text-base leading-loose">プロの指揮者やトレーナーによる指導のための謝礼金に使用されます。</p>
          </div>
          <div className="glass-card p-8 rounded-xl text-center max-mobile:p-6">
            <h3 className="text-accent mb-4 text-xl">移動音楽会</h3>
            <p className="text-base leading-loose">小学校や福祉施設での移動音楽会の交通費や機材運搬費に使用されます。</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl mb-4 text-text-secondary">寄付金額の目安</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 mt-8 max-mobile:grid-cols-2 max-mobile:gap-4 max-[480px]:grid-cols-1 max-[480px]:gap-3">
          <div className="glass-card p-8 rounded-xl text-center border-2 border-transparent transition-all duration-300 ease hover:border-accent hover:-translate-y-0.5 max-mobile:p-6 max-[480px]:p-4">
            <div className="text-3xl font-bold text-accent mb-2 max-[480px]:text-2xl">¥1,000</div>
            <p className="text-base leading-loose">楽譜1冊分の購入</p>
          </div>
          <div className="glass-card p-8 rounded-xl text-center border-2 border-transparent transition-all duration-300 ease hover:border-accent hover:-translate-y-0.5 max-mobile:p-6 max-[480px]:p-4">
            <div className="text-3xl font-bold text-accent mb-2 max-[480px]:text-2xl">¥5,000</div>
            <p className="text-base leading-loose">移動音楽会の交通費</p>
          </div>
          <div className="glass-card p-8 rounded-xl text-center border-2 border-transparent transition-all duration-300 ease hover:border-accent hover:-translate-y-0.5 max-mobile:p-6 max-[480px]:p-4">
            <div className="text-3xl font-bold text-accent mb-2 max-[480px]:text-2xl">¥10,000</div>
            <p className="text-base leading-loose">演奏会の音響設備費</p>
          </div>
          <div className="glass-card p-8 rounded-xl text-center border-2 border-transparent transition-all duration-300 ease hover:border-accent hover:-translate-y-0.5 max-mobile:p-6 max-[480px]:p-4">
            <div className="text-3xl font-bold text-accent mb-2 max-[480px]:text-2xl">¥50,000</div>
            <p className="text-base leading-loose">楽器のメンテナンス費</p>
          </div>
          <div className="glass-card p-8 rounded-xl text-center border-2 border-transparent transition-all duration-300 ease hover:border-accent hover:-translate-y-0.5 max-mobile:p-6 max-[480px]:p-4">
            <div className="text-3xl font-bold text-accent mb-2 max-[480px]:text-2xl">¥100,000</div>
            <p className="text-base leading-loose">新楽器の購入費</p>
          </div>
          <div className="glass-card p-8 rounded-xl text-center border-2 border-transparent transition-all duration-300 ease hover:border-accent hover:-translate-y-0.5 max-mobile:p-6 max-[480px]:p-4">
            <div className="text-3xl font-bold text-accent mb-2 max-[480px]:text-2xl">任意</div>
            <p className="text-base leading-loose">お気持ちに応じて</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl mb-4 text-text-secondary">寄付方法</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 mt-8 max-mobile:grid-cols-1 max-mobile:gap-6">
          <div className="glass-card p-8 rounded-xl max-mobile:p-6">
            <h3 className="text-accent mb-4 text-2xl">銀行振込</h3>
            <div>
              <p className="my-2 font-mono bg-gray-light p-2 rounded text-base leading-loose"><strong>銀行名:</strong> 横浜銀行</p>
              <p className="my-2 font-mono bg-gray-light p-2 rounded text-base leading-loose"><strong>支店名:</strong> 横浜国立大学支店</p>
              <p className="my-2 font-mono bg-gray-light p-2 rounded text-base leading-loose"><strong>口座種別:</strong> 普通</p>
              <p className="my-2 font-mono bg-gray-light p-2 rounded text-base leading-loose"><strong>口座番号:</strong> 1234567</p>
              <p className="my-2 font-mono bg-gray-light p-2 rounded text-base leading-loose"><strong>口座名義:</strong> 横浜国立大学管弦楽団</p>
            </div>
          </div>
          <div className="glass-card p-8 rounded-xl max-mobile:p-6">
            <h3 className="text-accent mb-4 text-2xl">現金でのお渡し</h3>
            <p className="text-base leading-loose">演奏会会場や練習場所で直接お渡しいただけます。</p>
            <p className="text-base leading-loose">事前にご連絡いただければ、代表者がお待ちしております。</p>
          </div>
          <div className="glass-card p-8 rounded-xl max-mobile:p-6">
            <h3 className="text-accent mb-4 text-2xl">物品での寄付</h3>
            <p className="text-base leading-loose">楽器、楽譜、音楽関連の書籍なども寄付として受け付けております。</p>
            <p className="text-base leading-loose">お気軽にお問い合わせください。</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl mb-4 text-text-secondary">寄付者への特典</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 mt-8 max-mobile:grid-cols-1 max-mobile:gap-4">
          <div className="glass-card p-8 rounded-xl max-mobile:p-6">
            <h3 className="text-accent mb-4 text-xl">演奏会無料招待</h3>
            <p className="text-base leading-loose">定期演奏会にご招待いたします（寄付金額に応じて複数名まで）</p>
          </div>
          <div className="glass-card p-8 rounded-xl max-mobile:p-6">
            <h3 className="text-accent mb-4 text-xl">活動報告書</h3>
            <p className="text-base leading-loose">年1回、団の活動状況をまとめた報告書をお送りします</p>
          </div>
          <div className="glass-card p-8 rounded-xl max-mobile:p-6">
            <h3 className="text-accent mb-4 text-xl">練習見学</h3>
            <p className="text-base leading-loose">練習の様子を見学していただけます</p>
          </div>
          <div className="glass-card p-8 rounded-xl max-mobile:p-6">
            <h3 className="text-accent mb-4 text-xl">感謝状</h3>
            <p className="text-base leading-loose">寄付いただいた方には感謝状をお送りします</p>
          </div>
        </div>
      </section>

      <section className="glass-card p-8 rounded-xl text-center mb-12 max-mobile:p-6 max-[480px]:p-4">
        <h2 className="text-2xl mb-4 text-text-secondary">お問い合わせ</h2>
        <p className="text-base leading-loose mb-6">寄付に関するご質問やご相談がございましたら、お気軽にお問い合わせください。</p>
        <div className="my-6">
          <p className="my-2 text-lg"><strong>メール:</strong> info@ynuorch.com</p>
          <p className="my-2 text-lg"><strong>担当:</strong> 運営委員長 鈴木 是雄</p>
        </div>
        <div className="flex gap-4 justify-center mt-8">
          <a href="/concerts" className="inline-block glass-card text-accent border border-accent px-8 py-4 rounded-lg no-underline font-normal transition-all duration-300 ease hover:bg-accent hover:text-white hover:-translate-y-0.5">演奏会情報を見る</a>
        </div>
      </section>

      <section className="bg-warning-bg p-8 rounded-xl border-l-4 border-warning-border max-mobile:p-6 max-[480px]:p-4">
        <h2 className="text-2xl mb-4 text-text-secondary">ご注意事項</h2>
        <div>
          <ul className="list-none p-0">
            <li className="py-2 border-b border-warning-light text-base leading-loose relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-accent before:font-bold">寄付金は横浜国立大学管弦楽団の活動にのみ使用されます</li>
            <li className="py-2 border-b border-warning-light text-base leading-loose relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-accent before:font-bold">寄付金の領収書が必要な場合は、お申し付けください</li>
            <li className="py-2 border-b border-warning-light text-base leading-loose relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-accent before:font-bold">寄付金の返金は原則として行いません</li>
            <li className="py-2 text-base leading-loose relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-accent before:font-bold">寄付者の個人情報は適切に管理し、活動報告以外の目的では使用いたしません</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
