import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Skeleton from '../components/Skeleton';
import { getConcertImagePath } from './past/imageMapping';

// カード専用のスケルトンコンポーネント
function ConcertCardSkeleton() {
  return (
    <div className="concert-card">
      <div className="concert-image">
        <div className="skeleton-image" style={{ width: '100%', height: '250px', backgroundColor: '#e9ecef', borderRadius: '8px' }}></div>
      </div>
      <div className="concert-content">
        <div className="skeleton-line" style={{ height: '24px', width: '80%', marginBottom: '8px', backgroundColor: '#e9ecef', borderRadius: '4px' }}></div>
        <div className="skeleton-line" style={{ height: '20px', width: '60%', marginBottom: '16px', backgroundColor: '#e9ecef', borderRadius: '4px' }}></div>
        <div className="skeleton-line" style={{ height: '16px', width: '100%', marginBottom: '8px', backgroundColor: '#e9ecef', borderRadius: '4px' }}></div>
        <div className="skeleton-line" style={{ height: '16px', width: '90%', marginBottom: '8px', backgroundColor: '#e9ecef', borderRadius: '4px' }}></div>
        <div className="skeleton-line" style={{ height: '16px', width: '70%', marginBottom: '16px', backgroundColor: '#e9ecef', borderRadius: '4px' }}></div>
        <div className="skeleton-line" style={{ height: '40px', width: '100%', backgroundColor: '#e9ecef', borderRadius: '8px' }}></div>
      </div>
    </div>
  );
}

// 個別のカードコンポーネント
async function ConcertCard({ concert, isUpcoming }: { concert: any, isUpcoming: boolean }) {
  // 画像の読み込みを待つ
  const concertNumber = concert.title.match(/第(\d+)回/)?.[1] || '';
  let imageSrc = getConcertImagePath(`第${concertNumber}回`, undefined, concert.subtitle) || "/RegularConcertPoster/ynuorch-icon.jpg";
  
  return (
    <div className="concert-card">
      <div className="concert-image">
        <Image
          src={imageSrc}
          alt={concert.venue}
          width={400}
          height={250}
          className="concert-img"
          priority={concert.id === 1} // 最初のカードは優先読み込み
        />
        <div className={`concert-status ${isUpcoming ? 'upcoming' : 'completed'}`}>
          {isUpcoming ? '開催予定' : '開催済み'}
        </div>
      </div>
      <div className="concert-content">
        <h3 className="concert-title">{concert.title}</h3>
        <p className="concert-subtitle">{concert.subtitle}</p>
        <div className="concert-details">
          <div className="detail-item">
            <span className="detail-label">日時</span>
            <span className="detail-value">{concert.date} {concert.time || ''}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">会場</span>
            <span className="detail-value">{concert.venue}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">指揮</span>
            <span className="detail-value">{concert.conductor}</span>
          </div>
          {concert.price && (
            <div className="detail-item">
              <span className="detail-label">料金</span>
              <span className="detail-value">{concert.price}</span>
            </div>
          )}
        </div>
        <p className="concert-description">{concert.description}</p>
        {isUpcoming && (
          <div className="concert-actions">
            {concert.id === 1 ? (
              <a 
                href="https://teket.jp/4833/51547" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary"
              >
                チケット購入
              </a>
            ) : (
              <Link href="/contact" className="btn-primary">
                お問い合わせ・予約
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const upcomingConcerts = [
  {
    id: 1,
    title: '第125回定期演奏会',
    subtitle: 'マーラー：交響曲第1番「巨人」',
    date: '2025年12月21日（日）',
    time: '開場12:45 開演13:30',
    venue: 'カルッツかわさき ホール',
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
  },
  {
    id: 9,
    title: '第119回定期演奏会',
    subtitle: 'ブラームス：交響曲第4番',
    date: '2022年12月25日',
    venue: 'よこすか芸術劇場 大劇場',
    conductor: '指揮：大河内 雅彦',
    status: 'completed',
    description: 'ブラームスの交響曲第4番を中心としたプログラム。リストの交響詩「レ・プレリュード」、ヒンデミットの「画家マティス」も演奏。'
  },
  {
    id: 10,
    title: '第118回定期演奏会',
    subtitle: 'ドヴォルザーク：交響曲第9番「新世界より」',
    date: '2022年5月21日',
    venue: '鎌倉芸術館 大ホール',
    conductor: '指揮：海老原 光',
    status: 'completed',
    description: 'ドヴォルザークの交響曲第9番「新世界より」を中心としたプログラム。メンデルスゾーンの序曲「美しいメルジーネの物語」、チャイコフスキーの幻想序曲「ロメオとジュリエット」も演奏。'
  },
  {
    id: 11,
    title: '第117回定期演奏会',
    subtitle: 'シベリウス：交響曲第2番',
    date: '2021年12月25日',
    venue: 'なかのZERO 大ホール',
    conductor: '指揮：和田 一樹',
    status: 'completed',
    description: 'シベリウスの交響曲第2番を中心としたプログラム。ムソルグスキーの交響詩「禿山の一夜」、ドヴォルザークの交響詩「真昼の魔女」も演奏。'
  },
  {
    id: 12,
    title: '第116回定期演奏会',
    subtitle: 'ブラームス：交響曲第2番',
    date: '2021年5月15日',
    venue: 'よこすか芸術劇場 大劇場',
    conductor: '指揮：田中 健',
    status: 'completed',
    description: 'ブラームスの交響曲第2番を中心としたプログラム。スッペの軽騎兵序曲、ボロディンの交響曲第2番も演奏。'
  },
  {
    id: 13,
    title: '第113回定期演奏会',
    subtitle: 'マーラー：交響曲第1番「巨人」',
    date: '2019年12月',
    venue: '横浜みなとみらいホール 大ホール',
    conductor: '指揮：泉 翔士',
    status: 'completed',
    description: 'マーラーの交響曲第1番「巨人」を中心としたプログラム。モーツァルトの歌劇「魔笛」序曲、シベリウスの「カレリア」組曲も演奏。'
  }
];

// 今後の演奏会リスト
function UpcomingConcertsList() {
  return (
    <div className="concerts-grid">
      {upcomingConcerts.map((concert) => (
        <Suspense key={concert.id} fallback={<ConcertCardSkeleton />}>
          <ConcertCard concert={concert} isUpcoming={true} />
        </Suspense>
      ))}
    </div>
  );
}

// 過去の演奏会リスト
function PastConcertsList() {
  return (
    <div className="concerts-grid">
      {pastConcerts.map((concert) => (
        <Suspense key={concert.id} fallback={<ConcertCardSkeleton />}>
          <ConcertCard concert={concert} isUpcoming={false} />
        </Suspense>
      ))}
    </div>
  );
}

export default function ConcertsPage() {
  return (
    <div className="container page-content">
      <h1>演奏会情報</h1>

        <section className="upcoming-concerts">
          <h2>今後の演奏会</h2>
          <UpcomingConcertsList />
        </section>

        <section className="past-concerts">
          <div className="past-concerts-header-wrapper">
            <h2>過去の演奏会</h2>
            <Link href="/concerts/past" className="btn-secondary past-concerts-link">
              過去の演奏会一覧を見る →
            </Link>
          </div>
          <PastConcertsList />
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
  );
}
