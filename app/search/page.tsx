'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface SearchResult {
  title: string;
  url: string;
  description: string;
  type: 'page' | 'concert' | 'news';
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    setLoading(true);
    
    // 模擬的な検索結果（実際の実装では、APIやデータベースから検索）
    const mockResults: SearchResult[] = [
      {
        title: '楽団紹介',
        url: '/about',
        description: '横浜国立大学管弦楽団の歴史、活動内容、団員構成について',
        type: 'page'
      },
      {
        title: '2024年春の定期演奏会',
        url: '/concerts',
        description: 'ベートーヴェン：交響曲第7番、2024年4月15日開催',
        type: 'concert'
      },
      {
        title: '練習案内',
        url: '/join',
        description: '新入団員募集、練習スケジュール、参加方法について',
        type: 'page'
      },
      {
        title: 'お問い合わせ',
        url: '/contact',
        description: '演奏会のご予約、お問い合わせはこちらから',
        type: 'page'
      }
    ];

    // 簡単な検索フィルタリング
    const filteredResults = mockResults.filter(result =>
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setTimeout(() => {
      setResults(filteredResults);
      setLoading(false);
    }, 500);
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'page': return 'ページ';
      case 'concert': return '演奏会';
      case 'news': return 'ニュース';
      default: return 'その他';
    }
  };

  return (
    <div className="container">
      <div className="search-results">
        <h1>検索結果</h1>
        
        {query && (
          <div className="search-query">
            「{query}」の検索結果
          </div>
        )}

        {loading ? (
          <div className="search-loading">
            <div className="loading-spinner"></div>
            <p>検索中...</p>
          </div>
        ) : results.length > 0 ? (
          <div className="results-list">
            {results.map((result, index) => (
              <div key={index} className="result-item">
                <div className="result-type">
                  {getTypeLabel(result.type)}
                </div>
                <h3 className="result-title">
                  <Link href={result.url}>{result.title}</Link>
                </h3>
                <p className="result-description">{result.description}</p>
                <div className="result-url">
                  <Link href={result.url}>{result.url}</Link>
                </div>
              </div>
            ))}
          </div>
        ) : query ? (
          <div className="no-results">
            <p>「{query}」に一致する結果が見つかりませんでした。</p>
            <p>別のキーワードで検索してみてください。</p>
          </div>
        ) : (
          <div className="no-query">
            <p>検索キーワードを入力してください。</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="search-loading"><div className="loading-spinner"></div><p>読み込み中...</p></div>}>
      <SearchContent />
    </Suspense>
  );
}
