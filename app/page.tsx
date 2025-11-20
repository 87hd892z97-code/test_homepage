import Link from 'next/link';
import Image from 'next/image';
import ContactForm from './components/ContactForm';
import UpcomingConcerts from './components/UpcomingConcerts';
import NewsSection from './components/NewsSection';
import HeroSlideshow from './components/HeroSlideshow';

export default function Home() {
  return (
    <>
      <section className="relative h-screen min-h-[600px] w-full flex items-center justify-center -mt-20 max-mobile:h-[60vh] max-mobile:min-h-[400px] max-mobile:-mt-[70px] max-[480px]:h-[50vh] max-[480px]:min-h-[300px] max-[480px]:-mt-[65px] overflow-hidden">
        <HeroSlideshow />
        <div className="absolute inset-x-0 bottom-[7%] max-mobile:bottom-[5%] max-[480px]:bottom-[3%] px-4 max-mobile:px-3 text-white z-10">
          <div className="w-full max-w-[760px] mx-auto p-12 max-mobile:p-8 max-[480px]:p-6 rounded-[32px] glass-effect-dark shadow-[0_30px_90px_rgba(0,0,0,0.45)] border border-white/15 flex flex-col gap-8">
            <div className="flex items-center justify-between flex-wrap gap-3 text-xs tracking-[0.35em] uppercase text-white/75">
              <div className="flex items-center gap-3">
                <span className="h-px w-12 bg-white/60 max-mobile:hidden" />
                Upcoming Concert
              </div>
              <span className="tracking-[0.4em] text-white/60 max-mobile:w-full max-mobile:text-right">Season 2025</span>
            </div>

            <div className="space-y-2">
              <span className="text-sm text-white/80 block">2025年12月21日（日）</span>
              <h2 className="text-5xl max-mobile:text-4xl max-[480px]:text-3xl font-semibold leading-tight">第125回定期演奏会</h2>
              <p className="text-lg max-mobile:text-base text-white/90 border-l border-white/30 pl-4 py-1">
                マーラー：交響曲第1番「巨人」 / 指揮 永峰大輔
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm text-white/85">
              <div className="relative pl-6">
                <span className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-1">会場</p>
                <p className="font-semibold whitespace-nowrap">カルッツかわさき ホール</p>
              </div>
              <div className="relative pl-6">
                <span className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-1">開演</p>
                <p className="font-semibold">13:30</p>
              </div>
              <div className="relative pl-6">
                <span className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-1">開場</p>
                <p className="font-semibold">12:45</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link 
                href="/concerts" 
                className="flex-1 min-w-[220px] text-center bg-accent text-white px-10 py-4 rounded-2xl no-underline text-base font-semibold tracking-wide transition-all duration-300 ease shadow-[0_18px_35px_rgba(43,108,176,0.5)] hover:bg-accent-dark hover:-translate-y-1"
              >
                詳細・チケット情報
              </Link>
              <Link 
                href="/contact" 
                className="flex-1 min-w-[220px] text-center bg-transparent/15 border border-white/40 text-white px-10 py-4 rounded-2xl no-underline text-base font-semibold tracking-wide transition-all duration-300 ease hover:bg-white/10 hover:border-white/70"
              >
                お問い合わせ
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-container mx-auto px-4 w-full overflow-x-hidden">
        <section className="glass-card border-0 rounded-xl overflow-hidden transition-transform duration-slow ease mb-4 flex flex-row min-h-[300px] items-stretch gap-0 max-mobile:flex-col max-mobile:w-full max-mobile:max-w-full">
          <div className="p-8 rounded-lg ml-0 flex flex-col justify-center flex-1 auto w-auto min-w-[280px] max-mobile:p-6 max-mobile:flex-none">
            <h3 className="text-accent dark:text-[#4fc3f7] text-2xl font-semibold mb-2">次回公演：第125回定期演奏会</h3>
            <p className="text-text-tertiary dark:text-[#9cdcfe] text-lg font-medium mb-4">マーラー：交響曲第1番「巨人」</p>
            <p className="text-base dark:text-[#cccccc] mb-4">2025年12月21日（日）開場12:45 開演13:30 カルッツかわさき ホール</p>
            <Link 
              href="/concerts" 
              className="inline-block bg-accent text-white px-8 py-3 max-mobile:px-6 max-mobile:py-2.5 max-[480px]:px-4 max-[480px]:py-2 rounded-lg no-underline font-semibold transition-all duration-300 ease hover:bg-accent-dark hover:-translate-y-0.5"
            >
              詳細はこちら
            </Link>
          </div>
        </section>
      </div>

      <section id="contact" className="bg-card dark:bg-[#252526] rounded-lg p-4 mb-4 transition-colors duration-300">
        <div className="max-w-container mx-auto px-4 w-full overflow-x-hidden">
          <h3 className="mt-0">
            <Link href="/contact" className="text-accent dark:text-[#4fc3f7] no-underline hover:text-accent-dark dark:hover:text-[#81d4fa]">お問い合わせ</Link>
          </h3>
          <p className="text-base leading-loose dark:text-[#cccccc]">公演依頼、演奏会について等、当団に関するお問い合わせは以下のフォームよりお願いいたします。</p>

          {/* ContactForm は Client コンポーネントとしてそのまま利用 */}
          <ContactForm />
        </div>
      </section>
    </>
  );
}