import { Suspense } from 'react';
import LoginForm from '../ui/login-form';

export default function LoginPage() {
  return (
    <div className="max-w-container mx-auto px-4 w-full overflow-x-hidden py-12 pt-8 max-w-2xl mx-auto">
      <h1 className="text-4xl text-accent dark:text-[#4fc3f7] mb-8 pb-2 border-b border-accent dark:border-[#4fc3f7]">ログイン</h1>

      <section className="mb-12">
        <p className="text-base leading-loose dark:text-[#cccccc] mb-8">
          管理者ページにアクセスするには、ログインが必要です。
        </p>
        
        <div className="glass-card p-8 rounded-xl">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

