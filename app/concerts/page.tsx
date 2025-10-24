import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Skeleton from '../components/Skeleton';

const upcomingConcerts = [
  {
    id: 1,
    title: '第125回定期演奏会',
    subtitle: 'マーラー：交響曲第1番「巨人」',
    date: '2025年12月21日（日）',
    time: '開場12:45 開演13:30',
    venue: 'カルッツ川崎 ホール',
    conductor: '永峰大輔',
    price: '前売り券：800円 当日券：1,000円',
    status: 'upcoming',
    description: 'マーラーの交響曲第1番を中心としたプログラム。ヴェルディの「運命の力」序曲、J.シュトラウスⅡ世の「ウィーンの森の物語」も演奏。'
  }
];

const pastConcerts = [
  {
    id: 4,
    title: '第124回定期演奏会',
    subtitle: 'シューマン：交響曲第3番「ライン」',
    date: '2025年5月2日（金）',
    venue: 'きゅりあん(品川区立総合区民会館)',
    conductor: '指揮：栗原翼',
    status: 'completed',
    description: 'シューマンの交響曲第3番「ライン」を中心としたプログラム。シベリウスの「フィンランディア」、ビゼーの「カルメン」組曲も演奏。'
  },
  {
    id: 5,
    title: '第123回定期演奏会',
    subtitle: 'チャイコフスキー：交響曲第6番「悲愴」',
    date: '2024年12月29日（日）',
    venue: '横浜みなとみらいホール 大ホール',
    conductor: '指揮：佐々木新平',
    status: 'completed',
    description: 'チャイコフスキーの交響曲第6番「悲愴」を中心としたプログラム。イタリア奇想曲、バレエ組曲「くるみ割り人形」も演奏。'
  },
  {
    id: 6,
    title: '第122回定期演奏会',
    subtitle: 'ショスタコーヴィチ：交響曲第5番',
    date: '2024年5月25日',
    venue: '大田区民ホール・アプリコ 大ホール',
    conductor: '指揮：和田 一樹',
    status: 'completed',
    description: 'ショスタコーヴィチの交響曲第5番を中心としたプログラム。ボロディンの「中央アジアの草原にて」、楽劇「イーゴリ公」より韃靼人の踊りも演奏。'
  },
  {
    id: 7,
    title: '第121回定期演奏会',
    subtitle: 'チャイコフスキー：交響曲第5番',
    date: '2023年12月24日',
    venue: 'よこすか芸術劇場',
    conductor: '指揮：佐々木 新平',
    status: 'completed',
    description: 'チャイコフスキーの交響曲第5番を中心としたプログラム。J.シュトラウスⅡ世の「こうもり」序曲、ハチャトゥリアンの組曲「仮面舞踏会」も演奏。'
  },
  {
    id: 8,
    title: '第120回定期演奏会',
    subtitle: 'サン＝サーンス：交響曲第3番「オルガン付き」',
    date: '2023年5月6日',
    venue: '横浜みなとみらいホール 大ホール',
    conductor: '指揮：和田 一樹',
    status: 'completed',
    description: 'サン＝サーンスの交響曲第3番「オルガン付き」を中心としたプログラム。ワーグナーの「ニュルンベルクのマイスタージンガー」より第一幕への前奏曲、シューベルトの交響曲第7番「未完成」も演奏。'
  }
];

// 非同期コンポーネントで遅延をシミュレート
async function UpcomingConcertsList() {
  await new Promise((r) => setTimeout(r, 500));
  return (
    <div className="concerts-grid">
      {upcomingConcerts.map((concert) => (
        <div key={concert.id} className="concert-card upcoming">
          <div className="concert-image">
            <Image
              src="/MInatoMIraiHall1.jpg"
              alt={concert.venue}
              width={400}
              height={250}
              className="concert-img"
            />
            <div className="concert-status upcoming">開催予定</div>
          </div>
          <div className="concert-content">
            <h3 className="concert-title">{concert.title}</h3>
            <p className="concert-subtitle">{concert.subtitle}</p>
            <div className="concert-details">
              <div className="detail-item">
                <span className="detail-label">日時</span>
                <span className="detail-value">{concert.date} {concert.time}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">会場</span>
                <span className="detail-value">{concert.venue}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">指揮</span>
                <span className="detail-value">{concert.conductor}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">料金</span>
                <span className="detail-value">{concert.price}</span>
              </div>
            </div>
            <p className="concert-description">{concert.description}</p>
            <div className="concert-actions">
              <Link href="/contact" className="btn-primary">
                お問い合わせ・予約
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

async function PastConcertsList() {
  await new Promise((r) => setTimeout(r, 300));
  return (
    <div className="concerts-grid">
      {pastConcerts.map((concert) => (
        <div key={concert.id} className="concert-card past">
          <div className="concert-image">
            <Image
              src="/ApurikoHall.jpg"
              alt={concert.venue}
              width={400}
              height={250}
              className="concert-img"
            />
            <div className="concert-status completed">開催済み</div>
          </div>
          <div className="concert-content">
            <h3 className="concert-title">{concert.title}</h3>
            <p className="concert-subtitle">{concert.subtitle}</p>
            <div className="concert-details">
              <div className="detail-item">
                <span className="detail-label">日時</span>
                <span className="detail-value">{concert.date}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">会場</span>
                <span className="detail-value">{concert.venue}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">指揮</span>
                <span className="detail-value">{concert.conductor}</span>
              </div>
            </div>
            <p className="concert-description">{concert.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ConcertsPage() {
  return (
    <div className="page-content">
      <div className="container">
        <h1>演奏会情報</h1>
        
        <section className="concerts-intro">
          <p className="lead">
            横浜国立大学管弦楽団の演奏会情報をご案内します。学生ならではの情熱的な演奏をお楽しみください。
          </p>
        </section>

        <section className="upcoming-concerts">
          <h2>今後の演奏会</h2>
          <Suspense fallback={<Skeleton lines={3} />}>
            <UpcomingConcertsList />
          </Suspense>
        </section>

        <section className="past-concerts">
          <h2>過去の演奏会</h2>
          <Suspense fallback={<Skeleton lines={2} />}>
            <PastConcertsList />
          </Suspense>
        </section>

        <section className="concert-info">
          <h2>演奏会について</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>チケット予約</h3>
              <p>演奏会のチケットは事前予約制です。お問い合わせページからご連絡ください。</p>
              <Link href="/contact" className="btn-secondary">お問い合わせ</Link>
            </div>
            <div className="info-card">
              <h3>会場アクセス</h3>
              <p>各会場へのアクセス方法や駐車場情報は、演奏会案内でご確認ください。</p>
            </div>
            <div className="info-card">
              <h3>演奏会プログラム</h3>
              <p>詳細なプログラムは演奏会の2週間前に発表いたします。</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
