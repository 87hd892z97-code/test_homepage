'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

// データファイルをインポート（将来的には別ファイルに移動可能）
import { getAllPastConcerts } from './data';
import { getConcertImagePath } from './imageMapping';
import { adaptDbConcertToPastConcert } from '../../lib/concertAdapter';

const ITEMS_PER_PAGE = 10;


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
    <div className={`glass-card rounded-lg p-6 transition-shadow duration-slow ease flex-1 flex flex-col h-full max-mobile:p-5 max-[480px]:p-4 ${
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

function PastConcertsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [allConcerts, setAllConcerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // URLパラメータから値を取得
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const searchQuery = searchParams.get('search') || '';
  
  // 検索入力値をローカルstateで管理（入力中はURLを更新しない）
  const [searchInputValue, setSearchInputValue] = useState(searchQuery);
  
  // URLパラメータが変更されたときにローカルstateを同期
  useEffect(() => {
    setSearchInputValue(searchQuery);
  }, [searchQuery]);

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

  // 全演奏会データをデータベースから取得
  useEffect(() => {
    fetchConcerts();
  }, []);

  const fetchConcerts = async () => {
    try {
      const response = await fetch('/api/concerts/past');
      if (response.ok) {
        const data = await response.json();
        const adaptedConcerts = data.map((concert: any) => adaptDbConcertToPastConcert(concert));
        // APIは既に降順（新しいものが先）で取得されているため、reverse()は不要
        setAllConcerts(adaptedConcerts);
      }
    } catch (error) {
      console.error('Failed to fetch concerts:', error);
      // フォールバック: ハードコーディングされたデータを使用
      setAllConcerts(getAllPastConcerts());
    } finally {
      setLoading(false);
    }
  };

  // 文字列内にキーワードの文字が順番に含まれているかチェック（数文字飛ばされてもOK）
  // 5文字以上一致している場合は表記揺れとしてマッチ
  const fuzzyMatch = (text: string, keyword: string): boolean => {
    if (keyword.length === 0) return true;
    if (text.includes(keyword)) return true; // 完全一致または部分一致の場合は即座にtrue
    
    // キーワードが5文字未満の場合は、従来の柔軟なマッチングを使用
    if (keyword.length < 5) {
      let keywordIndex = 0;
      for (let i = 0; i < text.length && keywordIndex < keyword.length; i++) {
        if (text[i] === keyword[keywordIndex]) {
          keywordIndex++;
        }
      }
      return keywordIndex === keyword.length;
    }
    
    // キーワードが5文字以上の場合、連続する5文字以上の部分文字列が一致しているかをチェック
    // キーワードから5文字以上の部分文字列を抽出して、テキスト内に含まれているか確認
    for (let len = keyword.length; len >= 5; len--) {
      for (let start = 0; start <= keyword.length - len; start++) {
        const substring = keyword.substring(start, start + len);
        if (text.includes(substring)) {
          return true;
        }
      }
    }
    
    // 5文字以上の一致がない場合、従来の柔軟なマッチングを試す
    let keywordIndex = 0;
    for (let i = 0; i < text.length && keywordIndex < keyword.length; i++) {
      if (text[i] === keyword[keywordIndex]) {
        keywordIndex++;
      }
    }
    return keywordIndex === keyword.length;
  };

  // 検索フィルタリング（空白で区切られた複数のキーワードに対応、柔軟なマッチング）
  const filteredConcerts = useMemo(() => {
    if (!searchQuery) return allConcerts;
    
    // 空白で区切って複数のキーワードに分割（空文字列を除外）
    const keywords = searchQuery
      .toLowerCase()
      .split(/\s+/)
      .filter(keyword => keyword.length > 0);
    
    if (keywords.length === 0) return allConcerts;
    
    return allConcerts.filter((concert) => {
      // 検索対象の文字列を結合（日にちは除外）
      const searchableText = [
        concert.concert.match(/\d+/)?.[0] || '',
        concert.venue.toLowerCase(),
        concert.conductor?.toLowerCase() || '',
        concert.pieces?.join(' ').toLowerCase() || '',
        concert.soloist?.toLowerCase() || '',
        concert.chorus?.toLowerCase() || '',
        concert.soprano?.toLowerCase() || '',
        concert.soprano2?.toLowerCase() || '',
        concert.mezzoSoprano?.toLowerCase() || '',
        concert.alto?.toLowerCase() || '',
        concert.tenor?.toLowerCase() || '',
        concert.bassBaritone?.toLowerCase() || '',
      ].join(' ');
      
      // すべてのキーワードが柔軟にマッチするかチェック（AND検索）
      return keywords.every(keyword => fuzzyMatch(searchableText, keyword));
    });
  }, [allConcerts, searchQuery]);

  // ページネーション計算
  const totalPages = Math.ceil(filteredConcerts.length / ITEMS_PER_PAGE);
  const validPage = Math.max(1, Math.min(currentPage, totalPages || 1));
  const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedConcerts = filteredConcerts.slice(startIndex, endIndex);

  // 検索ハンドラー（デバウンス処理付き）
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1'); // 検索時は常にページを1にリセット
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);
  
  // 入力値の変更ハンドラー
  const handleSearchInputChange = (value: string) => {
    setSearchInputValue(value);
    handleSearch(value);
  };

  // URLパラメータを更新する関数（ページネーション用）
  const updateSearchParams = (updates: { page?: number; search?: string }) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (updates.page !== undefined) {
      if (updates.page === 1) {
        params.delete('page');
      } else {
        params.set('page', updates.page.toString());
      }
    }
    
    if (updates.search !== undefined) {
      if (updates.search === '') {
        params.delete('search');
        params.delete('page'); // 検索をクリアしたらページもリセット
      } else {
        params.set('search', updates.search);
        params.delete('page'); // 新しい検索時はページをリセット
      }
    }
    
    router.push(`/concerts/past?${params.toString()}`);
  };

  // ページ変更のハンドラー
  const handlePageChange = (page: number) => {
    const validPageNum = Math.max(1, Math.min(page, totalPages || 1));
    if (validPageNum >= 1 && validPageNum <= totalPages) {
      updateSearchParams({ page: validPageNum });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // 無効なページ番号の場合、URLを修正
  useEffect(() => {
    if (!loading && totalPages > 0 && currentPage !== validPage) {
      const params = new URLSearchParams(searchParams.toString());
      if (validPage === 1) {
        params.delete('page');
      } else {
        params.set('page', validPage.toString());
      }
      router.replace(`/concerts/past?${params.toString()}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, totalPages, currentPage, validPage]);

  // ページネーションボタンを生成
  const getPaginationButtons = () => {
    const buttons = [];
    const maxVisible = 5; // 表示する最大ページ数
    const pageToUse = validPage;
    
    let startPage = Math.max(1, pageToUse - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    // 最初のページ
    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-3 py-2 bg-white border border-border rounded-lg text-text-secondary text-sm cursor-pointer transition-all duration-fast ease hover:border-accent hover:bg-accent/8 hover:text-accent"
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis-start" className="px-2 text-text-secondary">...</span>
        );
      }
    }
    
    // ページ番号
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 border rounded-lg text-sm cursor-pointer transition-all duration-fast ease ${
            i === pageToUse
              ? 'bg-accent text-white border-accent font-semibold'
              : 'bg-white border-border text-text-secondary hover:border-accent hover:bg-accent/8 hover:text-accent'
          }`}
        >
          {i}
        </button>
      );
    }
    
    // 最後のページ
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis-end" className="px-2 text-text-secondary">...</span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-2 bg-white border border-border rounded-lg text-text-secondary text-sm cursor-pointer transition-all duration-fast ease hover:border-accent hover:bg-accent/8 hover:text-accent"
        >
          {totalPages}
        </button>
      );
    }
    
    return buttons;
  };

  // スケルトンコンポーネント
  const SkeletonCard = () => (
        <div className="glass-card rounded-lg p-6 transition-shadow duration-slow ease flex-1 flex flex-col h-full">
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
          {/* 検索バー */}
          <div className="mt-6">
            <input
              type="text"
              placeholder="演奏会を検索..."
              value={searchInputValue}
              onChange={(e) => handleSearchInputChange(e.target.value)}
              className="w-full p-3 text-sm border border-border-lighter rounded-md outline-none transition-colors duration-fast focus:border-accent"
            />
          </div>
          {searchQuery && (
            <p className="mt-2 text-sm text-muted">
              「{searchQuery}」の検索結果: {filteredConcerts.length}件
            </p>
          )}
        </div>

        {paginatedConcerts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-6 mb-12 max-w-container mx-auto max-mobile:grid-cols-1 max-mobile:gap-5 max-mobile:p-0">
              {paginatedConcerts.map((item, index) => (
              <div
                key={`concert-${startIndex + index}`}
                className="flex animate-fade-in"
                style={{
                  animationDelay: `${index * 30}ms`
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

            {/* ページネーション */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mb-12 flex-wrap relative z-10">
                <button
                  onClick={() => handlePageChange(validPage - 1)}
                  disabled={validPage === 1}
                  className="px-4 py-2 bg-white border border-border rounded-lg text-text-secondary text-sm cursor-pointer transition-all duration-fast ease hover:border-accent hover:bg-accent/8 hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-border disabled:hover:bg-white disabled:hover:text-text-secondary"
                >
                  前へ
                </button>
                {getPaginationButtons()}
                <button
                  onClick={() => handlePageChange(validPage + 1)}
                  disabled={validPage === totalPages}
                  className="px-4 py-2 bg-white border border-border rounded-lg text-text-secondary text-sm cursor-pointer transition-all duration-fast ease hover:border-accent hover:bg-accent/8 hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-border disabled:hover:bg-white disabled:hover:text-text-secondary"
                >
                  次へ
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted text-lg">
              {searchQuery ? '検索結果が見つかりませんでした' : '演奏会データがありません'}
            </p>
            {searchQuery && (
              <button
                onClick={() => {
                  handleSearch('');
                }}
                className="mt-4 px-4 py-2 bg-transparent text-accent border border-accent rounded-lg cursor-pointer transition-all duration-300 ease hover:bg-accent hover:text-white"
              >
                検索をクリア
              </button>
            )}
          </div>
        )}

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

export default function PastConcertsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-container mx-auto px-4 w-full overflow-x-hidden py-12 pt-8 max-w-2xl mx-auto">
        <div className="max-w-[1600px] mx-auto p-8 grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-card rounded-lg p-6">
              <div className="h-6 w-4/5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[200%_100%] animate-shimmer rounded mb-4"></div>
              <div className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[200%_100%] animate-shimmer h-[200px] rounded-lg mb-3"></div>
            </div>
          ))}
        </div>
      </div>
    }>
      <PastConcertsContent />
    </Suspense>
  );
}
