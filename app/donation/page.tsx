export default function DonationPage() {
  return (
    <div className="container page-content">
      <h1>寄付について</h1>

      <section className="donation-intro">
        <p className="lead">
          横浜国立大学管弦楽団の活動を支えていただける皆様からのご寄付を心よりお待ちしております。
          皆様のご支援により、より充実した音楽活動を継続することができます。
        </p>
      </section>

      <section className="donation-purpose">
        <h2>寄付金の使途</h2>
        <div className="purpose-grid">
          <div className="purpose-card">
            <h3>楽器・楽譜の購入</h3>
            <p>演奏に必要な楽器の購入・メンテナンスや、新しい楽譜の購入に使用されます。</p>
          </div>
          <div className="purpose-card">
            <h3>演奏会開催</h3>
            <p>定期演奏会や学外での演奏会の開催費用（会場費、音響設備など）に使用されます。</p>
          </div>
          <div className="purpose-card">
            <h3>指導者への謝礼</h3>
            <p>プロの指揮者やトレーナーによる指導のための謝礼金に使用されます。</p>
          </div>
          <div className="purpose-card">
            <h3>移動音楽会</h3>
            <p>小学校や福祉施設での移動音楽会の交通費や機材運搬費に使用されます。</p>
          </div>
        </div>
      </section>

      <section className="donation-amounts">
        <h2>寄付金額の目安</h2>
        <div className="amount-grid">
          <div className="amount-card">
            <div className="amount">¥1,000</div>
            <p>楽譜1冊分の購入</p>
          </div>
          <div className="amount-card">
            <div className="amount">¥5,000</div>
            <p>移動音楽会の交通費</p>
          </div>
          <div className="amount-card">
            <div className="amount">¥10,000</div>
            <p>演奏会の音響設備費</p>
          </div>
          <div className="amount-card">
            <div className="amount">¥50,000</div>
            <p>楽器のメンテナンス費</p>
          </div>
          <div className="amount-card">
            <div className="amount">¥100,000</div>
            <p>新楽器の購入費</p>
          </div>
          <div className="amount-card">
            <div className="amount">任意</div>
            <p>お気持ちに応じて</p>
          </div>
        </div>
      </section>

      <section className="donation-methods">
        <h2>寄付方法</h2>
        <div className="method-grid">
          <div className="method-card">
            <h3>銀行振込</h3>
            <div className="bank-info">
              <p><strong>銀行名:</strong> 横浜銀行</p>
              <p><strong>支店名:</strong> 横浜国立大学支店</p>
              <p><strong>口座種別:</strong> 普通</p>
              <p><strong>口座番号:</strong> 1234567</p>
              <p><strong>口座名義:</strong> 横浜国立大学管弦楽団</p>
            </div>
          </div>
          <div className="method-card">
            <h3>現金でのお渡し</h3>
            <p>演奏会会場や練習場所で直接お渡しいただけます。</p>
            <p>事前にご連絡いただければ、代表者がお待ちしております。</p>
          </div>
          <div className="method-card">
            <h3>物品での寄付</h3>
            <p>楽器、楽譜、音楽関連の書籍なども寄付として受け付けております。</p>
            <p>お気軽にお問い合わせください。</p>
          </div>
        </div>
      </section>

      <section className="donation-benefits">
        <h2>寄付者への特典</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h3>演奏会無料招待</h3>
            <p>定期演奏会にご招待いたします（寄付金額に応じて複数名まで）</p>
          </div>
          <div className="benefit-card">
            <h3>活動報告書</h3>
            <p>年1回、団の活動状況をまとめた報告書をお送りします</p>
          </div>
          <div className="benefit-card">
            <h3>練習見学</h3>
            <p>練習の様子を見学していただけます</p>
          </div>
          <div className="benefit-card">
            <h3>感謝状</h3>
            <p>寄付いただいた方には感謝状をお送りします</p>
          </div>
        </div>
      </section>

      <section className="donation-contact">
        <h2>お問い合わせ</h2>
        <p>寄付に関するご質問やご相談がございましたら、お気軽にお問い合わせください。</p>
        <div className="contact-info">
          <p><strong>メール:</strong> donation@ynuorch.example.edu</p>
          <p><strong>電話:</strong> 045-123-4567（平日 9:00-17:00）</p>
          <p><strong>担当:</strong> 運営委員長 鈴木 是雄</p>
        </div>
        <div className="cta-buttons">
          <a href="/contact" className="btn-primary">お問い合わせフォーム</a>
          <a href="/concerts" className="btn-secondary">演奏会情報を見る</a>
        </div>
      </section>

      <section className="donation-note">
        <h2>ご注意事項</h2>
        <div className="note-content">
          <ul>
            <li>寄付金は横浜国立大学管弦楽団の活動にのみ使用されます</li>
            <li>寄付金の領収書が必要な場合は、お申し付けください</li>
            <li>寄付金の返金は原則として行いません</li>
            <li>寄付者の個人情報は適切に管理し、活動報告以外の目的では使用いたしません</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
