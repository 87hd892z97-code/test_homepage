const members = [
  { id: 1, name: '山田 太郎', part: '第1ヴァイオリン' },
  { id: 2, name: '鈴木 花子', part: 'チェロ' },
  { id: 3, name: '田中 次郎', part: 'ピアノ' },
];

export default function MembersPage() {
  return (
    <section className="section">
      <div className="container">
        <h2>メンバー</h2>
        <p>主要メンバーとセクションの紹介です。演奏会ごとに編成が変わります。</p>

        <div className="members-grid">
          {members.map((m) => (
            <div className="member-card" key={m.id}>
              <div className="avatar">{m.part.slice(0, 2)}</div>
              <div>
                <p className="member-name">{m.name} — {m.part}</p>
                <p className="small">学年や演奏歴などの簡単な紹介をここに表示できます。</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
