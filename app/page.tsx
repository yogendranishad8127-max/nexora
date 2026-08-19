"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type ChannelStats = {
  name: string;
  handle: string;
  url: string;
  description: string;
  channelId: string;
  subscribers: number;
  last30DaysVideos: number;
  last30DaysViews: number;
  formatted: {
    subscribers: string;
    last30DaysVideos: string;
    last30DaysViews: string;
  };
};

type YouTubeResponse = {
  success: boolean;
  updatedAt?: string;
  channels?: ChannelStats[];
  error?: string;
};

const channels = [
  {
    name: "YBN PLAYX",
    handle: "@YBNPLAYX",
    url: "https://www.youtube.com/@YBNPLAYX",
    description: "Gaming, entertainment and creator content.",
  },
  {
    name: "YBN ShortsX",
    handle: "@YBN_ShortsX",
    url: "https://www.youtube.com/@YBN_ShortsX",
    description: "Short-form gaming and entertainment content.",
  },
  {
    name: "YBN BLOX",
    handle: "@YBNBLOX",
    url: "https://www.youtube.com/@YBNBLOX",
    description: "Roblox gaming, entertainment and creator content.",
  },
];

export default function Home() {
  const [youtubeData, setYoutubeData] =
    useState<YouTubeResponse | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadYouTubeStats() {
      try {
        const response = await fetch("/api/youtube", {
          cache: "no-store",
        });

        const data: YouTubeResponse = await response.json();

        if (mounted) {
          setYoutubeData(data);
        }
      } catch (error) {
        console.error("Failed to load YouTube stats:", error);

        if (mounted) {
          setYoutubeData({
            success: false,
            error: "Unable to load YouTube statistics.",
          });
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadYouTubeStats();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#02030a] text-white">

      {/* ========================================================= */}
      {/* GALAXY BACKGROUND                                         */}
      {/* ========================================================= */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

        {/* Deep Space */}
        <div className="absolute inset-0 bg-[#02030a]" />

        {/* Main Purple Galaxy */}
        <div
          className="
            absolute
            left-1/2
            top-[8%]
            h-[750px]
            w-[1200px]
            -translate-x-1/2
            rounded-full
            bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.25)_0%,rgba(59,130,246,0.12)_30%,rgba(2,3,10,0)_72%)]
            blur-3xl
          "
        />

        {/* Blue Nebula */}
        <div
          className="
            absolute
            -left-[300px]
            top-[30%]
            h-[750px]
            w-[750px]
            rounded-full
            bg-[radial-gradient(circle,rgba(37,99,235,0.18),transparent_68%)]
            blur-3xl
          "
        />

        {/* Purple Nebula */}
        <div
          className="
            absolute
            -right-[300px]
            top-[48%]
            h-[850px]
            w-[850px]
            rounded-full
            bg-[radial-gradient(circle,rgba(168,85,247,0.18),transparent_68%)]
            blur-3xl
          "
        />

        {/* Galaxy Disc */}
        <div
          className="
            absolute
            left-1/2
            top-[28%]
            h-[300px]
            w-[1200px]
            -translate-x-1/2
            rotate-[-12deg]
            rounded-[50%]
            bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.09)_0%,rgba(99,102,241,0.08)_20%,rgba(59,130,246,0.03)_45%,transparent_75%)]
            blur-2xl
            opacity-70
          "
        />

        {/* Stars */}
        <div
          className="
            absolute
            inset-0
            opacity-70
            [background-image:radial-gradient(circle_at_10%_20%,white_0.7px,transparent_1px),radial-gradient(circle_at_25%_70%,white_0.8px,transparent_1px),radial-gradient(circle_at_40%_35%,white_0.6px,transparent_1px),radial-gradient(circle_at_65%_15%,white_0.8px,transparent_1px),radial-gradient(circle_at_80%_55%,white_0.7px,transparent_1px),radial-gradient(circle_at_92%_25%,white_0.9px,transparent_1px),radial-gradient(circle_at_70%_85%,white_0.6px,transparent_1px)]
            [background-size:220px_220px,300px_300px,180px_180px,260px_260px,340px_340px,240px_240px,280px_280px]
          "
        />

        {/* Small Stars */}
        <div
          className="
            absolute
            inset-0
            opacity-40
            [background-image:radial-gradient(circle,rgba(147,197,253,0.9)_0.6px,transparent_0.8px)]
            [background-size:150px_150px]
          "
        />

        {/* Vignette */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.35)_70%,rgba(0,0,0,0.75)_100%)]
          "
        />

      </div>

      {/* ========================================================= */}
      {/* NAVBAR                                                     */}
      {/* ========================================================= */}

      <header
        className="
          sticky
          top-0
          z-50
          border-b
          border-white/[0.08]
          bg-[#02030a]/65
          backdrop-blur-2xl
        "
      >

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <Link
            href="/"
            className="
              bg-gradient-to-r
              from-white
              via-purple-200
              to-blue-300
              bg-clip-text
              text-xl
              font-black
              tracking-tight
              text-transparent
            "
          >
            YBN GROUP
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-gray-400 md:flex">

            <a
              href="#about"
              className="transition hover:text-white"
            >
              About
            </a>

            <a
              href="#youtube"
              className="transition hover:text-white"
            >
              YouTube
            </a>

            <a
              href="#building"
              className="transition hover:text-white"
            >
              What I'm Building
            </a>

            <a
              href="#contact"
              className="transition hover:text-white"
            >
              Contact
            </a>

          </nav>

          <Link
            href="/login"
            className="
              rounded-xl
              border
              border-white/10
              bg-white/[0.04]
              px-4
              py-2
              text-sm
              font-semibold
              backdrop-blur
              transition
              hover:border-purple-400/30
              hover:bg-purple-500/10
            "
          >
            Owner Login
          </Link>

        </div>

      </header>

      {/* ========================================================= */}
      {/* HERO                                                       */}
      {/* ========================================================= */}

      <section className="relative overflow-hidden">

        {/* HUGE YBN GROUP BACKGROUND */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-1/2
            -translate-y-1/2
            overflow-hidden
            select-none
          "
        >

          <div
            className="
              whitespace-nowrap
              text-center
              text-[18vw]
              font-black
              uppercase
              leading-none
              tracking-[-0.09em]
              bg-gradient-to-r
              from-purple-500/[0.025]
              via-white/[0.045]
              to-blue-500/[0.025]
              bg-clip-text
              text-transparent
            "
          >
            YBN GROUP
          </div>

        </div>

        {/* SECOND WATERMARK */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[58%]
            -translate-x-1/2
            -translate-y-1/2
            rotate-[-8deg]
            whitespace-nowrap
            text-[9vw]
            font-black
            uppercase
            tracking-[-0.08em]
            text-white/[0.012]
          "
        >
          YBN • CREATE • GROW
        </div>

        {/* HERO CONTENT */}

        <div
          className="
            relative
            mx-auto
            flex
            min-h-[780px]
            max-w-7xl
            items-center
            px-6
            py-28
          "
        >

          <div className="max-w-5xl">

            {/* Badge */}

            <div
              className="
                mb-7
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-purple-400/20
                bg-purple-500/[0.07]
                px-4
                py-2
                text-xs
                font-semibold
                uppercase
                tracking-[0.3em]
                text-purple-300
                backdrop-blur
              "
            >

              <span className="h-2 w-2 animate-pulse rounded-full bg-purple-400" />

              YBN GROUP

            </div>

            {/* MAIN HEADING */}

            <h1
              className="
                text-5xl
                font-black
                leading-[0.95]
                tracking-[-0.045em]
                sm:text-6xl
                md:text-8xl
              "
            >

              <span className="block text-white">
                Building a
              </span>

              <span
                className="
                  block
                  bg-gradient-to-r
                  from-white
                  via-purple-200
                  to-blue-300
                  bg-clip-text
                  text-transparent
                "
              >
                digital brand.
              </span>

              <span
                className="
                  mt-5
                  block
                  text-4xl
                  font-bold
                  text-gray-300
                  sm:text-5xl
                  md:text-6xl
                "
              >
                Creating. Gaming. Growing.
              </span>

            </h1>

            {/* DESCRIPTION */}

            <p
              className="
                mt-10
                max-w-2xl
                text-lg
                leading-8
                text-gray-400
                md:text-xl
              "
            >
              I'm Yogendra — a gamer, YouTuber, influencer and entrepreneur
              building my own digital ecosystem, creating content and turning
              ideas into real businesses.
            </p>

            {/* BUTTONS */}

            <div className="mt-10 flex flex-wrap gap-4">

              <a
                href="#youtube"
                className="
                  rounded-2xl
                  bg-white
                  px-7
                  py-3.5
                  font-bold
                  text-black
                  shadow-[0_0_50px_rgba(139,92,246,0.18)]
                  transition
                  hover:-translate-y-1
                  hover:bg-gray-100
                "
              >
                Explore My Channels
              </a>

              <a
                href="#contact"
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  px-7
                  py-3.5
                  font-bold
                  backdrop-blur
                  transition
                  hover:-translate-y-1
                  hover:border-purple-400/30
                  hover:bg-purple-500/10
                "
              >
                Connect With Me
              </a>

            </div>

            {/* HERO STATS */}

            <div className="mt-16 flex flex-wrap items-center gap-8 text-sm">

              <div>

                <p className="text-2xl font-black text-white">
                  YBN
                </p>

                <p className="mt-1 text-gray-500">
                  Digital Brand
                </p>

              </div>

              <div className="h-12 w-px bg-white/10" />

              <div>

                <p className="text-2xl font-black text-white">
                  Gaming
                </p>

                <p className="mt-1 text-gray-500">
                  Content & Community
                </p>

              </div>

              <div className="h-12 w-px bg-white/10" />

              <div>

                <p className="text-2xl font-black text-white">
                  ∞
                </p>

                <p className="mt-1 text-gray-500">
                  Ideas & Ambition
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Hero Bottom Fade */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-0
            left-0
            right-0
            h-48
            bg-gradient-to-t
            from-[#02030a]
            to-transparent
          "
        />

      </section>

      {/* ========================================================= */}
      {/* ABOUT                                                       */}
      {/* ========================================================= */}

      <section
        id="about"
        className="relative border-t border-white/[0.07]"
      >

        <div className="mx-auto max-w-7xl px-6 py-28">

          <div className="grid gap-16 md:grid-cols-2 md:items-center">

            <div>

              <p className="text-sm font-bold uppercase tracking-[0.3em] text-purple-400">
                About Me
              </p>

              <h2 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
                I'm Yogendra.
              </h2>

              <div
                className="
                  mt-6
                  h-1
                  w-20
                  rounded-full
                  bg-gradient-to-r
                  from-purple-500
                  to-blue-500
                "
              />

            </div>

            <div className="space-y-6 text-lg leading-8 text-gray-400">

              <p>
                I'm a gamer, YouTuber, influencer and entrepreneur focused on
                creating meaningful content and building things people can
                connect with.
              </p>

              <p>
                My journey began with gaming and content creation, but the
                vision goes far beyond making videos. I'm working towards
                building my own brand, business and digital ecosystem.
              </p>

              <p>
                YBN GROUP represents that journey — bringing together content,
                creativity, technology and business under one growing vision.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ========================================================= */}
      {/* YOUTUBE                                                     */}
      {/* ========================================================= */}

      <section
        id="youtube"
        className="relative border-t border-white/[0.07]"
      >

        <div className="mx-auto max-w-7xl px-6 py-28">

          <div className="mb-12">

            <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-400">
              YouTube
            </p>

            <h2 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
              YBN Channels
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-500">
              Follow the latest gaming videos, entertainment and short-form
              content from the YBN creator network.
            </p>

          </div>

          {/* LIVE STATUS */}

          {!loading && youtubeData?.success && (
            <div className="mb-8 flex items-center gap-3 text-sm text-gray-500">

              <span className="relative flex h-2.5 w-2.5">

                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />

                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />

              </span>

              Live YouTube statistics

            </div>
          )}

          {/* ERROR */}

          {youtubeData?.success === false && !loading && (
            <div
              className="
                mb-8
                rounded-2xl
                border
                border-red-500/20
                bg-red-500/5
                px-5
                py-4
                text-sm
                text-red-400
              "
            >
              {youtubeData.error || "Unable to load YouTube statistics."}
            </div>
          )}

          {/* CHANNEL CARDS */}

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {channels.map((channel) => {

              const stats = youtubeData?.channels?.find(
                (item) => item.handle === channel.handle
              );

              return (
                <div
                  key={channel.name}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[2rem]
                    border
                    border-white/[0.08]
                    bg-white/[0.035]
                    p-7
                    backdrop-blur-xl
                    transition
                    duration-300
                    hover:-translate-y-1
                    hover:border-purple-400/20
                    hover:bg-white/[0.06]
                  "
                >

                  {/* Card Glow */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-20
                      -top-20
                      h-40
                      w-40
                      rounded-full
                      bg-red-500/10
                      blur-3xl
                      transition
                      group-hover:bg-purple-500/20
                    "
                  />

                  <div className="relative">

                    {/* HEADER */}

                    <div className="flex items-start justify-between">

                      <div>

                        <p className="text-sm text-gray-500">
                          YouTube Channel
                        </p>

                        <h3 className="mt-2 text-2xl font-black">
                          {stats?.name || channel.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {channel.handle}
                        </p>

                      </div>

                      <div
                        className="
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-2xl
                          bg-red-500/10
                          text-xl
                          text-red-400
                        "
                      >
                        ▶
                      </div>

                    </div>

                    {/* DESCRIPTION */}

                    <p className="mt-6 min-h-[48px] text-sm leading-6 text-gray-500">
                      {stats?.description || channel.description}
                    </p>

                    {/* STATS */}

                    <div className="mt-8 grid grid-cols-3 gap-2">

                      {/* Subscribers */}

                      <div
                        className="
                          rounded-2xl
                          border
                          border-white/[0.07]
                          bg-black/20
                          p-3
                        "
                      >

                        <p className="text-[10px] uppercase tracking-wider text-gray-600">
                          Subscribers
                        </p>

                        <p className="mt-2 text-lg font-black">
                          {loading
                            ? "..."
                            : stats
                              ? stats.formatted.subscribers
                              : "—"}
                        </p>

                      </div>

                      {/* Videos */}

                      <div
                        className="
                          rounded-2xl
                          border
                          border-white/[0.07]
                          bg-black/20
                          p-3
                        "
                      >

                        <p className="text-[10px] uppercase tracking-wider text-gray-600">
                          30D Videos
                        </p>

                        <p className="mt-2 text-lg font-black">
                          {loading
                            ? "..."
                            : stats
                              ? stats.formatted.last30DaysVideos
                              : "—"}
                        </p>

                      </div>

                      {/* Views */}

                      <div
                        className="
                          rounded-2xl
                          border
                          border-white/[0.07]
                          bg-black/20
                          p-3
                        "
                      >

                        <p className="text-[10px] uppercase tracking-wider text-gray-600">
                          30D Views
                        </p>

                        <p className="mt-2 text-lg font-black">
                          {loading
                            ? "..."
                            : stats
                              ? stats.formatted.last30DaysViews
                              : "—"}
                        </p>

                      </div>

                    </div>

                    {/* BUTTON */}

                    <a
                      href={channel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        mt-7
                        inline-flex
                        rounded-xl
                        border
                        border-white/10
                        bg-white/[0.03]
                        px-5
                        py-3
                        text-sm
                        font-bold
                        transition
                        hover:border-red-400/30
                        hover:bg-red-500/10
                      "
                    >
                      Visit Channel →
                    </a>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </section>

      {/* ========================================================= */}
      {/* WHAT I'M BUILDING                                          */}
      {/* ========================================================= */}

      <section
        id="building"
        className="relative border-t border-white/[0.07]"
      >

        <div className="mx-auto max-w-7xl px-6 py-28">

          <p className="text-sm font-bold uppercase tracking-[0.3em] text-purple-400">
            The Vision
          </p>

          <h2 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
            What I'm Building
          </h2>

          <div className="mt-14 grid gap-5 md:grid-cols-3">

            {/* GAMING */}

            <div
              className="
                group
                rounded-[2rem]
                border
                border-white/[0.08]
                bg-white/[0.035]
                p-8
                backdrop-blur-xl
                transition
                hover:-translate-y-1
                hover:border-purple-400/20
              "
            >

              <div className="text-4xl transition group-hover:scale-110">
                🎮
              </div>

              <h3 className="mt-7 text-2xl font-black">
                Gaming & Content
              </h3>

              <p className="mt-4 text-sm leading-7 text-gray-500">
                Creating entertaining gaming content, videos and communities
                around the things I enjoy.
              </p>

            </div>

            {/* BRAND */}

            <div
              className="
                group
                rounded-[2rem]
                border
                border-white/[0.08]
                bg-white/[0.035]
                p-8
                backdrop-blur-xl
                transition
                hover:-translate-y-1
                hover:border-blue-400/20
              "
            >

              <div className="text-4xl transition group-hover:scale-110">
                🚀
              </div>

              <h3 className="mt-7 text-2xl font-black">
                Digital Brand
              </h3>

              <p className="mt-4 text-sm leading-7 text-gray-500">
                Growing YBN into a recognizable digital brand through content,
                creativity and technology.
              </p>

            </div>

            {/* BUSINESS */}

            <div
              className="
                group
                rounded-[2rem]
                border
                border-white/[0.08]
                bg-white/[0.035]
                p-8
                backdrop-blur-xl
                transition
                hover:-translate-y-1
                hover:border-green-400/20
              "
            >

              <div className="text-4xl transition group-hover:scale-110">
                💼
              </div>

              <h3 className="mt-7 text-2xl font-black">
                Business
              </h3>

              <p className="mt-4 text-sm leading-7 text-gray-500">
                Building my own businesses and turning ideas into meaningful
                products, opportunities and long-term ventures.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ========================================================= */}
      {/* CONTACT                                                     */}
      {/* ========================================================= */}

      <section
        id="contact"
        className="relative border-t border-white/[0.07]"
      >

        <div className="mx-auto max-w-7xl px-6 py-28">

          <div className="max-w-3xl">

            <p className="text-sm font-bold uppercase tracking-[0.3em] text-purple-400">
              Contact
            </p>

            <h2 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
              Let's Connect.
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-500">
              For business inquiries, collaborations, partnerships or
              opportunities, feel free to reach out.
            </p>

          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">

            {/* EMAIL */}

            <a
              href="mailto:officialbusinessybn@gmail.com"
              className="
                rounded-[1.5rem]
                border
                border-white/[0.08]
                bg-white/[0.035]
                p-7
                backdrop-blur-xl
                transition
                hover:-translate-y-1
                hover:border-purple-400/20
              "
            >

              <p className="text-sm text-gray-500">
                Email
              </p>

              <p className="mt-3 break-all font-semibold">
                officialbusinessybn@gmail.com
              </p>

            </a>

            {/* INSTAGRAM */}

            <a
              href="https://www.instagram.com/ybnplayz/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="
                rounded-[1.5rem]
                border
                border-white/[0.08]
                bg-white/[0.035]
                p-7
                backdrop-blur-xl
                transition
                hover:-translate-y-1
                hover:border-pink-400/20
              "
            >

              <p className="text-sm text-gray-500">
                Instagram
              </p>

              <p className="mt-3 font-semibold">
                @ybnplayz
              </p>

            </a>

            {/* DISCORD */}

            <a
              href="https://discord.gg/qAgEwa8cee"
              target="_blank"
              rel="noopener noreferrer"
              className="
                rounded-[1.5rem]
                border
                border-white/[0.08]
                bg-white/[0.035]
                p-7
                backdrop-blur-xl
                transition
                hover:-translate-y-1
                hover:border-blue-400/20
              "
            >

              <p className="text-sm text-gray-500">
                Discord
              </p>

              <p className="mt-3 font-semibold">
                Join the Community
              </p>

            </a>

          </div>

        </div>

      </section>

      {/* ========================================================= */}
      {/* FOOTER                                                      */}
      {/* ========================================================= */}

      <footer className="border-t border-white/[0.07]">

        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            gap-3
            px-6
            py-10
            text-sm
            text-gray-600
            md:flex-row
            md:items-center
            md:justify-between
          "
        >

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