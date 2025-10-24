import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  return (
    <section className="section">
      <div className="container">
        <h2>連絡</h2>
        <p>見学や公演依頼、ご質問は以下のフォームまたはメールでお知らせください。</p>
        <p className="contact-email">orchestra@example.edu</p>

        {/* Client コンポーネント */}
        <ContactForm />
      </div>
    </section>
  );
}
