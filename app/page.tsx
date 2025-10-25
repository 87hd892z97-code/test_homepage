import Link from 'next/link';
import Image from 'next/image';
import ContactForm from './components/ContactForm';
import UpcomingConcerts from './components/UpcomingConcerts';
import NewsSection from './components/NewsSection';
import HeroSlideshow from './components/HeroSlideshow';

export default function Home() {
  return (
    <>
      <section className="hero-section">
        <HeroSlideshow />
        <div className="hero-content">
          <h2>2024シーズン</h2>
          <p className="lead">音楽で描く、新しい物語</p>
          <Link href="/concerts" className="cta-button">
            公演スケジュール
          </Link>
        </div>
      </section>

      <div className="container">
        <section className="featured-performance">
          <div className="performance-content">
            <h3>次回公演：第125回定期演奏会</h3>
            <p>マーラー：交響曲第1番「巨人」</p>
            <p>2025年12月21日（日）開場12:45 開演13:30 カルッツ川崎 ホール</p>
            <Link href="/concerts" className="more-info-button">
              詳細はこちら
            </Link>
          </div>
        </section>
      </div>

      <section id="contact" className="section">
        <div className="container">
          <h3>
            <Link href="/contact">連絡先</Link>
          </h3>
          <p>見学や公演依頼は以下のアドレスへご連絡ください。</p>
          <p className="contact-email">orchestra@example.edu</p>

          {/* ContactForm は Client コンポーネントとしてそのまま利用 */}
          <ContactForm />
        </div>
      </section>
    </>
  );
}
