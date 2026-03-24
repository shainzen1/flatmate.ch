import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Banknote,
  Ruler,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import type { Listing, VibeSliderValues } from "@/lib/mvp-data";
import { getTopMatchTags } from "@/lib/matching";

export function FeedCard({
  listing,
  userSelections,
}: {
  listing: Listing & { score?: number };
  userSelections: Partial<VibeSliderValues>;
}) {
  const matchScore = listing.score ?? 0;
  const topTags = getTopMatchTags(userSelections, listing);

  return (
    <Link href={`/app/feed/${listing.id}`} className="block group">
      <article className="overflow-hidden rounded-2xl border border-[#F3F4F6] bg-white shadow-sm transition-all hover:shadow-md hover:border-primary/30">
        {/* Header row — title + chemistry badge */}
        <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-3">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold tracking-tight group-hover:text-primary transition-colors">
              {listing.title}
            </h3>
            <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              {listing.location.neighborhood}, {listing.location.city}
            </div>
          </div>

          {/* Chemistry Score Badge */}
          <div
            className={`shrink-0 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold shadow-sm ${
              matchScore > 80
                ? "bg-primary text-primary-foreground"
                : matchScore > 50
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
            }`}
          >
            <Sparkles className="size-3.5" />
            {matchScore}% Match
          </div>
        </div>

        {/* Top 3 Matching Tags */}
        {topTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 px-5 pb-3">
            {topTags.map((t) => (
              <span
                key={t.dimensionId}
                className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary"
              >
                {t.label}
              </span>
            ))}
          </div>
        )}

        {/* Room photo */}
        <div className="mx-5 mb-4 overflow-hidden rounded-xl border border-[#F3F4F6]">
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={listing.images.room}
              alt={`Room in ${listing.title}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Minimalist property info + CTA */}
        <div className="flex items-center justify-between border-t border-[#F3F4F6] px-5 py-3">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1 font-semibold text-foreground">
              <Banknote className="size-3.5" />
              CHF {listing.room.price}/mo
            </span>
            <span className="inline-flex items-center gap-1">
              <Ruler className="size-3.5" />
              {listing.room.size} m²
            </span>
          </div>
          <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-primary">
            View
            <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </article>
    </Link>
  );
}
