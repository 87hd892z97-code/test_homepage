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
      // タイムアウト設定（30秒）
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (response.ok) {
        alert('お問い合わせを受け付けました。確認メールをお送りします。ありがとうございます！');
        setName('');
        setEmail('');
        setMessage('');
        setErrors({});
      } else {
        alert(`送信に失敗しました: ${data.error}`);
      }
    } catch (error) {
      console.error('送信エラー:', error);
      alert('送信に失敗しました。しばらく時間をおいて再度お試しください。');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="grid gap-2 mt-2 max-mobile:max-w-full" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="flex flex-col text-sm text-muted">
          お名前
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`p-2 border rounded-sm mt-1 text-base max-mobile:p-3 max-[480px]:text-base ${
              errors.name 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                : 'border-border focus:border-accent focus:ring-2 focus:ring-accent/30'
            } outline-none transition-colors duration-fast`}
          />
        </label>
        {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name}</span>}
      </div>

      <div className="mb-4">
        <label className="flex flex-col text-sm text-muted">
          メールアドレス
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`p-2 border rounded-sm mt-1 text-base max-mobile:p-3 max-[480px]:text-base ${
              errors.email 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                : 'border-border focus:border-accent focus:ring-2 focus:ring-accent/30'
            } outline-none transition-colors duration-fast`}
          />
        </label>
        {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email}</span>}
      </div>

      <div className="mb-4">
        <label className="flex flex-col text-sm text-muted">
          メッセージ
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`p-2 border rounded-sm mt-1 text-base max-mobile:p-3 max-[480px]:text-base ${
              errors.message 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                : 'border-border focus:border-accent focus:ring-2 focus:ring-accent/30'
            } outline-none transition-colors duration-fast resize-y`}
          />
        </label>
        {errors.message && <span className="text-red-500 text-xs mt-1 block">{errors.message}</span>}
      </div>

      <button 
        type="submit" 
        disabled={submitting}
        className="w-[140px] max-mobile:w-full p-2.5 max-mobile:p-3 bg-accent text-white border-0 rounded-sm cursor-pointer transition-opacity duration-fast hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? '送信中...' : '送信する'}
      </button>
    </form>
  );
}
