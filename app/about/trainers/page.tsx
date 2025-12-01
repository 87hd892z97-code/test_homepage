'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Trainer {
  id: number;
  name: string;
  instrument: string;
  title: string | null;
  description: string | null;
  imagePath: string | null;
}

export default function TrainersPage() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/trainers')
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Failed to load trainers');
        }
        const data = await res.json();
        setTrainers(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error(err);
        setError('トレーナー情報の取得に失敗しました。時間をおいて再度お試しください。');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-container mx-auto px-4 w-full overflow-x-hidden py-12 pt-8">
      <div className="flex justify-between items-center mb-8 pb-2 border-b border-accent dark:border-[#2b6cb0] flex-wrap gap-4">
        <h1 className="text-4xl text-accent dark:text-[#2b6cb0]">トレーナー紹介</h1>
        <Link
          href="/about"
          className="text-base text-text-secondary dark:text-[#d4d4d4] hover:text-accent dark:hover:text-[#2b6cb0] transition-colors duration-300 ease underline underline-offset-4"
        >
          ← 楽団紹介に戻る
        </Link>
      </div>

      <section className="mb-12">
        <p className="text-base leading-loose dark:text-[#d4d4d4] mb-8">
          横浜国立大学管弦楽団では、専門のトレーナーによる指導を受けています。各セクションを担当するトレーナーの皆様をご紹介します。
        </p>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-base text-text-secondary dark:text-[#d4d4d4]">読み込み中...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-base text-text-secondary dark:text-[#d4d4d4]">{error}</p>
          </div>
        ) : trainers.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 mt-4 max-mobile:grid-cols-1 max-mobile:gap-4">
            {trainers.map((trainer) => (
              <div key={trainer.id} className="glass-card p-6 rounded-lg text-center max-mobile:p-4">
                {trainer.imagePath && (
                  <div className="w-full max-w-[160px] mx-auto mb-4">
                    <Image
                      src={trainer.imagePath}
                      alt={trainer.name}
                      width={400}
                      height={400}
                      className="w-full h-auto rounded-xl object-contain border border-accent dark:border-[#2b6cb0] bg-black/5 dark:bg-white/5"
                    />
                  </div>
                )}
                <span className="block font-semibold text-accent dark:text-[#2b6cb0] text-sm mb-2">
                  {trainer.instrument}
                </span>
                <p className="text-lg font-medium my-2 text-text-secondary dark:text-[#d4d4d4]">
                  {trainer.name}
                </p>
                {trainer.title && (
                  <p className="text-sm text-muted dark:text-[#858585] italic mb-2">{trainer.title}</p>
                )}
                {trainer.description && (
                  <p className="text-sm text-text-secondary dark:text-[#d4d4d4] leading-relaxed">
                    {trainer.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-base text-text-secondary dark:text-[#d4d4d4]">
              トレーナー情報が登録されていません。
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
