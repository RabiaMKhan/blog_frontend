export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <main className="flex flex-1 items-center justify-center bg-page px-4 py-10">
      <div className="flex w-full max-w-4xl gap-4 rounded-2xl bg-card p-3 shadow-2xl shadow-black/40">
        <aside className="relative hidden min-h-140 w-[45%] flex-col justify-between overflow-hidden rounded-xl p-6 md:flex">
          <DuneArt />

          <span className="relative text-2xl font-light tracking-[0.2em] text-light">BLOG</span>

          <div className="relative text-center">
            <p className="text-2xl leading-snug text-light">
              Sharing Stories,
              <br />
              Inspiring Minds
            </p>
            <div className="mt-6 flex justify-center gap-2" aria-hidden>
              <span className="h-1 w-5 rounded-full bg-light/30" />
              <span className="h-1 w-5 rounded-full bg-light/30" />
              <span className="h-1 w-8 rounded-full bg-light" />
            </div>
          </div>
        </aside>

        <section className="flex flex-1 flex-col justify-center px-6 py-10 md:px-12">
          {children}
        </section>
      </div>
    </main>
  );
}

// Decorative desert-at-dusk illustration for the left panel
function DuneArt() {
  return (
    <svg
      viewBox="0 0 400 600"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="auth-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b2d86" />
          <stop offset="0.5" stopColor="#594ba0" />
          <stop offset="1" stopColor="#86819e" />
        </linearGradient>
        <linearGradient id="auth-dune-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#625d73" />
          <stop offset="1" stopColor="#41394f" />
        </linearGradient>
        <linearGradient id="auth-dune-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#41394f" />
          <stop offset="1" stopColor="#261f32" />
        </linearGradient>
      </defs>
      <rect width="400" height="600" fill="url(#auth-sky)" />
      <path
        d="M0 330 C80 300 150 225 230 248 C300 268 350 318 400 328 L400 600 L0 600 Z"
        fill="url(#auth-dune-back)"
      />
      <path
        d="M0 430 C100 385 200 400 262 452 C312 492 360 502 400 496 L400 600 L0 600 Z"
        fill="url(#auth-dune-front)"
      />
    </svg>
  );
}
