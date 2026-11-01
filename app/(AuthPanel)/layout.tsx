import DuneArt from "@/app/components/DuneArt";
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
