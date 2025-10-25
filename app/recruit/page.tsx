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
            <p>横浜国立大学の学生（学部生・大学院生）</p>
          </div>
          <div className="info-card">
            <h3>楽器</h3>
            <p>弦楽器、管楽器、打楽器、ピアノ</p>
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
            <h3>強化練習</h3>
            <p>定期演奏会前の1ヶ月間</p>
            <p>日曜日も活動（10:00～17:00）</p>
          </div>
        </div>
      </section>

      <section className="practice-location-section">
        <h2>練習場所</h2>
        <p>横浜国立大学 教育文化ホール</p>
        <p>※パート練習は教室を使用することもあります</p>
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
          <li>ピアノ</li>
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
          <div className="benefit-card">
            <h3>リーダーシップ</h3>
            <p>団の運営に参加することで、組織運営やリーダーシップのスキルを身につけられます。</p>
          </div>
        </div>
      </section>

      <section className="contact-recruit">
        <h2>お問い合わせ</h2>
        <p>入団にご興味のある方は、お気軽にお問い合わせください。</p>
        <div className="contact-info">
          <p><strong>メール:</strong> recruit@ynuorch.example.edu</p>
          <p><strong>電話:</strong> 045-123-4567（平日 9:00-17:00）</p>
        </div>
        <div className="cta-buttons">
          <a href="/contact" className="btn-primary">お問い合わせフォーム</a>
        </div>
      </section>
    </div>
  );
}
