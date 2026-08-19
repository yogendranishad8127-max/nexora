import { NextResponse } from "next/server";

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

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        success: false,
        error: "YOUTUBE_API_KEY is not configured.",
      },
      { status: 500 }
    );
  }

  try {
    const results = await Promise.all(
      channels.map(async (channel) => {
        // ==========================================
        // GET CHANNEL INFORMATION
        // ==========================================

        const channelUrl = new URL(
          "https://www.googleapis.com/youtube/v3/channels"
        );

        channelUrl.searchParams.set("part", "snippet,statistics");
        channelUrl.searchParams.set("forHandle", channel.handle);
        channelUrl.searchParams.set("key", apiKey);

        const channelResponse = await fetch(channelUrl.toString(), {
          cache: "no-store",
        });

        if (!channelResponse.ok) {
          throw new Error(
            `Channel API error for ${channel.handle}: ${channelResponse.status}`
          );
        }

        const channelData = await channelResponse.json();

        const channelItem = channelData.items?.[0];

        if (!channelItem) {
          throw new Error(`Channel not found: ${channel.handle}`);
        }

        const channelId = channelItem.id;

        // ==========================================
        // LAST 30 DAYS DATE
        // ==========================================

        const thirtyDaysAgo = new Date();

        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        // ==========================================
        // GET VIDEOS FROM LAST 30 DAYS
        // ==========================================

        const searchUrl = new URL(
          "https://www.googleapis.com/youtube/v3/search"
        );

        searchUrl.searchParams.set("part", "snippet");
        searchUrl.searchParams.set("channelId", channelId);
        searchUrl.searchParams.set("type", "video");
        searchUrl.searchParams.set("order", "date");
        searchUrl.searchParams.set(
          "publishedAfter",
          thirtyDaysAgo.toISOString()
        );
        searchUrl.searchParams.set("maxResults", "50");
        searchUrl.searchParams.set("key", apiKey);

        const searchResponse = await fetch(searchUrl.toString(), {
          cache: "no-store",
        });

        if (!searchResponse.ok) {
          throw new Error(
            `Search API error for ${channel.handle}: ${searchResponse.status}`
          );
        }

        const searchData = await searchResponse.json();

        // ==========================================
        // GET VIDEO IDS
        // ==========================================

        const videoIds =
          searchData.items
            ?.map(
              (item: {
                id?: {
                  videoId?: string;
                };
              }) => item.id?.videoId
            )
            .filter((id: string | undefined): id is string => Boolean(id)) ??
          [];

        // ==========================================
        // GET VIDEO STATISTICS
        // ==========================================

        let last30DaysViews = 0;

        if (videoIds.length > 0) {
          const videosUrl = new URL(
            "https://www.googleapis.com/youtube/v3/videos"
          );

          videosUrl.searchParams.set("part", "statistics");
          videosUrl.searchParams.set("id", videoIds.join(","));
          videosUrl.searchParams.set("key", apiKey);

          const videosResponse = await fetch(videosUrl.toString(), {
            cache: "no-store",
          });

          if (!videosResponse.ok) {
            throw new Error(
              `Videos API error for ${channel.handle}: ${videosResponse.status}`
            );
          }

          const videosData = await videosResponse.json();

          last30DaysViews =
            videosData.items?.reduce(
              (
                total: number,
                video: {
                  statistics?: {
                    viewCount?: string;
                  };
                }
              ) => {
                return (
                  total + Number(video.statistics?.viewCount ?? 0)
                );
              },
              0
            ) ?? 0;
        }

        // ==========================================
        // CHANNEL STATS
        // ==========================================

        const subscribers = Number(
          channelItem.statistics?.subscriberCount ?? 0
        );

        const last30DaysVideos = videoIds.length;

        // ==========================================
        // RETURN CHANNEL DATA
        // ==========================================

        return {
          name: channelItem.snippet?.title ?? channel.name,

          handle: channel.handle,

          url: channel.url,

          description:
            channelItem.snippet?.description || channel.description,

          channelId,

          subscribers,

          last30DaysVideos,

          last30DaysViews,

          formatted: {
            subscribers: formatNumber(subscribers),

            last30DaysVideos: formatNumber(last30DaysVideos),

            last30DaysViews: formatNumber(last30DaysViews),
          },
        };
      })
    );

    // ==========================================
    // FINAL RESPONSE
    // ==========================================

    return NextResponse.json({
      success: true,

      updatedAt: new Date().toISOString(),

      channels: results,
    });
  } catch (error) {
    console.error("YouTube API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to fetch YouTube data.",
      },
      { status: 500 }
    );
  }
}