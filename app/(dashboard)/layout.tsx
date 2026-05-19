'use client';

import Link from 'next/link';
import { useEffect, useState, Suspense } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from '@/app/(login)/actions';
import { User } from '@/lib/db/schema';
import useSWR, { mutate } from 'swr';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Home, LogOut, Menu, X } from 'lucide-react';
import { Footer } from '@/components/Footer';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const navLinks = [
  { title: 'Features', href: '/#features' },
  { title: 'Pricing', href: '/pricing' },
];

function UserMenu({ isHome, sticky }: { isHome: boolean; sticky: boolean }) {
  const { data: user } = useSWR<User>('/api/user', fetcher);
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    mutate('/api/user');
    router.push('/');
  }

  const isTransparent = isHome && !sticky;

  if (!user) {
    return (
      <>
        <Link
          href="/sign-in"
          className={`py-2 px-5 text-base font-medium transition-opacity ${
            isTransparent ? 'text-white hover:opacity-70' : 'text-[#637381] hover:text-[#3758F9]'
          }`}
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className={`rounded-md py-2 px-6 text-base font-medium transition-all duration-300 ${
            isTransparent
              ? 'bg-white/20 text-white hover:bg-white hover:text-[#111928]'
              : 'bg-[#3758F9] text-white hover:bg-[#1B44C8]'
          }`}
        >
          Get Started
        </Link>
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer size-9">
          <AvatarFallback className="bg-[#3758F9] text-white font-semibold">
            {user.email[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-1">
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/dashboard" className="flex w-full items-center">
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <form action={handleSignOut} className="w-full">
          <button type="submit" className="flex w-full">
            <DropdownMenuItem className="w-full flex-1 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [sticky, setSticky] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isTransparent = isHome && !sticky;

  const headerClass = sticky
    ? 'fixed bg-white/90 backdrop-blur-sm shadow-sm'
    : isHome
    ? 'absolute bg-transparent'
    : 'relative bg-white border-b border-[#DFE4EA]';

  const linkClass = isTransparent
    ? 'text-white hover:opacity-70'
    : 'text-[#637381] hover:text-[#3758F9]';

  return (
    <header className={`top-0 left-0 z-40 w-full transition-all duration-300 ${headerClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 lg:py-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#3758F9] flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className={`text-xl font-bold transition-colors ${isTransparent ? 'text-white' : 'text-[#111928]'}`}>
              Wameup
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`text-base font-medium transition-colors ${linkClass}`}>
                {link.title}
              </Link>
            ))}
          </nav>

          {/* Desktop auth buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <Suspense fallback={<div className="h-9 w-36" />}>
              <UserMenu isHome={isHome} sticky={sticky} />
            </Suspense>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className={`h-6 w-6 ${isTransparent ? 'text-white' : 'text-[#111928]'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isTransparent ? 'text-white' : 'text-[#111928]'}`} />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white rounded-xl shadow-lg p-5 mb-4 border border-[#DFE4EA]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2.5 text-base font-medium text-[#637381] hover:text-[#3758F9] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.title}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-[#DFE4EA] flex flex-col gap-2">
              <Link
                href="/sign-in"
                className="py-2 text-center text-base font-medium text-[#111928] hover:text-[#3758F9]"
                onClick={() => setMobileOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="rounded-md bg-[#3758F9] py-2 px-6 text-center text-base font-medium text-white hover:bg-[#1B44C8] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </section>
  );
}
