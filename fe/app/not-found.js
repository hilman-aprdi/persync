import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="site-shell flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl rounded-[28px] border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.24em] text-white/36">404</p>
        <h1
          className="mt-4 text-3xl font-semibold text-white"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          Halaman tidak ditemukan.
        </h1>
        <p className="mt-4 text-base leading-8 text-white/55">
          Coba kembali ke home atau mulai analisis bisnis baru.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-secondary">
            Kembali ke home
          </Link>
          <Link href="/new" className="btn-primary">
            Buka sesi baru
          </Link>
        </div>
      </div>
    </main>
  );
}
