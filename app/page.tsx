import Link from "next/link";

const channels = [
  {
    name: "YBN PLAYX",
    handle: "@YBNPLAYX",
    url: "https://www.youtube.com/@YBNPLAYX",
  },
  {
    name: "YBN ShortsX",
    handle: "@YBN_ShortsX",
    url: "https://www.youtube.com/@YBN_ShortsX",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">

      {/* ================= NAVBAR ================= */}

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <Link
            href="/"
            className="text-xl font-bold tracking-tight"
          >
            YBN GROUP
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-gray-400 md:flex">
            <a href="#about" className="hover:text-white">
              About
            </a>

            <a href="#youtube" className="hover:text-white">
              YouTube
            </a>

            <a href="#building" className="hover:text-white">
              What I'm Building
            </a>

            <a href="#contact" className="hover:text-white">
              Contact
            </a>
          </nav>

          <Link
            href="/login"
            className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/10"
          >
            Owner Login
          </Link>

        </div>
      </header>

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden">

        <div className="mx-auto max-w-7xl px-6 py-24 md:py-36">

          <div className="max-w-4xl">

            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">
              YBN GROUP
            </p>

            <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
              Building a digital brand.
              <br />
              Creating. Gaming. Growing.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-400">
              I'm Yogendra — a gamer, YouTuber, influencer and entrepreneur
              building my own digital ecosystem, creating content and working
              towards turning ideas into real businesses.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <a
                href="#youtube"
                className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
              >
                Explore My Channels
              </a>

              <a
                href="#contact"
                className="rounded-xl border border-white/10 px-6 py-3 font-semibold transition hover:bg-white/10"
              >
                Connect With Me
              </a>

            </div>

          </div>

        </div>

      </section>

      {/* ================= ABOUT ================= */}

      <section
        id="about"
        className="border-t border-white/10"
      >

        <div className="mx-auto max-w-7xl px-6 py-24">

          <div className="grid gap-12 md:grid-cols-2 md:items-center">

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
                About Me
              </p>

              <h2 className="mt-4 text-4xl font-bold">
                I'm Yogendra.
              </h2>

            </div>

            <div className="space-y-5 text-gray-400 leading-7">

              <p>
                I'm a gamer, YouTuber, influencer and entrepreneur focused on
                creating things that people can connect with.
              </p>

              <p>
                My journey started with gaming and content creation, but the
                vision goes beyond just making videos. I'm working towards
                building my own brand, business and digital ecosystem.
              </p>

              <p>
                YBN GROUP represents that journey — a place where content,
                creativity, technology and business come together.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= YOUTUBE ================= */}

      <section
        id="youtube"
        className="border-t border-white/10 bg-[#080808]"
      >

        <div className="mx-auto max-w-7xl px-6 py-24">

          <div className="mb-12">

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-400">
              YouTube
            </p>

            <h2 className="mt-4 text-4xl font-bold">
              My Channels
            </h2>

            <p className="mt-4 max-w-2xl text-gray-500">
              Follow my content across gaming, entertainment, shorts and
              everything I'm building along the way.
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {channels.map((channel) => (

              <div
                key={channel.name}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-white/20 hover:bg-white/[0.05]"
              >

                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-sm text-gray-500">
                      YouTube Channel
                    </p>

                    <h3 className="mt-2 text-2xl font-bold">
                      {channel.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {channel.handle}
                    </p>

                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-xl">
                    ▶
                  </div>

                </div>

                {/* LIVE STATS */}

                <div className="mt-8 grid grid-cols-3 gap-3">

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">

                    <p className="text-xs text-gray-500">
                      Current
                    </p>

                    <p className="mt-2 text-lg font-bold">
                      —
                    </p>

                    <p className="mt-1 text-xs text-gray-600">
                      Subscribers
                    </p>

                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">

                    <p className="text-xs text-gray-500">
                      Last 30 Days
                    </p>

                    <p className="mt-2 text-lg font-bold">
                      —
                    </p>

                    <p className="mt-1 text-xs text-gray-600">
                      Videos
                    </p>

                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">

                    <p className="text-xs text-gray-500">
                      Last 30 Days
                    </p>

                    <p className="mt-2 text-lg font-bold">
                      —
                    </p>

                    <p className="mt-1 text-xs text-gray-600">
                      Views
                    </p>

                  </div>

                </div>

                <a
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
                >
                  Visit Channel →
                </a>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= WHAT I'M BUILDING ================= */}

      <section
        id="building"
        className="border-t border-white/10"
      >

        <div className="mx-auto max-w-7xl px-6 py-24">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
            The Vision
          </p>

          <h2 className="mt-4 text-4xl font-bold">
            What I'm Building
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-3">

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">

              <div className="text-3xl">🎮</div>

              <h3 className="mt-6 text-xl font-semibold">
                Gaming & Content
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Building entertaining gaming content, videos and communities
                around the things I enjoy.
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">

              <div className="text-3xl">🚀</div>

              <h3 className="mt-6 text-xl font-semibold">
                Digital Brand
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Growing YBN into a recognizable digital brand through content,
                creativity and technology.
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">

              <div className="text-3xl">💼</div>

              <h3 className="mt-6 text-xl font-semibold">
                Business
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Working towards building my own businesses and turning ideas
                into meaningful products and opportunities.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= CONTACT ================= */}

      <section
        id="contact"
        className="border-t border-white/10 bg-[#080808]"
      >

        <div className="mx-auto max-w-7xl px-6 py-24">

          <div className="max-w-3xl">

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
              Contact
            </p>

            <h2 className="mt-4 text-4xl font-bold">
              Let's Connect.
            </h2>

            <p className="mt-5 text-gray-500">
              For business inquiries, collaborations, partnerships or
              opportunities, feel free to reach out.
            </p>

          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">

            <a
              href="mailto:officialbusinessybn@gmail.com"
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:bg-white/[0.06]"
            >

              <p className="text-sm text-gray-500">
                Email
              </p>

              <p className="mt-3 font-medium">
                officialbusinessybn@gmail.com
              </p>

            </a>

            <a
              href="https://www.instagram.com/ybnplayz/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:bg-white/[0.06]"
            >

              <p className="text-sm text-gray-500">
                Instagram
              </p>

              <p className="mt-3 font-medium">
                @ybnplayz
              </p>

            </a>

            <a
              href="https://discord.gg/qAgEwa8cee"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:bg-white/[0.06]"
            >

              <p className="text-sm text-gray-500">
                Discord
              </p>

              <p className="mt-3 font-medium">
                Join the Community
              </p>

            </a>

          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-white/10">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-gray-600 md:flex-row md:items-center md:justify-between">

          <p>
            © 2026 YBN GROUP. All rights reserved.
          </p>

          <p>
            Built by Yogendra.
          </p>

        </div>

      </footer>

    </main>
  );
}