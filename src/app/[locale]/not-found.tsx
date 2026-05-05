import Link from 'next/link';
import { Container } from '@/components/ui/container';

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-white py-20">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          <p className="text-8xl font-bold text-[#FFD600]">404</p>
          <h1 className="mt-4 text-2xl font-semibold text-[#0A0A0A]">
            Page not found
          </h1>
          <p className="mt-3 text-[#525252]">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[#FFD600] px-6 text-sm font-semibold text-[#0A0A0A] transition-opacity hover:opacity-90"
            >
              Go to homepage
            </Link>
            <Link
              href="/pricing"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-[#E5E5E5] px-6 text-sm font-medium text-[#525252] transition-colors hover:bg-[#F5F5F5]"
            >
              View pricing
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
