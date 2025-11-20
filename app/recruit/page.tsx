import Link from 'next/link';

export default function RecruitPage() {
  return (
    <div className="max-w-container mx-auto px-4 w-full overflow-x-hidden py-12 pt-8 max-w-2xl mx-auto">
      <h1 className="text-4xl text-accent mb-8 pb-2 border-b border-accent">団員募集</h1>

      <section className="mb-12">
        <p className="text-xl text-muted text-center max-w-2xl mx-auto">
          横浜国立大学管弦楽団では、新しい団員を募集しています。音楽への情熱と向上心を持った学生の皆さんの参加をお待ちしています。
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl mb-4 text-text-secondary">募集要項</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 mt-8 max-mobile:grid-cols-1 max-mobile:gap-4">
          <div className="bg-white p-8 rounded-xl shadow-md text-center max-mobile:p-6">
            <h3 className="text-accent mb-4 text-xl">対象</h3>
            <p className="text-base leading-loose">横浜国立大学 常磐台キャンパスに通える大学生（学部生・大学院生）</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md text-center max-mobile:p-6">
            <h3 className="text-accent mb-4 text-xl">楽器</h3>
            <p className="text-base leading-loose">弦楽器、管楽器、打楽器</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md text-center max-mobile:p-6">
            <h3 className="text-accent mb-4 text-xl">経験</h3>
            <p className="text-base leading-loose">初心者から上級者まで歓迎</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md text-center max-mobile:p-6">
            <h3 className="text-accent mb-4 text-xl">練習</h3>
            <p className="text-base leading-loose">週2回（水曜・土曜）</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl mb-4 text-text-secondary">練習時間</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 mt-4 max-mobile:grid-cols-1 max-mobile:gap-4">
          <div className="bg-white p-6 rounded-lg shadow-sm max-mobile:p-4">
            <h3 className="text-accent mb-4 max-mobile:text-lg">通常練習</h3>
            <p className="text-base leading-loose max-mobile:text-sm">毎週水曜日 17:00～21:00</p>
            <p className="text-base leading-loose max-mobile:text-sm">毎週土曜日 15:00～21:00</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm max-mobile:p-4">
            <h3 className="text-accent mb-4 max-mobile:text-lg">合宿</h3>
            <p className="text-base leading-loose max-mobile:text-sm">夏、春休みに年2回</p>
            <p className="text-base leading-loose max-mobile:text-sm">5泊6日程度</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl mb-4 text-text-secondary">練習場所</h2>
        <p className="text-base leading-loose">横浜国立大学 文化サークル棟</p>
        <p className="text-base leading-loose">※パート練習は同棟内の空き部屋を使用することもあります</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl mb-4 text-text-secondary">募集パート</h2>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 list-none p-0 max-mobile:grid-cols-2 max-mobile:gap-3 max-[480px]:grid-cols-1 max-[480px]:gap-2.5">
          <li className="bg-white p-3 rounded-lg text-center shadow-sm max-mobile:p-2.5 max-mobile:text-sm max-[480px]:p-2 max-[480px]:text-sm">ヴァイオリン</li>
          <li className="bg-white p-3 rounded-lg text-center shadow-sm max-mobile:p-2.5 max-mobile:text-sm max-[480px]:p-2 max-[480px]:text-sm">ヴィオラ</li>
          <li className="bg-white p-3 rounded-lg text-center shadow-sm max-mobile:p-2.5 max-mobile:text-sm max-[480px]:p-2 max-[480px]:text-sm">チェロ</li>
          <li className="bg-white p-3 rounded-lg text-center shadow-sm max-mobile:p-2.5 max-mobile:text-sm max-[480px]:p-2 max-[480px]:text-sm">コントラバス</li>
          <li className="bg-white p-3 rounded-lg text-center shadow-sm max-mobile:p-2.5 max-mobile:text-sm max-[480px]:p-2 max-[480px]:text-sm">フルート</li>
          <li className="bg-white p-3 rounded-lg text-center shadow-sm max-mobile:p-2.5 max-mobile:text-sm max-[480px]:p-2 max-[480px]:text-sm">オーボエ</li>
          <li className="bg-white p-3 rounded-lg text-center shadow-sm max-mobile:p-2.5 max-mobile:text-sm max-[480px]:p-2 max-[480px]:text-sm">クラリネット</li>
          <li className="bg-white p-3 rounded-lg text-center shadow-sm max-mobile:p-2.5 max-mobile:text-sm max-[480px]:p-2 max-[480px]:text-sm">ファゴット</li>
          <li className="bg-white p-3 rounded-lg text-center shadow-sm max-mobile:p-2.5 max-mobile:text-sm max-[480px]:p-2 max-[480px]:text-sm">ホルン</li>
          <li className="bg-white p-3 rounded-lg text-center shadow-sm max-mobile:p-2.5 max-mobile:text-sm max-[480px]:p-2 max-[480px]:text-sm">トランペット</li>
          <li className="bg-white p-3 rounded-lg text-center shadow-sm max-mobile:p-2.5 max-mobile:text-sm max-[480px]:p-2 max-[480px]:text-sm">トロンボーン</li>
          <li className="bg-white p-3 rounded-lg text-center shadow-sm max-mobile:p-2.5 max-mobile:text-sm max-[480px]:p-2 max-[480px]:text-sm">チューバ</li>
          <li className="bg-white p-3 rounded-lg text-center shadow-sm max-mobile:p-2.5 max-mobile:text-sm max-[480px]:p-2 max-[480px]:text-sm">打楽器</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl mb-4 text-text-secondary">入団までの流れ</h2>
        <div className="flex flex-col gap-8 mt-8 max-mobile:gap-4">
          <div className="flex items-start gap-6 p-6 bg-white rounded-xl shadow-md max-mobile:gap-6 max-mobile:p-4">
            <div className="bg-accent text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">1</div>
            <div className="flex-1">
              <h3 className="text-accent mb-2">見学・体験</h3>
              <p className="text-base leading-loose max-mobile:text-sm">まずは練習を見学していただき、実際に楽器を体験していただけます。</p>
            </div>
          </div>
          <div className="flex items-start gap-6 p-6 bg-white rounded-xl shadow-md max-mobile:gap-6 max-mobile:p-4">
            <div className="bg-accent text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">2</div>
            <div className="flex-1">
              <h3 className="text-accent mb-2">面談</h3>
              <p className="text-base leading-loose max-mobile:text-sm">団の活動内容や練習スケジュールについて詳しくお話しします。</p>
            </div>
          </div>
          <div className="flex items-start gap-6 p-6 bg-white rounded-xl shadow-md max-mobile:gap-6 max-mobile:p-4">
            <div className="bg-accent text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">3</div>
            <div className="flex-1">
              <h3 className="text-accent mb-2">入団</h3>
              <p className="text-base leading-loose max-mobile:text-sm">正式に入団手続きを行い、一緒に音楽を楽しみましょう。</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl mb-4 text-text-secondary">入団のメリット</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 mt-8 max-mobile:grid-cols-1 max-mobile:gap-4">
          <div className="bg-white p-8 rounded-xl shadow-md max-mobile:p-6">
            <h3 className="text-accent mb-4 text-xl">技術向上</h3>
            <p className="text-base leading-loose">個人レッスンやパート練習を通じて、演奏技術を向上させることができます。</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md max-mobile:p-6">
            <h3 className="text-accent mb-4 text-xl">仲間との交流</h3>
            <p className="text-base leading-loose">同じ音楽への情熱を持つ仲間と出会い、深い友情を築くことができます。</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md max-mobile:p-6">
            <h3 className="text-accent mb-4 text-xl">演奏会参加</h3>
            <p className="text-base leading-loose">定期演奏会や学外での演奏会に参加し、貴重な経験を積むことができます。</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 p-8 rounded-xl text-center max-mobile:p-6 max-[480px]:p-4">
        <h2 className="text-2xl mb-4 text-text-secondary">お問い合わせ</h2>
        <p className="text-base leading-loose mb-6">入団にご興味のある方は、お気軽にお問い合わせください。</p>
        <div className="my-6">
          <a 
            href="https://www.instagram.com/ynuorch_shinkan/" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Instagram" 
            className="flex items-center justify-center gap-2 text-muted transition-colors duration-300 ease no-underline hover:text-accent mt-4"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>@ynuorch_shinkan</span>
          </a>
        </div>
        <div className="flex gap-4 justify-center mt-8">
          <Link href="/contact" className="inline-block bg-accent text-white px-8 py-4 rounded-lg no-underline font-normal transition-all duration-300 ease hover:bg-accent-dark hover:-translate-y-0.5">お問い合わせフォーム</Link>
        </div>
      </section>
    </div>
  );
}