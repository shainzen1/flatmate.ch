"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useMemo } from "react";
import {
  MapPin,
  BedDouble,
  House,
  Sparkles,
} from "lucide-react";
import { listings } from "@/lib/mvp-data";
import { VibeTag } from "@/components/mvp/vibe-tag";
import { Button } from "@/components/ui/button";
import { calculateMatchScore, getTopMatchTags } from "@/lib/matching";
import { useUserVibe } from "@/components/mvp/user-vibe-context";
import { FeedHeader } from "@/components/mvp/feed-header";

export default function ListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { sliders: userSelections } = useUserVibe();

  const listing = useMemo(() => {
    return listings.find((l) => l.id === params.id);
  }, [params.id]);

  const matchScore = useMemo(() => {
    if (!listing) return 0;
    return calculateMatchScore(userSelections, listing);
  }, [listing, userSelections]);

  const topTags = useMemo(() => {
    if (!listing) return [];
    return getTopMatchTags(userSelections, listing);
  }, [listing, userSelections]);

  if (!listing) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-center">
        <h1 className="text-2xl font-bold">Listing not found</h1>
        <p className="mt-2 text-muted-foreground">
          The WG you are looking for does not exist.
        </p>
        <Button className="mt-6" onClick={() => router.push("/app/feed")}>
          Back to feed
        </Button>
      </div>
    );
  }

  const matchingTags = listing.vibeTags.filter((tag) =>
    Object.values(userSelections).some((val) =>
      typeof val === "string" ? val === tag : false
    )
  );
  const otherTags = listing.vibeTags.filter(
    (tag) => !matchingTags.includes(tag)
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <FeedHeader view="list" />

      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="grid gap-8 md:grid-cols-[1fr,360px]">
          <div className="space-y-8">
            {/* Gallery */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60">
                <Image
                  src={listing.images.room}
                  alt="Room"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg bg-black/40 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-md">
                  <BedDouble className="size-3" />
                  Room
                </div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60">
                <Image
                  src={listing.images.flat}
                  alt="Flat"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg bg-black/40 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-md">
                  <House className="size-3" />
                  Common Area
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4" />
                {listing.location.neighborhood}, {listing.location.city}
              </div>
              <h1 className="mt-2 text-3xl font-bold tracking-tight">
                {listing.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {listing.description}
              </p>
            </div>

            <section>
              <h2 className="text-xl font-semibold tracking-tight">
                Vibe & Compatibility
              </h2>
              {topTags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {topTags.map((t) => (
                    <span
                      key={t.dimensionId}
                      className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                    >
                      {t.label}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                {matchingTags.map((v) => (
                  <VibeTag key={v} vibeId={v} highlight />
                ))}
                {otherTags.map((v) => (
                  <VibeTag key={v} vibeId={v} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold tracking-tight">
                Your Potential Flatmates
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {listing.flatmates.map((fm) => (
                  <div
                    key={fm.name}
                    className="flex items-center gap-4 rounded-2xl border border-border p-4 transition-colors hover:bg-muted/30"
                  >
                    <Image
                      src={`https://api.dicebear.com/9.x/adventurer/png?seed=${encodeURIComponent(fm.name)}&size=120`}
                      alt={fm.name}
                      width={60}
                      height={60}
                      className="rounded-full border border-border shadow-sm"
                    />
                    <div>
                      <h4 className="font-bold">{fm.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {fm.age} &middot; {fm.occupation}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground italic">
                        In the flat for {fm.since}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="sticky top-24 h-fit">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/5">
              {Object.keys(userSelections).length > 0 && (
                <div className="mb-6 flex flex-col items-center rounded-2xl bg-primary/5 p-4 text-center ring-1 ring-inset ring-primary/20">
                  <Sparkles className="size-6 text-primary" />
                  <div className="mt-1 text-2xl font-black text-primary">
                    {matchScore}% Match
                  </div>
                  <div className="mt-0.5 text-xs font-medium text-primary/60">
                    Based on your onboarding vibes
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex justify-between border-b border-border/50 pb-4">
                  <span className="text-muted-foreground">Monthly Rent</span>
                  <span className="text-xl font-bold tracking-tight">
                    CHF {listing.room.price}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-4 text-sm">
                  <span className="text-muted-foreground">Available from</span>
                  <span className="font-semibold">
                    {new Date(listing.room.available).toLocaleDateString(
                      "de-CH",
                      { day: "numeric", month: "long", year: "numeric" }
                    )}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-4 text-sm">
                  <span className="text-muted-foreground">Room size</span>
                  <span className="font-semibold">{listing.room.size} m²</span>
                </div>
              </div>

              <Button className="mt-8 w-full rounded-xl py-6 text-md font-bold shadow-lg shadow-primary/25">
                Send Application
              </Button>
              <p className="mt-4 text-center text-xs text-muted-foreground leading-tight">
                Express interest now. The community is looking for someone with
                your vibes!
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
