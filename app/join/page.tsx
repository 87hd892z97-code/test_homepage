export default function JoinPage() {
  return (
    <div className="container page-content">
      <h1>練習案内</h1>

      <section>
        <h2>練習時間</h2>
        <div className="practice-schedule">
          <div className="schedule-item">
            <h3>通常練習</h3>
            <p>毎週水曜日 18:00～21:00</p>
            <p>毎週土曜日 13:00～17:00</p>
          </div>
          <div className="schedule-item">
            <h3>強化練習</h3>
            <p>定期演奏会前の1ヶ月間</p>
            <p>日曜日も活動（10:00～17:00）</p>
          </div>
        </div>
      </section>

      <section>
        <h2>練習場所</h2>
        <p>横浜国立大学 教育文化ホール</p>
        <p>※パート練習は教室を使用することもあります</p>
      </section>

      <section>
        <h2>募集パート</h2>
        <ul className="recruitment-list">
          <li>ヴァイオリン</li>
          <li>ヴィオラ</li>
          <li>チェロ</li>
          <li>コントラバス</li>
          <li>フルート</li>
          {/* 他のパート */}
        </ul>
      </section>
    </div>
  );
}
