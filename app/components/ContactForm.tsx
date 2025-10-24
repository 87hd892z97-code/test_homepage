'use client';

import { useState } from 'react';

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!name.trim()) newErrors.name = 'お名前を入力してください';
    if (!email.trim()) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }
    if (!message.trim()) newErrors.message = 'メッセージを入力してください';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 700));
      alert('送信が完了しました。ありがとうございます！');
      setName('');
      setEmail('');
      setMessage('');
      setErrors({});
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>
          お名前
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errors.name ? 'error' : ''}
          />
        </label>
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label>
          メールアドレス
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? 'error' : ''}
          />
        </label>
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label>
          メッセージ
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={errors.message ? 'error' : ''}
          />
        </label>
        {errors.message && <span className="error-message">{errors.message}</span>}
      </div>

      <button type="submit" disabled={submitting}>
        {submitting ? '送信中...' : '送信する'}
      </button>
    </form>
  );
}
