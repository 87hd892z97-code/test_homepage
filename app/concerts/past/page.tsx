'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// データファイルをインポート（将来的には別ファイルに移動可能）
import { getAllPastConcerts } from './data';
import { getConcertImagePath } from './imageMapping';
import { adaptDbConcertToPastConcert } from '../../lib/concertAdapter';


// 曲目から楽器を特定する関数
function getInstrumentFromPieces(pieces?: string[]): string {
  if (!pieces) return '';
  
  const piecesStr = pieces.join(' ');
  
  if (piecesStr.includes('ピアノ協奏曲')) return 'ピアノ';
  if (piecesStr.includes('ヴァイオリン協奏曲')) return 'ヴァイオリン';
  if (piecesStr.includes('チェロ協奏曲')) return 'チェロ';
  if (piecesStr.includes('チェロ独奏')) return 'チェロ';
  if (piecesStr.includes('ホルン協奏曲')) return 'ホルン';
  if (piecesStr.includes('オルガン付き') || piecesStr.includes('オルガン')) return 'オルガン';
  if (piecesStr.includes('オーボエ協奏曲')) return 'オーボエ';
  if (piecesStr.includes('クラリネット協奏曲')) return 'クラリネット';
  
  return '';
}

// 曲目をソートする関数（序曲が1つの場合は最上部、オルガン付きを最下部、交響曲をその上）
function sortPieces(pieces: string[]): string[] {
  const overtures = pieces.filter(piece => piece.includes('序曲'));
  const hasSingleOverture = overtures.length === 1;
  const singleOverturePiece = hasSingleOverture ? overtures[0] : null;
  
  return pieces
    .map((piece, index) => ({ piece, originalIndex: index }))
    .sort((a, b) => {
      const aIsOrgan = a.piece.includes('オルガン');
      const bIsOrgan = b.piece.includes('オルガン');
      const aIsSymphony = a.piece.includes('交響曲');
      const bIsSymphony = b.piece.includes('交響曲');
      const aIsOverture = a.piece.includes('序曲');
      const bIsOverture = b.piece.includes('序曲');
      
      // 序曲が1つのみの場合は最上部
      if (hasSingleOverture) {
        if (a.piece === singleOverturePiece) return -1;
        if (b.piece === singleOverturePiece) return 1;
      }
      
      // オルガン付きは最下部
      if (aIsOrgan && !bIsOrgan) return 1;
      if (!aIsOrgan && bIsOrgan) return -1;
      
      // オルガン付き以外の交響曲はその上
      if (!aIsOrgan && aIsSymphony && !bIsSymphony) return 1;
      if (!bIsOrgan && !aIsSymphony && bIsSymphony) return -1;
      
      // 同じカテゴリは元の順序を維持
      return a.originalIndex - b.originalIndex;
    })
    .map(({ piece }) => piece);
}

