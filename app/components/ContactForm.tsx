'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) {
      alert('メールとメッセージは必須です。');
      return;
    }
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 700));
      alert('送信が完了しました（ダミー）。ありがとうございます！');
      setName('');
      setEmail('');
      setMessage('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        名前
        <input
          type="text"
          name="name"
          placeholder="お名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        メール
        <input
          type="email"
          name="email"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        メッセージ
        <textarea
          name="message"
          rows={4}
          placeholder="メッセージ"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </label>
      <button type="submit" disabled={submitting}>
        {submitting ? '送信中...' : '送信'}
      </button>
    </form>
  );
}
