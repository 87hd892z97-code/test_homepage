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
            <h3>次回公演：春の定期演奏会</h3>
            <p>ベートーヴェン：交響曲第7番</p>
            <p>2024年4月15日（月）開演</p>
            <Link href="/concerts" className="more-info-button">
              詳細はこちら
            </Link>
          </div>
        </section>

        <section className="featured-content">
          <div className="upcoming-concerts">
            <h3>近日公演</h3>
            <UpcomingConcerts />
          </div>
          <div className="news">
            <h3>最新ニュース</h3>
            <NewsSection />
          </div>
        </section>

        <section className="highlights">
          <h3>ハイライト</h3>
          <div className="highlights-grid">
            <div className="highlight-card">
              <img src="/images/education.jpg" alt="教育プログラム" />
              <h4>教育プログラム</h4>
              <p>次世代の音楽家を育成</p>
            </div>
            <div className="highlight-card">
              <img src="/images/digital-concert.jpg" alt="デジタルコンサート" />
              <h4>デジタルコンサート</h4>
              <p>オンラインで体験する演奏会</p>
            </div>
          </div>
        </section>
      </div>

      <section id="about" className="section">
        <div className="container">
          {/* 見出しを紹介ページへリンク */}
          <h3>
            <Link href="/about">私たちについて</Link>
          </h3>
          <p>
            300名を超える卒業生を持つ歴史あるオーケストラです。クラシックの名曲から現代曲まで幅広いレパートリーを誇ります。学生同士で編成・運営を行い、演奏技術と協調性を育んでいます。
          </p>
        </div>
      </section>

      <section id="concerts" className="section">
        <div className="container">
          <h3>
            <Link href="/concerts">今後の公演</Link>
          </h3>
          <ul className="concert-list">
            <li>
              <strong>春の定期演奏会</strong> — 2026-04-15 / 大学ホール
            </li>
            <li>
              <strong>学園祭コンサート</strong> — 2026-09-10 / 屋外ステージ
            </li>
            <li>
              <strong>クリスマス・コンサート</strong> — 2026-12-20 / 大学ホール
            </li>
          </ul>
        </div>
      </section>

      <section id="members" className="section">
        <div className="container">
          <h3>
            <Link href="/members">メンバー（一部）</Link>
          </h3>
          <div className="members-grid">
            <div className="member-card">
              <div className="avatar">Vn</div>
              <p className="member-name">山田 太郎 — 第1ヴァイオリン</p>
            </div>
            <div className="member-card">
              <div className="avatar">Vc</div>
              <p className="member-name">鈴木 花子 — チェロ</p>
            </div>
            <div className="member-card">
              <div className="avatar">Pf</div>
              <p className="member-name">田中 次郎 — ピアノ</p>
            </div>
          </div>
        </div>
      </section>

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
