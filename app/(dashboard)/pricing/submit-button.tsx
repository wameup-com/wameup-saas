'use client';

import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

export function SubmitButton({ popular = false }: { popular?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full inline-flex items-center justify-center rounded-md py-3 px-7 text-base font-medium transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed ${
        popular
          ? 'bg-[#3758F9] text-white hover:bg-[#1B44C8]'
          : 'border border-[#3758F9] text-[#3758F9] bg-white hover:bg-[#3758F9] hover:text-white'
      }`}
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          Loading...
        </>
      ) : (
        'Get Started'
      )}
    </button>
  );
}
