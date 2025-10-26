export default function RecruitPage() {
  return (
    <div className="container page-content">
      <h1>団員募集</h1>

      <section className="recruit-intro">
        <p className="lead">
          横浜国立大学管弦楽団では、新しい団員を募集しています。音楽への情熱と向上心を持った学生の皆さんの参加をお待ちしています。
        </p>
      </section>

      <section className="recruitment-info">
        <h2>募集要項</h2>
        <div className="info-grid">
          <div className="info-card">
            <h3>対象</h3>
            <p>横浜国立大学 常磐台キャンパスに通える大学生（学部生・大学院生）</p>
          </div>
          <div className="info-card">
            <h3>楽器</h3>
            <p>弦楽器、管楽器、打楽器</p>
          </div>
          <div className="info-card">
            <h3>経験</h3>
            <p>初心者から上級者まで歓迎</p>
          </div>
          <div className="info-card">
            <h3>練習</h3>
            <p>週2回（水曜・土曜）</p>
          </div>
        </div>
      </section>

      <section className="practice-schedule-section">
        <h2>練習時間</h2>
        <div className="practice-schedule">
          <div className="schedule-item">
            <h3>通常練習</h3>
            <p>毎週水曜日 17:00～21:00</p>
            <p>毎週土曜日 15:00～21:00</p>
          </div>
          <div className="schedule-item">
            <h3>合宿</h3>
            <p>夏、春休みに年2回</p>
            <p>5泊6日程度</p>
          </div>
        </div>
      </section>

      <section className="practice-location-section">
        <h2>練習場所</h2>
        <p>横浜国立大学 文化サークル棟</p>
        <p>※パート練習は同棟内の空き部屋を使用することもあります</p>
      </section>

      <section className="recruitment-parts-section">
        <h2>募集パート</h2>
        <ul className="recruitment-list">
          <li>ヴァイオリン</li>
          <li>ヴィオラ</li>
          <li>チェロ</li>
          <li>コントラバス</li>
          <li>フルート</li>
          <li>オーボエ</li>
          <li>クラリネット</li>
          <li>ファゴット</li>
          <li>ホルン</li>
          <li>トランペット</li>
          <li>トロンボーン</li>
          <li>チューバ</li>
          <li>打楽器</li>
        </ul>
      </section>

      <section className="recruitment-process">
        <h2>入団までの流れ</h2>
        <div className="process-steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>見学・体験</h3>
              <p>まずは練習を見学していただき、実際に楽器を体験していただけます。</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>面談</h3>
              <p>団の活動内容や練習スケジュールについて詳しくお話しします。</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>入団</h3>
              <p>正式に入団手続きを行い、一緒に音楽を楽しみましょう。</p>
            </div>
          </div>
        </div>
      </section>

      <section className="recruitment-benefits">
        <h2>入団のメリット</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h3>技術向上</h3>
            <p>個人レッスンやパート練習を通じて、演奏技術を向上させることができます。</p>
          </div>
          <div className="benefit-card">
            <h3>仲間との交流</h3>
            <p>同じ音楽への情熱を持つ仲間と出会い、深い友情を築くことができます。</p>
          </div>
          <div className="benefit-card">
            <h3>演奏会参加</h3>
            <p>定期演奏会や学外での演奏会に参加し、貴重な経験を積むことができます。</p>
          </div>
        </div>
      </section>

      <section className="contact-recruit">
        <h2>お問い合わせ</h2>
        <p>入団にご興味のある方は、お気軽にお問い合わせください。</p>
        <div className="contact-info">
          <a href="https://www.instagram.com/ynuorch_shinkan/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-link instagram" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>@ynuorch_shinkan</span>
          </a>
        </div>
        <div className="cta-buttons">
          <a href="/contact" className="btn-primary">お問い合わせフォーム</a>
        </div>
      </section>
    </div>
  );
}
