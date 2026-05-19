'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { signIn, signUp, signInWithGoogle } from './actions';
import { ActionState } from '@/lib/auth/middleware';

export function Login({ mode = 'signin' }: { mode?: 'signin' | 'signup' }) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const priceId = searchParams.get('priceId');
  const inviteId = searchParams.get('inviteId');
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    mode === 'signin' ? signIn : signUp,
    { error: '' }
  );

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center py-14 lg:py-[90px] bg-[#F4F7FF]">
      <div className="mx-auto w-full max-w-[525px] px-4">
        {/* Card */}
        <div className="relative overflow-hidden rounded-xl bg-white shadow-[0px_1px_55px_-11px_rgba(0,0,0,0.15)] py-14 px-8 sm:px-12 md:px-[60px]">
          {/* Logo */}
          <div className="mb-10 text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-[#3758F9] flex items-center justify-center">
                <span className="text-white font-bold text-base">W</span>
              </div>
              <span className="text-2xl font-bold text-[#111928]">Wameup</span>
            </Link>
          </div>

          <h2 className="mb-2 text-center text-2xl font-bold text-[#111928]">
            {mode === 'signin' ? 'Sign in to your account' : 'Create your account'}
          </h2>
          <p className="mb-8 text-center text-sm text-[#637381]">
            {mode === 'signin'
              ? "Don't have an account? "
              : 'Already have an account? '}
            <Link
              href={`${mode === 'signin' ? '/sign-up' : '/sign-in'}${redirect ? `?redirect=${redirect}` : ''}${priceId ? `&priceId=${priceId}` : ''}`}
              className="text-[#3758F9] hover:underline font-medium"
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </Link>
          </p>

          {/* Google OAuth */}
          <form action={signInWithGoogle} className="mb-[22px]">
            <button
              type="submit"
              className="w-full flex justify-center items-center gap-3 py-3 px-5 rounded-md border border-[#DFE4EA] text-base font-medium text-[#111928] bg-white hover:bg-[#F9FAFB] transition-colors"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
          </form>

          {/* Divider */}
          <div className="relative mb-[22px]">
            <span className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[#DFE4EA]" />
            </span>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-sm text-[#8899A8]">or continue with email</span>
            </div>
          </div>

          {/* Email / Password form */}
          <form className="space-y-[22px]" action={formAction}>
            <input type="hidden" name="redirect" value={redirect || ''} />
            <input type="hidden" name="priceId" value={priceId || ''} />
            <input type="hidden" name="inviteId" value={inviteId || ''} />

            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-[#111928] mb-2">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                defaultValue={state.email}
                required
                maxLength={50}
                className="w-full rounded-md border border-[#DFE4EA] bg-transparent py-3 px-5 text-base text-[#111928] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#3758F9] focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-[#111928] mb-2">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                defaultValue={state.password}
                required
                minLength={8}
                maxLength={100}
                className="w-full rounded-md border border-[#DFE4EA] bg-transparent py-3 px-5 text-base text-[#111928] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#3758F9] focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Enter your password"
              />
            </div>

            {state?.error && (
              <div className="text-red-500 text-sm">{state.error}</div>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full flex justify-center items-center rounded-md bg-[#3758F9] py-3 px-5 text-base font-medium text-white transition duration-300 hover:bg-[#1B44C8] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {pending ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Loading...
                </>
              ) : mode === 'signin' ? (
                'Sign In'
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Decorative dots — top right */}
          <span className="absolute right-1 top-1 pointer-events-none">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              {[38.6, 26.3, 14.0, 1.99].map((cy) =>
                [1.4, 13.7, 26.0, 38.3].map((cx) => (
                  <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.4" transform="rotate(-90 0 0)" fill="#3758F9" />
                ))
              )}
            </svg>
          </span>
          {/* Decorative dots — bottom left */}
          <span className="absolute bottom-1 left-1 pointer-events-none">
            <svg width="29" height="40" viewBox="0 0 29 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              {[26.0, 13.7, 38.0, 1.4].map((cy) =>
                [2.3, 14.6, 26.7].map((cx) => (
                  <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.4" fill="#3758F9" />
                ))
              )}
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
