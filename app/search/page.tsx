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
    <div className="max-w-container mx-auto px-4 w-full overflow-x-hidden">
      <div className="py-8">
        <h1 className="text-accent mb-4">検索結果</h1>

        {query && (
          <div className="text-lg text-muted mb-8 p-4 bg-gray-light rounded-sm">
            「{query}」の検索結果
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted">検索中...</p>
          </div>
        ) : results.length > 0 ? (
          <div className="flex flex-col gap-6">
            {results.map((result, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-accent">
                <div className="text-xs text-accent font-semibold uppercase mb-2">
                  {getTypeLabel(result.type)}
                </div>
                <h3 className="m-0 mb-2 text-xl">
                  <Link href={result.url} className="text-text-secondary no-underline hover:text-accent">{result.title}</Link>
                </h3>
                <p className="text-muted m-0 mb-2 leading-relaxed">{result.description}</p>
                <div className="text-sm">
                  <Link href={result.url} className="text-accent no-underline hover:underline">{result.url}</Link>
                </div>
              </div>
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-12 text-muted">
            <p className="my-2">「{query}」に一致する結果が見つかりませんでした。</p>
            <p className="my-2">別のキーワードで検索してみてください。</p>
          </div>
        ) : (
          <div className="text-center py-12 text-muted">
            <p className="my-2">検索キーワードを入力してください。</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="text-center py-12">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted">読み込み中...</p>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
