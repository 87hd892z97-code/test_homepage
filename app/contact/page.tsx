import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  return (
    <div className="max-w-container mx-auto px-4 w-full overflow-x-hidden py-12 pt-8 max-w-2xl mx-auto">
      <h1 className="text-4xl text-accent mb-8 pb-2 border-b border-accent">お問い合わせ</h1>

      <section className="mb-12">
        <p className="text-base leading-loose">公演依頼、演奏会について等、当団に関するお問い合わせは以下のフォームよりお願いいたします。</p>
        <ContactForm />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl mb-4 text-text-secondary">連絡先情報</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 mt-8">
          <div className="bg-white p-8 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.1)] text-center">
            <h3 className="text-accent mb-4 text-2xl">メール</h3>
            <p className="text-muted leading-relaxed mb-6">お問い合わせは上記フォームよりお願いいたします。</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.1)] text-center">
            <h3 className="text-accent mb-4 text-2xl">所在地</h3>
            <p className="text-muted leading-relaxed mb-6">〒240-8501　神奈川県横浜市保土ヶ谷区常盤台79-1<br />横浜国立大学　文化サークル共用施設2階</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.1)] text-center">
            <h3 className="text-accent mb-4 text-2xl">演奏会について</h3>
            <p className="text-muted leading-relaxed mb-6">演奏会の詳細やチケット予約については、演奏会情報ページをご確認ください。</p>
          </div>
        </div>
      </section>
    </div>
  );
}