// 過去の演奏会カードコンポーネント
function PastConcertCard({ concert, date, venue, conductor, pieces, cancelled, chorus, soprano, soprano2, mezzoSoprano, alto, tenor, bassBaritone, soloist, onImageClick }: {
  concert: string;
  date: string;
  venue: string;
  conductor?: string;
  pieces?: string[];
  cancelled?: boolean;
  chorus?: string;
  soprano?: string;
  soprano2?: string;
  mezzoSoprano?: string;
  alto?: string;
  tenor?: string;
  bassBaritone?: string;
  soloist?: string;
  onImageClick?: (imagePath: string) => void;
}) {
  const imagePath = getConcertImagePath(concert, pieces, undefined);
  
  return (
    <div className={`bg-card rounded-lg p-6 shadow-sm transition-shadow duration-slow ease flex-1 flex flex-col h-full hover:shadow-lg max-mobile:p-5 max-[480px]:p-4 ${
      cancelled ? 'opacity-60 relative' : ''
    }`}>
      {cancelled && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0, 0, 0, 0.03) 10px, rgba(0, 0, 0, 0.03) 20px)'
          }}
        />
      )}
      <div className="border-b border-border-lighter pb-3 mb-4">
        <h3 className="text-2xl font-medium text-accent m-0 max-mobile:text-lg max-[480px]:text-base" style={{ letterSpacing: '-0.01em' }}>
          {concert}定期演奏会 {cancelled && '(中止)'}
        </h3>
      </div>
      {imagePath && (
        <div 
          className="relative w-full h-[200px] mb-4 overflow-hidden rounded-lg cursor-pointer"
          onClick={() => onImageClick?.(imagePath)}
        >
          <Image
            src={imagePath}
            alt={`${concert}定期演奏会の画像`}
            width={400}
            height={300}
            className="w-full h-full object-cover transition-transform duration-slow ease hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity duration-slow ease hover:opacity-100">
            <span className="text-white text-sm font-medium">画像をクリック</span>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex flex-col gap-2">
          <p className="font-medium text-text-secondary text-base m-0 max-mobile:text-sm">{date}</p>
          <p className="text-muted text-sm m-0 max-mobile:text-sm">{venue}</p>
          {conductor && (
            <p className="text-accent text-sm font-medium m-0">指揮：{conductor}</p>
          )}
          {chorus && (
            <p className="text-accent text-sm font-medium m-0">合唱：{chorus}</p>
          )}
          {soprano && (
            <p className="text-accent text-sm font-medium m-0">ソプラノ：{soprano}</p>
          )}
          {soprano2 && (
            <p className="text-accent text-sm font-medium m-0">ソプラノ：{soprano2}</p>
          )}
          {mezzoSoprano && (
            <p className="text-accent text-sm font-medium m-0">メゾソプラノ：{mezzoSoprano}</p>
          )}
          {alto && (
            <p className="text-accent text-sm font-medium m-0">アルト：{alto}</p>
          )}
          {tenor && (
            <p className="text-accent text-sm font-medium m-0">テノール：{tenor}</p>
          )}
          {bassBaritone && (
            <p className="text-accent text-sm font-medium m-0">バス・バリトン：{bassBaritone}</p>
          )}
          {soloist && (
            <div className="m-0">
              {(() => {
                // soloistに既に楽器名が含まれている場合はそのまま表示
                if (soloist.includes('、') || soloist.includes('独奏：') || soloist.includes('：')) {
                  return soloist.split('、').map((item, index) => (
                    <div key={index} className="text-accent text-sm font-medium m-0">{item}</div>
                  ));
                }
                
                const instrument = getInstrumentFromPieces(pieces);
                if (instrument) {
                  if (instrument === 'オルガン') {
                    return <div className="text-accent text-sm font-medium m-0">オルガン：{soloist}</div>;
                  }
                  return <div className="text-accent text-sm font-medium m-0">{instrument}独奏：{soloist}</div>;
                }
                return <div className="text-accent text-sm font-medium m-0">独奏：{soloist}</div>;
              })()}
            </div>
          )}
        </div>
        {pieces && pieces.length > 0 && (
          <div className="mt-2">
            <p className="font-medium mb-2 text-text-secondary text-sm">曲目：</p>
            <ul className="list-none p-0 m-0">
              {sortPieces(pieces).map((piece, index) => (
                <li key={`${piece}-${index}`} className="text-muted text-sm leading-loose pl-0 relative max-mobile:text-xs" style={{ paddingLeft: '0' }}>
                  <span className="absolute -left-3">・</span>
                  {piece}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PastConcertsPage() {
  const [expandedGroups, setExpandedGroups] = useState<Record<number, boolean>>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const hasInitialized = useRef(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Add class to body when image modal is open to keep header visible
  useEffect(() => {
    if (selectedImage) {
      document.body.classList.add('image-modal-open');
    } else {
      document.body.classList.remove('image-modal-open');
    }
    return () => {
      document.body.classList.remove('image-modal-open');
    };
  }, [selectedImage]);
  
  // グループを展開してトップへスクロール
  const handleGroupClick = (decade: number) => {
    setExpandedGroups(prev => {
      const wasExpanded = prev[decade] ?? false;
      const newState = { ...prev, [decade]: !wasExpanded };
      
      // 展開する時だけスクロール（折りたたむ時はスクロールしない）
      if (!wasExpanded) {
        setTimeout(() => {
          const elementId = `decade-${decade}`;
          const element = document.getElementById(elementId);
          if (element) {
            // ヘッダーの高さとページコンテンツの余白を考慮してオフセット
            const header = document.querySelector('.site-header');
            const headerHeight = header ? header.getBoundingClientRect().height : 80;
            
            // ページコンテンツのh1とheaderの余白に合わせる（3rem = 48px）
            const contentSpacing = 48;
            
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerHeight - contentSpacing;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 100);
      }
      
      return newState;
    });
  };
  

  // 全演奏会データをデータベースから取得
  const [allConcerts, setAllConcerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConcerts();
  }, []);

  const fetchConcerts = async () => {
    try {
      const response = await fetch('/api/concerts/past');
      if (response.ok) {
        const data = await response.json();
        const adaptedConcerts = data.map((concert: any) => adaptDbConcertToPastConcert(concert));
        setAllConcerts(adaptedConcerts.reverse());
      }
    } catch (error) {
      console.error('Failed to fetch concerts:', error);
      // フォールバック: ハードコーディングされたデータを使用
      setAllConcerts(getAllPastConcerts().reverse());
    } finally {
      setLoading(false);
    }
  };

  // 10回ごとにグループ化（第1回から開始）
  const concertsByDecade = useMemo(() => {
    return allConcerts.reduce((acc, concert, index) => {
      const groupIndex = Math.floor(index / 10);
      if (!acc[groupIndex]) {
        acc[groupIndex] = [];
      }
      acc[groupIndex].push(concert);
      return acc;
    }, {} as Record<number, typeof allConcerts>);
  }, [allConcerts]);

  const decades = useMemo(() => {
    return Object.keys(concertsByDecade).map(Number).sort((a, b) => b - a);
  }, [concertsByDecade]);

  // 初期状態で最初のグループ（最新）を展開
  useEffect(() => {
    if (!hasInitialized.current && decades.length > 0) {
      setExpandedGroups({ [decades[0]]: true });
      hasInitialized.current = true;
    }
  }, [decades]);

  // 第○回～第○回の範囲を取得する関数
  const getConcertRange = (concerts: typeof allConcerts) => {
    if (concerts.length === 0) return '';
    // reverse()しているので、第1回が最初、第124回が最後
    const firstConcert = concerts[0].concert.match(/\d+/)?.[0] || '';
    const lastConcert = concerts[concerts.length - 1].concert.match(/\d+/)?.[0] || '';
    // 日付の降順（新しいものが先）なので、ラベルも降順に表示
    return `第${lastConcert}回～第${firstConcert}回`;
  };

  // 検索フィルタリング
  const filteredConcertsByDecade = useMemo(() => {
    if (!searchQuery) return concertsByDecade;
    
    const filtered: Record<number, typeof allConcerts> = {};
    
    Object.keys(concertsByDecade).forEach((decadeKey) => {
      const decade = Number(decadeKey);
      const concerts = concertsByDecade[decade];
      
      const filteredConcerts = concerts.filter((concert: typeof allConcerts[0]) => {
        const query = searchQuery.toLowerCase();
        const concertNumber = concert.concert.match(/\d+/)?.[0] || '';
        const date = concert.date.toLowerCase();
        const venue = concert.venue.toLowerCase();
        const conductor = concert.conductor?.toLowerCase() || '';
        const pieces = concert.pieces?.join(' ').toLowerCase() || '';
        
        return (
          concertNumber.includes(query) ||
          date.includes(query) ||
          venue.includes(query) ||
          conductor.includes(query) ||
          pieces.includes(query)
        );
      });
      
      if (filteredConcerts.length > 0) {
        filtered[decade] = filteredConcerts;
      }
    });
    
    return filtered;
  }, [concertsByDecade, searchQuery]);

  const filteredDecades = useMemo(() => {
    return Object.keys(filteredConcertsByDecade).map(Number).sort((a, b) => b - a);
  }, [filteredConcertsByDecade]);

  // スケルトンコンポーネント
  const SkeletonCard = () => (
    <div className="bg-card rounded-lg p-6 shadow-sm transition-shadow duration-slow ease flex-1 flex flex-col h-full">
      <div className="border-b border-border-lighter pb-3 mb-4">
        <div className="h-6 w-4/5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[200%_100%] animate-shimmer rounded"></div>
      </div>
      <div className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[200%_100%] animate-shimmer h-[200px] rounded-lg mb-3"></div>
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex flex-col gap-2">
          <div className="h-4 w-[70%] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[200%_100%] animate-shimmer rounded"></div>
          <div className="h-4 w-[90%] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[200%_100%] animate-shimmer rounded"></div>
          <div className="h-4 w-[60%] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[200%_100%] animate-shimmer rounded"></div>
        </div>
        <div className="mt-2">
          <div className="h-4 w-[50px] mb-2 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[200%_100%] animate-shimmer rounded"></div>
          <ul className="list-none p-0 m-0">
            <li><div className="h-3.5 w-full mb-1 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[200%_100%] animate-shimmer rounded"></div></li>
            <li><div className="h-3.5 w-[95%] mb-1 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[200%_100%] animate-shimmer rounded"></div></li>
            <li><div className="h-3.5 w-[85%] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[200%_100%] animate-shimmer rounded"></div></li>
          </ul>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="max-w-container mx-auto px-4 w-full overflow-x-hidden py-12 pt-8 max-w-2xl mx-auto">
        <div className="max-w-[1600px] mx-auto p-8 grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-6">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed top-[100px] right-4 z-[100] pointer-events-none max-mobile:hidden">
        <aside className={`sticky top-[100px] w-[280px] bg-card rounded-lg p-6 h-fit max-h-[calc(100vh-120px)] overflow-y-auto overflow-x-hidden transition-opacity duration-fast shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex flex-col min-h-[200px] pointer-events-auto ${
          document.body.classList.contains('sidebar-hidden') ? 'opacity-0 pointer-events-none' : ''
        }`}>
          <h2 className="text-xl font-semibold text-accent mb-4 pb-2 border-b-2 border-accent">演奏会グループ</h2>
          <input
            type="text"
            placeholder="演奏会を検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 mb-4 text-sm border border-border-lighter rounded-md outline-none transition-colors duration-fast focus:border-accent"
          />
          <div className="flex flex-col gap-2">
            {(searchQuery ? filteredDecades : decades).map(decade => {
              const concerts = [...(searchQuery ? filteredConcertsByDecade[decade] : concertsByDecade[decade])].reverse();
              const isExpanded = expandedGroups[decade] ?? false;
              
              return (
                <button
                  key={decade}
                  onClick={() => handleGroupClick(decade)}
                  className={`flex justify-between items-center px-4 py-3 bg-transparent border border-border rounded-lg text-text-secondary text-sm cursor-pointer transition-all duration-fast ease text-left w-full ${
                    isExpanded 
                      ? 'text-accent border-accent translate-x-2 font-semibold bg-accent/12 shadow-[0_6px_16px_rgba(43,108,176,0.2)]' 
                      : 'hover:border-accent hover:translate-x-1 hover:bg-accent/8 hover:shadow-[0_4px_12px_rgba(43,108,176,0.15)]'
                  }`}
                >
                  <span>{getConcertRange(concerts)}</span>
                  <span className="text-xl font-semibold flex-shrink-0">{isExpanded ? '−' : '+'}</span>
                </button>
              );
            })}
          </div>
        </aside>
      </div>
      
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-[1000] animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute -top-10 max-mobile:-top-12 right-0 max-mobile:right-4 bg-transparent border-0 text-white text-3xl cursor-pointer w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-slow ease hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <Image
              src={selectedImage}
              alt="拡大画像"
              width={1200}
              height={900}
              className="max-w-full max-h-[90vh] object-contain"
              unoptimized
            />
          </div>
        </div>
      )}
      
      <div className="max-w-container mx-auto px-4 w-full overflow-x-hidden py-12 pt-8 max-w-2xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl text-accent mb-8 pb-2 border-b border-accent max-mobile:text-3xl">過去の演奏会記録</h1>
          <p className="mt-2 text-muted text-lg max-mobile:text-sm">
            横浜国立大学管弦楽団がこれまでに開催してきた定期演奏会の記録です。
          </p>
        </div>

        <div className="flex flex-col gap-12 flex-1 max-mobile:gap-6">
          {(searchQuery ? filteredDecades : decades).map(decade => {
          const concerts = [...(searchQuery ? filteredConcertsByDecade[decade] : concertsByDecade[decade])].reverse();
          const isExpanded = expandedGroups[decade] ?? false;
          
          return (
            <div key={decade} id={`decade-${decade}`} className="flex flex-col gap-6 transition-all duration-slow ease max-mobile:gap-3">
              <button
                onClick={() => handleGroupClick(decade)}
                className="flex justify-between items-center bg-transparent border-0 cursor-pointer p-0 text-left w-full hover:opacity-80 focus:outline-2 focus:outline-accent focus:outline-offset-2 focus:rounded"
              >
                <h2 className="text-3xl font-medium text-accent border-b-2 border-accent pb-2 mb-0 max-mobile:text-xl max-mobile:pb-1 max-[480px]:text-base">{getConcertRange(concerts)}</h2>
                <span className="text-3xl font-semibold text-accent ml-4 flex-shrink-0 max-mobile:text-xl max-[480px]:text-base">{isExpanded ? '−' : '+'}</span>
              </button>
              <div className={`grid grid-cols-2 gap-6 mb-12 overflow-hidden max-w-container mx-auto max-mobile:grid-cols-1 max-mobile:gap-5 max-mobile:p-0 ${
                isExpanded 
                  ? 'max-h-[100000px] mb-12 overflow-visible' 
                  : 'max-h-0 mb-0 overflow-hidden'
              }`}
              style={{
                transition: 'max-height 0.4s ease-out, margin-bottom 0.3s ease-out'
              }}>
                {concerts.map((item, index) => (
                  <div
                    key={`decade-${decade}-${index}`}
                    className={`opacity-0 -translate-y-2.5 transition-all duration-slow ease-out flex ${
                      isExpanded ? 'opacity-100 translate-y-0' : ''
                    }`}
                    style={{
                      transitionDelay: `${index * 30}ms`
                    }}
                  >
                    <PastConcertCard
                      concert={item.concert}
                      date={item.date}
                      venue={item.venue}
                      conductor={item.conductor}
                      pieces={item.pieces}
                      cancelled={item.cancelled}
                      chorus={item.chorus}
                      soprano={item.soprano}
                      soprano2={item.soprano2}
                      mezzoSoprano={item.mezzoSoprano}
                      alto={item.alto}
                      tenor={item.tenor}
                      bassBaritone={item.bassBaritone}
                      soloist={item.soloist}
                      onImageClick={setSelectedImage}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/concerts" 
            className="inline-block bg-transparent text-accent border border-accent px-6 py-2.5 rounded-lg no-underline font-normal transition-all duration-300 ease hover:bg-accent hover:text-white hover:-translate-y-0.5"
          >
            演奏会情報に戻る
          </Link>
        </div>
      </div>
    </>
  );
}
