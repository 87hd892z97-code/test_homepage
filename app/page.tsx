import Link from 'next/link';
import Image from 'next/image';
import ContactForm from './components/ContactForm';
import UpcomingConcerts from './components/UpcomingConcerts';
import NewsSection from './components/NewsSection';
import HeroSlideshow from './components/HeroSlideshow';

export default function Home() {
  return (
    <>
      <section className="relative h-screen min-h-[600px] w-full flex items-center justify-center -mt-20 max-mobile:h-[60vh] max-mobile:min-h-[400px] max-mobile:-mt-[70px] max-[480px]:h-[50vh] max-[480px]:min-h-[300px] max-[480px]:-mt-[65px]">
        <HeroSlideshow />
        <div className="absolute bottom-[10%] max-mobile:bottom-[5%] max-[480px]:bottom-[3%] left-1/2 -translate-x-1/2 text-center text-white z-10 p-8 max-mobile:p-6 max-[480px]:p-4 rounded-xl max-w-[500px] max-mobile:max-w-[calc(100%-2rem)] max-[480px]:max-w-[calc(100%-1rem)]">
          <h2 className="text-5xl max-mobile:text-4xl max-[480px]:text-3xl mb-4 font-bold text-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">2024シーズン</h2>
          <p className="text-xl max-mobile:text-base max-[480px]:text-sm mb-8 text-shadow-[1px_1px_2px_rgba(0,0,0,0.8)]">音楽で描く、新しい物語</p>
          <Link 
            href="/concerts" 
            className="inline-block bg-accent text-white px-8 py-4 max-mobile:px-5 max-mobile:py-2.5 max-[480px]:px-4 max-[480px]:py-2 rounded-lg no-underline font-normal text-lg max-mobile:text-sm max-[480px]:text-sm transition-all duration-300 ease shadow-[0_4px_15px_rgba(43,108,176,0.3)] hover:bg-accent-dark hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(43,108,176,0.4)]"
          >
            公演スケジュール
          </Link>
        </div>
      </section>

      <div className="max-w-container mx-auto px-4 w-full overflow-x-hidden">
        <section className="bg-gradient-to-br from-gray-light to-gray-lighter border-0 rounded-xl shadow-[0_4px_20px_rgba(43,108,176,0.1)] overflow-hidden transition-transform duration-slow ease mb-4 flex flex-row min-h-[300px] items-stretch gap-0 max-mobile:flex-col max-mobile:w-full max-mobile:max-w-full">
          <div className="p-8 bg-white rounded-lg ml-0 flex flex-col justify-center flex-1 auto w-auto min-w-[280px] max-mobile:p-6 max-mobile:flex-none">
            <h3 className="text-accent text-2xl font-semibold mb-2">次回公演：第125回定期演奏会</h3>
            <p className="text-text-tertiary text-lg font-medium mb-4">マーラー：交響曲第1番「巨人」</p>
            <p className="text-base mb-4">2025年12月21日（日）開場12:45 開演13:30 カルッツかわさき ホール</p>
            <Link 
              href="/concerts" 
              className="inline-block bg-accent text-white px-8 py-3 max-mobile:px-6 max-mobile:py-2.5 max-[480px]:px-4 max-[480px]:py-2 rounded-lg no-underline font-semibold transition-all duration-300 ease hover:bg-accent-dark hover:-translate-y-0.5"
            >
              詳細はこちら
            </Link>
          </div>
        </section>
      </div>

      <section id="contact" className="bg-card rounded-lg p-4 mb-4">
        <div className="max-w-container mx-auto px-4 w-full overflow-x-hidden">
          <h3 className="mt-0">
            <Link href="/contact" className="text-accent no-underline hover:text-accent-dark">お問い合わせ</Link>
          </h3>
          <p className="text-base leading-loose">公演依頼、演奏会について等、当団に関するお問い合わせは以下のフォームよりお願いいたします。</p>

          {/* ContactForm は Client コンポーネントとしてそのまま利用 */}
          <ContactForm />
        </div>
      </section>
    </>
  );
}
