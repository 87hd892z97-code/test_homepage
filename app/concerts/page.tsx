'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Skeleton from '../components/Skeleton';
import { getConcertImagePath } from './past/imageMapping';
import { adaptDbConcertToFrontend } from '../lib/concertAdapter';

// カード専用のスケルトンコンポーネント
function ConcertCardSkeleton() {
  return (
    <div className="glass-card border-0 rounded-xl overflow-hidden transition-transform duration-slow ease flex flex-col hover:-translate-y-[5px]">
      <div className="relative w-full h-[250px] overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[200%_100%] animate-shimmer"></div>
      </div>
      <div className="p-6 bg-white flex flex-col flex-1">
        <div className="h-6 w-4/5 mb-2 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[200%_100%] animate-shimmer rounded"></div>
        <div className="h-5 w-3/5 mb-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[200%_100%] animate-shimmer rounded"></div>
        <div className="h-4 w-full mb-2 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[200%_100%] animate-shimmer rounded"></div>
        <div className="h-4 w-[90%] mb-2 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[200%_100%] animate-shimmer rounded"></div>
        <div className="h-4 w-[70%] mb-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[200%_100%] animate-shimmer rounded"></div>
        <div className="h-10 w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[200%_100%] animate-shimmer rounded-lg"></div>
      </div>
    </div>
  );
}

