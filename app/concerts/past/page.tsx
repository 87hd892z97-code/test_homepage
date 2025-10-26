'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// データファイルをインポート（将来的には別ファイルに移動可能）
import { getAllPastConcerts } from './data';
import { getConcertImagePath } from './imageMapping';


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
    <div className={`past-concert-card ${cancelled ? 'cancelled' : ''}`}>
      <div className="past-concert-header">
        <h3 className="past-concert-title">{concert}定期演奏会 {cancelled && '(中止)'}</h3>
      </div>
      {imagePath && (
        <div 
          className="past-concert-image-wrapper"
          onClick={() => onImageClick?.(imagePath)}
          style={{ cursor: 'pointer' }}
        >
          <Image
            src={imagePath}
            alt={`${concert}定期演奏会の画像`}
            width={400}
            height={300}
            className="past-concert-image"
            loading="lazy"
          />
          <div className="past-concert-image-overlay">
            <span>画像をクリック</span>
          </div>
        </div>
      )}
      <div className="past-concert-body">
        <div className="past-concert-info">
          <p className="past-concert-date">{date}</p>
          <p className="past-concert-venue">{venue}</p>
          {conductor && (
            <p className="past-concert-conductor">指揮：{conductor}</p>
          )}
          {chorus && (
            <p className="past-concert-choir">合唱：{chorus}</p>
          )}
          {soprano && (
            <p className="past-concert-soprano">ソプラノ：{soprano}</p>
          )}
          {soprano2 && (
            <p className="past-concert-soprano">ソプラノ：{soprano2}</p>
          )}
          {mezzoSoprano && (
            <p className="past-concert-mezzo-soprano">メゾソプラノ：{mezzoSoprano}</p>
          )}
          {alto && (
            <p className="past-concert-alto">アルト：{alto}</p>
          )}
          {tenor && (
            <p className="past-concert-tenor">テノール：{tenor}</p>
          )}
          {bassBaritone && (
            <p className="past-concert-bass-baritone">バス・バリトン：{bassBaritone}</p>
          )}
          {soloist && (
            <div className="past-concert-soloist">
              {(() => {
                // soloistに既に楽器名が含まれている場合はそのまま表示
                if (soloist.includes('、') || soloist.includes('独奏：') || soloist.includes('：')) {
                  return soloist.split('、').map((item, index) => (
                    <div key={index}>{item}</div>
                  ));
                }
                
                const instrument = getInstrumentFromPieces(pieces);
                if (instrument) {
                  if (instrument === 'オルガン') {
                    return <div>オルガン：{soloist}</div>;
                  }
                  return <div>{instrument}独奏：{soloist}</div>;
                }
                return <div>独奏：{soloist}</div>;
              })()}
            </div>
          )}
        </div>
        {pieces && pieces.length > 0 && (
          <div className="past-concert-pieces">
            <p className="past-concert-pieces-label">曲目：</p>
            <ul className="past-concert-pieces-list">
              {sortPieces(pieces).map((piece, index) => (
                <li key={`${piece}-${index}`} className="past-concert-piece">{piece}</li>
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
  

  // 全演奏会データを取得（第1回から）
  const allConcerts = useMemo(() => getAllPastConcerts().reverse(), []);

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

  return (
    <>
      <div className="sublevel-layer-wrapper">
        <aside className="sublevel-layer">
        <h2 className="sidebar-title">演奏会グループ</h2>
        <div className="sidebar-groups">
          {decades.map(decade => {
            const concerts = [...concertsByDecade[decade]].reverse();
            const isExpanded = expandedGroups[decade] ?? false;
            
            return (
              <button
                key={decade}
                onClick={() => handleGroupClick(decade)}
                className={`sidebar-group-button ${isExpanded ? 'active' : ''}`}
              >
                <span>{getConcertRange(concerts)}</span>
                <span className="sidebar-toggle-icon">{isExpanded ? '−' : '+'}</span>
              </button>
            );
          })}
        </div>
      </aside>
      </div>
      
      {selectedImage && (
        <div 
          className="image-modal"
          onClick={() => setSelectedImage(null)}
        >
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="image-modal-close"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <Image
              src={selectedImage}
              alt="拡大画像"
              width={1200}
              height={900}
              className="image-modal-image"
              unoptimized
            />
          </div>
        </div>
      )}
      
      <div className="container page-content past-concerts-content">
        <div className="past-concerts-header">
          <h1>過去の演奏会記録</h1>
          <p className="past-concerts-intro">
            横浜国立大学管弦楽団がこれまでに開催してきた定期演奏会の記録です。
          </p>
        </div>

        <div className="concerts-by-decade">
          {decades.map(decade => {
          const concerts = [...concertsByDecade[decade]].reverse();
          const isExpanded = expandedGroups[decade] ?? false;
          
          return (
            <div key={decade} id={`decade-${decade}`} className="decade-section">
              <button
                onClick={() => handleGroupClick(decade)}
                className="decade-toggle"
              >
                <h2 className="decade-heading">{getConcertRange(concerts)}</h2>
                <span className="toggle-icon">{isExpanded ? '−' : '+'}</span>
              </button>
              <div className={`past-concerts-grid expandable ${isExpanded ? 'expanded' : ''}`}>
                {concerts.map((item, index) => (
                  <div
                    key={`decade-${decade}-${index}`}
                    className="card-wrapper"
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

        <div className="past-concerts-footer">
          <Link href="/concerts" className="btn-secondary">
            演奏会情報に戻る
          </Link>
        </div>
      </div>
    </>
  );
}
