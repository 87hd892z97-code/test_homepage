import { Suspense } from 'react';
import LoginForm from '../ui/login-form';

export default function LoginPage() {
  return (
    <div className="max-w-container mx-auto px-4 w-full overflow-x-hidden py-12 pt-8 max-w-2xl mx-auto">
      <h1 className="text-4xl text-accent mb-8 pb-2 border-b border-accent">ログイン</h1>

      <section className="mb-12">
        <p className="text-base leading-loose mb-8">
          管理者ページにアクセスするには、ログインが必要です。
        </p>
        
        <div className="bg-white p-8 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

