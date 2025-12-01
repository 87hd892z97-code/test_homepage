import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-container mx-auto px-4 w-full overflow-x-hidden py-12 pt-8 max-w-2xl mx-auto">
      <h1 className="text-4xl text-accent dark:text-[#4aaaf0] mb-8 pb-2 border-b border-accent dark:border-[#4aaaf0]">楽団紹介</h1>

      <section className="mb-12">
        <h2 className="text-2xl mb-4 text-text-secondary dark:text-[#d4d4d4]">横浜国立大学管弦楽団</h2>
        <p className="text-base leading-loose dark:text-[#cccccc]">Yokohama National University Orchestra (YNU Orchestra)</p>
        <p className="text-base leading-loose dark:text-[#cccccc]">1959年3月設立。年2回の定期演奏会を中心に、各セクション（弦、木管、金管）によるコンサートや、 小学校や福祉施設での移動音楽会など、 地元横浜を中心に活動している。過去に、家田厚志、岩村力、 海老原光、長田雅人、川瀬賢太郎、河地良智、栗田博文、現田茂夫、甲賀一宏、坂本和彦、佐々木新平、 白谷隆、田中健、田部井剛、十束尚弘、冨平恭平、新田ユリ、林紀人、松尾葉子、松岡究、山岡重信、山下一史、 渡邊一正、和田一樹（五十音順、敬称略）の各氏らと共演。</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl mb-4 text-text-secondary dark:text-[#d4d4d4]">所在地</h2>
        <ul className="list-none p-0 m-0">
          <p className="text-base leading-loose dark:text-[#cccccc]">〒240-8501　神奈川県横浜市保土ヶ谷区常盤台79-1横浜国立大学　文化サークル共用施設2階</p>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl mb-4 text-text-secondary dark:text-[#d4d4d4]">第125期執行部</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 mt-4 max-mobile:grid-cols-1 max-mobile:gap-4">
          <div className="glass-card p-6 rounded-lg text-center max-mobile:p-4">
            <Image
              src="/RegularConcertPoster/ynuorch-icon.jpg"
              alt="顧問 杉山 久仁子"
              width={80}
              height={80}
              className="w-20 h-20 rounded-xl object-cover mx-auto mb-4 block border-2 border-accent dark:border-[#4aaaf0] max-mobile:w-[60px] max-mobile:h-[60px] max-mobile:mb-3"
            />
            <span className="block font-semibold text-accent dark:text-[#4aaaf0] text-sm mb-2 max-mobile:text-sm">顧問</span>
            <p className="text-lg font-medium my-2 text-text-secondary dark:text-[#d4d4d4] max-mobile:text-base">杉山 久仁子</p>
            <p className="text-sm text-muted dark:text-[#858585] m-0 italic max-mobile:text-sm">（横浜国立大学教育学部教授）</p>
          </div>
          <div className="glass-card p-6 rounded-lg text-center max-mobile:p-4">
            <Image
              src="/RegularConcertPoster/ynuorch-icon.jpg"
              alt="学生責任者 永田 光佑"
              width={80}
              height={80}
              className="w-20 h-20 rounded-xl object-cover mx-auto mb-4 block border-2 border-accent dark:border-[#4aaaf0] max-mobile:w-[60px] max-mobile:h-[60px] max-mobile:mb-3"
            />
            <span className="block font-semibold text-accent dark:text-[#4aaaf0] text-sm mb-2 max-mobile:text-sm">学生責任者</span>
            <p className="text-lg font-medium my-2 text-text-secondary dark:text-[#d4d4d4] max-mobile:text-base">永田 光佑</p>
          </div>
          <div className="glass-card p-6 rounded-lg text-center max-mobile:p-4">
            <Image
              src="/RegularConcertPoster/ynuorch-icon.jpg"
              alt="コンサートマスター 橋本 大輝"
              width={80}
              height={80}
              className="w-20 h-20 rounded-xl object-cover mx-auto mb-4 block border-2 border-accent dark:border-[#4aaaf0] max-mobile:w-[60px] max-mobile:h-[60px] max-mobile:mb-3"
            />
            <span className="block font-semibold text-accent text-sm mb-2 max-mobile:text-sm">コンサートマスター</span>
            <p className="text-lg font-medium my-2 text-text-secondary max-mobile:text-base">橋本 大輝</p>
          </div>
          <div className="glass-card p-6 rounded-lg text-center max-mobile:p-4">
            <Image
              src="/RegularConcertPoster/ynuorch-icon.jpg"
              alt="技術委員長 森本 湧大"
              width={80}
              height={80}
              className="w-20 h-20 rounded-xl object-cover mx-auto mb-4 block border-2 border-accent dark:border-[#4aaaf0] max-mobile:w-[60px] max-mobile:h-[60px] max-mobile:mb-3"
            />
            <span className="block font-semibold text-accent text-sm mb-2 max-mobile:text-sm">技術委員長</span>
            <p className="text-lg font-medium my-2 text-text-secondary max-mobile:text-base">森本 湧大</p>
          </div>
          <div className="glass-card p-6 rounded-lg text-center max-mobile:p-4">
            <Image
              src="/RegularConcertPoster/ynuorch-icon.jpg"
              alt="定演委員長 中園 拓也"
              width={80}
              height={80}
              className="w-20 h-20 rounded-xl object-cover mx-auto mb-4 block border-2 border-accent dark:border-[#4aaaf0] max-mobile:w-[60px] max-mobile:h-[60px] max-mobile:mb-3"
            />
            <span className="block font-semibold text-accent text-sm mb-2 max-mobile:text-sm">定演委員長</span>
            <p className="text-lg font-medium my-2 text-text-secondary max-mobile:text-base">中園 拓也</p>
          </div>
          <div className="glass-card p-6 rounded-lg text-center max-mobile:p-4">
            <Image
              src="/RegularConcertPoster/ynuorch-icon.jpg"
              alt="運営委員長 鈴木 是雄"
              width={80}
              height={80}
              className="w-20 h-20 rounded-xl object-cover mx-auto mb-4 block border-2 border-accent dark:border-[#4aaaf0] max-mobile:w-[60px] max-mobile:h-[60px] max-mobile:mb-3"
            />
            <span className="block font-semibold text-accent text-sm mb-2 max-mobile:text-sm">運営委員長</span>
            <p className="text-lg font-medium my-2 text-text-secondary max-mobile:text-base">鈴木 是雄</p>
          </div>
          <div className="glass-card p-6 rounded-lg text-center max-mobile:p-4">
            <Image
              src="/RegularConcertPoster/ynuorch-icon.jpg"
              alt="選曲委員長 吉江 ひめ杏"
              width={80}
              height={80}
              className="w-20 h-20 rounded-xl object-cover mx-auto mb-4 block border-2 border-accent dark:border-[#4aaaf0] max-mobile:w-[60px] max-mobile:h-[60px] max-mobile:mb-3"
            />
            <span className="block font-semibold text-accent text-sm mb-2 max-mobile:text-sm">選曲委員長</span>
            <p className="text-lg font-medium my-2 text-text-secondary max-mobile:text-base">吉江 ひめ杏</p>
          </div>
          <div className="glass-card p-6 rounded-lg text-center max-mobile:p-4">
            <Image
              src="/RegularConcertPoster/ynuorch-icon.jpg"
              alt="移動音楽会委員長 朝見 美嘉"
              width={80}
              height={80}
              className="w-20 h-20 rounded-xl object-cover mx-auto mb-4 block border-2 border-accent dark:border-[#4aaaf0] max-mobile:w-[60px] max-mobile:h-[60px] max-mobile:mb-3"
            />
            <span className="block font-semibold text-accent text-sm mb-2 max-mobile:text-sm">移動音楽会委員長</span>
            <p className="text-lg font-medium my-2 text-text-secondary max-mobile:text-base">朝見 美嘉</p>
          </div>
          <div className="glass-card p-6 rounded-lg text-center max-mobile:p-4">
            <Image
              src="/RegularConcertPoster/ynuorch-icon.jpg"
              alt="機関誌委員長 佐野 汐梨"
              width={80}
              height={80}
              className="w-20 h-20 rounded-xl object-cover mx-auto mb-4 block border-2 border-accent dark:border-[#4aaaf0] max-mobile:w-[60px] max-mobile:h-[60px] max-mobile:mb-3"
            />
            <span className="block font-semibold text-accent text-sm mb-2 max-mobile:text-sm">機関誌委員長</span>
            <p className="text-lg font-medium my-2 text-text-secondary max-mobile:text-base">佐野 汐梨</p>
          </div>
          <div className="glass-card p-6 rounded-lg text-center max-mobile:p-4">
            <Image
              src="/RegularConcertPoster/ynuorch-icon.jpg"
              alt="執行委員 今泉 くるみ"
              width={80}
              height={80}
              className="w-20 h-20 rounded-xl object-cover mx-auto mb-4 block border-2 border-accent dark:border-[#4aaaf0] max-mobile:w-[60px] max-mobile:h-[60px] max-mobile:mb-3"
            />
            <span className="block font-semibold text-accent text-sm mb-2 max-mobile:text-sm">執行委員</span>
            <p className="text-lg font-medium my-2 text-text-secondary max-mobile:text-base">今泉 くるみ</p>
          </div>
          <div className="glass-card p-6 rounded-lg text-center max-mobile:p-4">
            <Image
              src="/RegularConcertPoster/ynuorch-icon.jpg"
              alt="執行委員 鈴木 颯太"
              width={80}
              height={80}
              className="w-20 h-20 rounded-xl object-cover mx-auto mb-4 block border-2 border-accent dark:border-[#4aaaf0] max-mobile:w-[60px] max-mobile:h-[60px] max-mobile:mb-3"
            />
            <span className="block font-semibold text-accent text-sm mb-2 max-mobile:text-sm">執行委員</span>
            <p className="text-lg font-medium my-2 text-text-secondary max-mobile:text-base">鈴木 颯太</p>
          </div>
          <div className="glass-card p-6 rounded-lg text-center max-mobile:p-4">
            <Image
              src="/RegularConcertPoster/ynuorch-icon.jpg"
              alt="執行委員 林 貴美"
              width={80}
              height={80}
              className="w-20 h-20 rounded-xl object-cover mx-auto mb-4 block border-2 border-accent dark:border-[#4aaaf0] max-mobile:w-[60px] max-mobile:h-[60px] max-mobile:mb-3"
            />
            <span className="block font-semibold text-accent text-sm mb-2 max-mobile:text-sm">執行委員</span>
            <p className="text-lg font-medium my-2 text-text-secondary max-mobile:text-base">林 貴美</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl mb-4 text-text-secondary dark:text-[#d4d4d4]">トレーナー紹介</h2>
        <p className="text-base leading-loose dark:text-[#cccccc] mb-4">
          横浜国立大学管弦楽団のトレーナー陣をご紹介します。
        </p>
        <Link
          href="/about/trainers"
          className="text-base text-accent dark:text-[#4aaaf0] hover:underline underline-offset-4 transition-colors duration-300 ease"
        >
          トレーナー紹介ページへ →
        </Link>
      </section>
    </div>
  );
}
