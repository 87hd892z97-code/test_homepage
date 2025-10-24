import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import ContactForm from './components/ContactForm';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <h2 className="hero-title">響きあう、学びと音楽</h2>
          <p className="hero-lead">
            私たちは大学で活動する学生オーケストラです。定期演奏会や学内イベントでの演奏を通じて、音楽の魅力を伝えます。
          </p>
        </div>
      </section>

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
