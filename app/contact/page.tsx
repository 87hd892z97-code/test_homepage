import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  return (
    <div className="container page-content">
      <h1>お問い合わせ</h1>
      
      <section>
        <p>公演依頼、演奏会について等、当団に関するお問い合わせは以下のフォームよりお願いいたします。</p>
        <ContactForm />
      </section>

      <section>
        <h2>連絡先情報</h2>
        <div className="info-grid">
          <div className="info-card">
            <h3>メール</h3>
            <p>お問い合わせは上記フォームよりお願いいたします。</p>
          </div>
          <div className="info-card">
            <h3>所在地</h3>
            <p>〒240-8501　神奈川県横浜市保土ヶ谷区常盤台79-1<br />横浜国立大学　文化サークル共用施設2階</p>
          </div>
          <div className="info-card">
            <h3>演奏会について</h3>
            <p>演奏会の詳細やチケット予約については、演奏会情報ページをご確認ください。</p>
          </div>
        </div>
      </section>
    </div>
  );
}
