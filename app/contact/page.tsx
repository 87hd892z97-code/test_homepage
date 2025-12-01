import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  return (
    <div className="max-w-container mx-auto px-4 w-full overflow-x-hidden py-12 pt-8 max-w-2xl mx-auto">
      <h1 className="text-4xl text-accent dark:text-[#4aaaf0] mb-8 pb-2 border-b border-accent dark:border-[#4aaaf0]">お問い合わせ</h1>

      <section className="mb-12">
        <p className="text-base leading-loose dark:text-[#d4d4d4]">公演依頼、演奏会について等、当団に関するお問い合わせは以下のフォームよりお願いいたします。</p>
        <ContactForm />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl mb-4 text-text-secondary dark:text-[#d4d4d4]">連絡先情報</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 mt-8">
          <div className="glass-card p-8 rounded-xl text-center">
            <h3 className="text-accent dark:text-[#4aaaf0] mb-4 text-2xl">メール</h3>
            <p className="text-muted dark:text-[#858585] leading-relaxed mb-6">お問い合わせは上記フォームよりお願いいたします。</p>
          </div>
          <div className="glass-card p-8 rounded-xl text-center">
            <h3 className="text-accent dark:text-[#4aaaf0] mb-4 text-2xl">所在地</h3>
            <p className="text-muted dark:text-[#858585] leading-relaxed mb-6">〒240-8501　神奈川県横浜市保土ヶ谷区常盤台79-1<br />横浜国立大学　文化サークル共用施設2階</p>
          </div>
          <div className="glass-card p-8 rounded-xl text-center">
            <h3 className="text-accent dark:text-[#4aaaf0] mb-4 text-2xl">演奏会について</h3>
            <p className="text-muted dark:text-[#858585] leading-relaxed mb-6">演奏会の詳細やチケット予約については、演奏会情報ページをご確認ください。</p>
          </div>
        </div>
      </section>
    </div>
  );
}