// 個別のカードコンポーネント
function ConcertCard({ concert, isUpcoming }: { concert: any, isUpcoming: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const concertNumber = concert.title.match(/第(\d+)回/)?.[1] || '';
  const imageSrc = getConcertImagePath(`第${concertNumber}回`, undefined, concert.subtitle) || "/RegularConcertPoster/ynuorch-icon.jpg";

  const Poster = (
    <div className="relative h-full w-full">
      <Image
        src={imageSrc}
        alt={concert.venue}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-slow ease md:group-hover:scale-105"
        priority={concert.id === 1}
      />
      <div className={`absolute top-2 right-2 px-4 py-2 rounded-xl text-sm font-semibold text-white z-10 ${
        isUpcoming ? 'bg-accent' : 'bg-text-tertiary'
      }`}>
        {isUpcoming ? '開催予定' : '開催済み'}
      </div>
    </div>
  );

  const Text = (
    <div className="h-full w-full glass-card flex flex-col p-6 overflow-y-auto">
      <h3 className="text-2xl text-accent m-0 mb-2 font-bold">{concert.title}</h3>
      <p className="text-lg text-muted m-0 mb-4 font-medium">{concert.subtitle}</p>
      <div className="space-y-3 text-sm text-text-secondary">
        <div className="flex justify-between items-start border-b border-border-lighter pb-2">
          <span className="font-semibold min-w-[60px]">日時</span>
          <span className="text-muted text-right">{concert.date} {concert.time || ''}</span>
        </div>
        <div className="flex justify-between items-start border-b border-border-lighter pb-2">
          <span className="font-semibold min-w-[60px]">会場</span>
          <span className="text-muted text-right">{concert.venue}</span>
        </div>
        <div className="flex justify-between items-start border-b border-border-lighter pb-2">
          <span className="font-semibold min-w-[60px]">指揮</span>
          <span className="text-muted text-right">{concert.conductor}</span>
        </div>
        {concert.price && (
          <div className="flex justify-between items-start border-b border-border-lighter pb-2">
            <span className="font-semibold min-w-[60px]">料金</span>
            <span className="text-muted text-right">{concert.price}</span>
          </div>
        )}
      </div>
      <div className="mt-4 space-y-2 text-sm text-muted leading-relaxed">
        {concert.pieces && concert.pieces.length > 0 ? (
          concert.pieces.map((piece: string, index: number) => (
            <p key={index} className={index === 0 ? 'font-medium text-link-blue' : ''}>
              {piece}
            </p>
          ))
        ) : (
          <p>{concert.description}</p>
        )}
      </div>
      {isUpcoming && concert.ticketUrl && (
        <div className="mt-auto pt-4">
          <a
            href={concert.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-accent text-white px-8 py-3 rounded-lg no-underline font-semibold transition-all duration-300 ease hover:bg-accent-dark hover:-translate-y-0.5"
          >
            チケット購入
          </a>
        </div>
      )}
    </div>
  );

  return (
    <div className="group glass-card border-0 rounded-xl transition-transform duration-slow ease md:hover:-translate-y-[5px] flex flex-col">
      <div className="relative w-full aspect-[210/297] overflow-hidden rounded-xl">
        {/* Mobile toggle */}
        <div className="h-full w-full md:hidden">
          {isExpanded ? Text : Poster}
        </div>
        {/* Desktop hover */}
        <div className="hidden md:block h-full w-full">
          <div className="absolute inset-0 transition-opacity duration-300 ease md:group-hover:opacity-0 md:group-hover:pointer-events-none">
            {Poster}
          </div>
          <div className="absolute inset-0 transition-opacity duration-300 ease opacity-0 pointer-events-none md:group-hover:opacity-100 md:group-hover:pointer-events-auto">
            {Text}
          </div>
        </div>
      </div>
      {/* 詳細ボタン - モバイルのみ表示 */}
      <button
        className="hidden max-mobile:block mt-3 w-full p-3 bg-accent text-white border-0 rounded-xl text-sm cursor-pointer transition-colors duration-fast hover:bg-accent-darker"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        {isExpanded ? 'ポスターを見る' : '詳細を見る'}
      </button>
    </div>
  );
}

// ハードコーディングされたデータ（フォールバック用、今後削除予定）
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

export default function ConcertsPage() {
  const [upcomingConcertList, setUpcomingConcertList] = useState<any[]>([]);
  const [pastConcertList, setPastConcertList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/concerts');
      if (!response.ok) {
        console.error('Failed to fetch concerts: HTTP', response.status, response.statusText);
        const errorText = await response.text();
        console.error('Error response:', errorText);
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log('Fetched concerts data:', data);
      
      if (!Array.isArray(data)) {
        console.error('Expected array but got:', typeof data, data);
        setLoading(false);
        return;
      }

      const adaptedConcerts = data.map((concert: any) => {
        try {
          return adaptDbConcertToFrontend(concert);
        } catch (error) {
          console.error('Error adapting concert:', concert, error);
          return null;
        }
      }).filter((concert: any) => concert !== null);

      console.log('Adapted concerts:', adaptedConcerts);

      // データベースのstatusフィールドで分類
      const upcoming = adaptedConcerts
        .filter((c: any) => c.status === 'upcoming')
        .sort((a: any, b: any) => {
          const numA = parseInt(a.title.match(/\d+/)?.[0] || '0');
          const numB = parseInt(b.title.match(/\d+/)?.[0] || '0');
          return numB - numA; // 降順
        });

      const past = adaptedConcerts
        .filter((c: any) => c.status === 'completed')
        .sort((a: any, b: any) => {
          const numA = parseInt(a.title.match(/\d+/)?.[0] || '0');
          const numB = parseInt(b.title.match(/\d+/)?.[0] || '0');
          return numB - numA; // 降順
        });

      console.log('Upcoming concerts:', upcoming);
      console.log('Past concerts:', past);

      setUpcomingConcertList(upcoming);
      setPastConcertList(past.slice(0, 5)); // 最新5件のみ表示
    } catch (error) {
      console.error('Failed to fetch concerts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-container mx-auto px-4 w-full overflow-x-hidden py-12 pt-8 max-w-2xl mx-auto">
        <Skeleton />
      </div>
    );
  }

  return (
    <div className="max-w-container mx-auto px-4 w-full overflow-x-hidden py-12 pt-8">
      <h1 className="text-4xl text-accent mb-8 pb-2 border-b border-accent">演奏会情報</h1>

      <section className="mb-12">
        <h2 className="text-2xl mb-4 text-text-secondary">今後の演奏会</h2>
        <div className="grid grid-cols-2 gap-8 mb-12 max-mobile:grid-cols-1 max-mobile:gap-6">
          {upcomingConcertList.length > 0 ? (
            upcomingConcertList.map((concert) => (
              <ConcertCard key={concert.id} concert={concert} isUpcoming={true} />
            ))
          ) : (
            <p className="text-muted">今後の演奏会予定はありません。</p>
          )}
        </div>
      </section>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6 max-mobile:flex-col max-mobile:items-start max-mobile:gap-4">
          <h2 className="text-2xl mb-4 text-text-secondary m-0">過去の演奏会</h2>
          <Link 
            href="/concerts/past" 
            className="glass-card text-sm px-5 py-2.5 rounded-lg transition-all duration-300 ease no-underline whitespace-nowrap text-accent hover:-translate-y-0.5 hover:bg-accent hover:text-white max-mobile:w-full max-mobile:text-center"
          >
            過去の演奏会一覧を見る →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-8 mb-12 max-mobile:grid-cols-1 max-mobile:gap-6">
          {pastConcertList.length > 0 ? (
            pastConcertList.map((concert) => (
              <ConcertCard key={concert.id} concert={concert} isUpcoming={false} />
            ))
          ) : (
            <p className="text-muted">過去の演奏会情報はありません。</p>
          )}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl mb-4 text-text-secondary">演奏会について</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 mt-8 max-mobile:grid-cols-1 max-mobile:gap-6">
          <div className="glass-card p-8 rounded-xl text-center max-mobile:p-6">
            <h3 className="text-accent mb-4 text-2xl max-mobile:text-lg">チケット予約</h3>
            <p className="text-muted leading-relaxed mb-6 max-mobile:text-sm">演奏会のチケットは事前予約制です。お問い合わせページからご連絡ください。</p>
            <Link 
              href="/contact" 
              className="inline-block glass-card text-accent border border-accent/50 px-6 py-2.5 rounded-lg no-underline font-normal transition-all duration-300 ease hover:bg-accent hover:text-white hover:-translate-y-0.5"
            >
              お問い合わせ
            </Link>
          </div>
          <div className="glass-card p-8 rounded-xl text-center max-mobile:p-6">
            <h3 className="text-accent mb-4 text-2xl max-mobile:text-lg">会場アクセス</h3>
            <p className="text-muted leading-relaxed mb-6 max-mobile:text-sm">各会場へのアクセス方法や駐車場情報は、演奏会案内でご確認ください。</p>
          </div>
        </div>
      </section>
    </div>
  );
}
