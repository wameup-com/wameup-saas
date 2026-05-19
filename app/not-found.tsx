import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[100dvh] bg-[#F4F7FF]">
      <div className="max-w-[560px] text-center px-4">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2 mb-10">
          <div className="w-9 h-9 rounded-lg bg-[#3758F9] flex items-center justify-center">
            <span className="text-white font-bold text-base">W</span>
          </div>
          <span className="text-2xl font-bold text-[#111928]">Wameup</span>
        </Link>

        {/* 404 illustration */}
        <div className="mb-8 flex justify-center">
          <svg width="200" height="120" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="100" fontFamily="Inter, sans-serif" fontSize="100" fontWeight="800" fill="#3758F9" fillOpacity="0.08">404</text>
            <text x="8" y="96" fontFamily="Inter, sans-serif" fontSize="96" fontWeight="800" fill="#3758F9" fillOpacity="0.15">404</text>
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-[#111928] mb-4 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-base text-[#637381] mb-8 leading-relaxed">
          Oops! The page you are looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-[#3758F9] py-3 px-8 text-base font-medium text-white transition duration-300 hover:bg-[#1B44C8]"
          >
            Back to Home
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center rounded-md border border-[#DFE4EA] py-3 px-8 text-base font-medium text-[#637381] bg-white transition duration-300 hover:border-[#3758F9] hover:text-[#3758F9]"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </div>
  );
}
