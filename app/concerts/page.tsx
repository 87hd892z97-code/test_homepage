import React, { Suspense } from 'react';
import Skeleton from '../components/Skeleton';

const upcoming = [
  { title: '春の定期演奏会', date: '2026-04-15', venue: '大学ホール' },
  { title: '学園祭コンサート', date: '2026-09-10', venue: '屋外ステージ' },
  { title: 'クリスマス・コンサート', date: '2026-12-20', venue: '大学ホール' },
];

// 非同期コンポーネントで遅延をシミュレート
async function UpcomingList() {
  await new Promise((r) => setTimeout(r, 700));
  return (
    <ul className="concert-list">
      {upcoming.map((c) => (
        <li key={c.title}>
          <strong>{c.title}</strong> — {c.date} / {c.venue}
        </li>
      ))}
    </ul>
  );
}

export default function ConcertsPage() {
  return (
    <section className="section">
      <div className="container">
        <h2>公演情報</h2>
        <p>
          本オーケストラの今後の公演と、過去の主要な演奏の記録を掲載しています。入場方法やプログラムは公演ごとに案内します。
        </p>

        <h3>今後の公演</h3>
        {/* 読み込み中は Skeleton を表示 */}
        <Suspense fallback={<Skeleton lines={3} />}>
          {/* @ts-expect-error Async Server Component */}
          <UpcomingList />
        </Suspense>

        <h3>過去のハイライト</h3>
        <p className="small">
          ベートーヴェン交響曲やチャイコフスキーの協奏曲など、学生ならではの意欲的なプログラムに取り組んでいます。
        </p>
      </div>
    </section>
  );
}
