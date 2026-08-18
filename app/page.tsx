export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="text-xl font-bold tracking-tight">
            NEXORA
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-300">
            <a href="#about" className="hover:text-white">
              About
            </a>

            <a href="#contact" className="hover:text-white">
              Contact
            </a>

            <a
              href="/login"
              className="rounded-lg bg-white px-4 py-2 font-medium text-black hover:bg-gray-200"
            >
              Login
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-600/20 blur-3xl" />

        <div className="relative mx-auto flex min-h-[650px] max-w-5xl flex-col items-center justify-center px-6 text-center">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-purple-400">
            Personal • Business • Vision
          </p>

          <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-7xl">
            Building ideas into{" "}
            <span className="text-purple-400">
              something real.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            Welcome to my personal space on the internet.
            This is where I share who I am, what I build,
            and the work I choose to make public.
          </p>

          <div className="mt-10 flex gap-4">
            <a
              href="#about"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-black hover:bg-gray-200"
            >
              About Me
            </a>

            <a
              href="#contact"
              className="rounded-xl border border-white/20 px-6 py-3 font-semibold hover:bg-white/10"
            >
              Contact
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="border-t border-white/10"
      >
        <div className="mx-auto max-w-5xl px-6 py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
            About
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            A little about me
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            I am building my own path through technology,
            content, business and new ideas. This website
            will become the public face of that journey.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="border-t border-white/10"
      >
        <div className="mx-auto max-w-5xl px-6 py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
            Contact
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Get in touch
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            For genuine enquiries and collaborations,
            you can get in touch with me here.
          </p>

          <button className="mt-8 rounded-xl bg-white px-6 py-3 font-semibold text-black hover:bg-gray-200">
            Contact Me
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-gray-500">
          © 2026 NEXORA. All rights reserved.
        </div>
      </footer>
    </main>
  );
}