'use client';

import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { authenticate } from '@/app/lib/actions';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="w-full">
      <div className="space-y-6">
        <div>
          <label
            className="block mb-2 font-bold text-base text-text-secondary dark:text-[#d4d4d4]"
            htmlFor="email"
          >
            メールアドレス
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-lg border border-border dark:border-[#3e3e42] py-3 pl-10 pr-4 text-base dark:text-[#cccccc] dark:bg-[#1e1e1e] outline-none transition-colors duration-fast focus:border-accent dark:focus:border-[#4aaaf0] placeholder:text-text-tertiary dark:placeholder:text-[#858585]"
              id="email"
              type="email"
              name="email"
              placeholder="メールアドレスを入力"
              required
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-tertiary dark:text-[#858585] peer-focus:text-accent dark:peer-focus:text-[#4aaaf0] transition-colors duration-fast" />
          </div>
        </div>
        
        <div>
          <label
            className="block mb-2 font-bold text-base text-text-secondary dark:text-[#d4d4d4]"
            htmlFor="password"
          >
            パスワード
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-lg border border-border dark:border-[#3e3e42] py-3 pl-10 pr-4 text-base dark:text-[#cccccc] dark:bg-[#1e1e1e] outline-none transition-colors duration-fast focus:border-accent dark:focus:border-[#4aaaf0] placeholder:text-text-tertiary dark:placeholder:text-[#858585]"
              id="password"
              type="password"
              name="password"
              placeholder="パスワードを入力"
              required
              minLength={6}
            />
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-tertiary dark:text-[#858585] peer-focus:text-accent dark:peer-focus:text-[#4aaaf0] transition-colors duration-fast" />
          </div>
        </div>

        <input type="hidden" name="redirectTo" value={callbackUrl} />

        <button
          type="submit"
          disabled={isPending}
          className={`w-full px-8 py-3 bg-accent text-white border-0 rounded-lg cursor-pointer text-base font-bold transition-opacity duration-fast ${
            isPending 
              ? 'opacity-60 cursor-not-allowed' 
              : 'hover:opacity-90'
          }`}
          aria-disabled={isPending}
        >
          {isPending ? (
            'ログイン中...'
          ) : (
            <>
              ログイン
              <ArrowRightIcon className="ml-2 inline-block h-5 w-5" />
            </>
          )}
        </button>

        <div
          className="flex h-8 items-center gap-2"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
