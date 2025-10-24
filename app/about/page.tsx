export default function AboutPage() {
  return (
    <div className="container page-content">
      <h1>団紹介</h1>
      
      <section>
        <h2>横浜国立大学管弦楽団について</h2>
        <p>横浜国立大学管弦楽団は、1952年に発足した伝統あるオーケストラです。</p>
        <p>現在は約80名の団員が在籍し、年2回の定期演奏会を中心に演奏活動を行っています。</p>
      </section>

      <section>
        <h2>活動内容</h2>
        <ul>
          <li>定期演奏会（年2回）</li>
          <li>新入生歓迎コンサート</li>
          <li>地域交流コンサート</li>
          <li>常任指揮者による指導</li>
        </ul>
      </section>

      <section>
        <h2>沿革</h2>
        <div className="history-list">
          <div className="history-item">
            <span>1952年</span>
            <p>横浜国立大学管弦楽団設立</p>
          </div>
          <div className="history-item">
            <span>1960年</span>
            <p>第1回定期演奏会開催</p>
          </div>
          {/* 他の沿革項目 */}
        </div>
      </section>
    </div>
  );
}
