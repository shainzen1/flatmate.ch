"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { listings } from "@/lib/mvp-data";
import { FeedCard } from "@/components/mvp/feed-card";
import { Sparkles } from "lucide-react";
import { calculateMatchScore } from "@/lib/matching";
import { useUserVibe } from "@/components/mvp/user-vibe-context";
import { FeedHeader } from "@/components/mvp/feed-header";

const FeedMap = dynamic(
  () => import("@/components/mvp/feed-map").then((mod) => mod.FeedMap),
  { ssr: false }
);

export default function FeedPage() {
  const { sliders: userSelections } = useUserVibe();
  const searchParams = useSearchParams();
  const initialView = searchParams.get("view") === "map" ? "map" : "list";
  const [view, setView] = useState<"list" | "map">(initialView);

  const sorted = useMemo(() => {
    const withScores = listings.map((l) => ({
      ...l,
      score: calculateMatchScore(userSelections, l),
    }));
    return withScores.sort((a, b) => b.score - a.score);
  }, [userSelections]);

  const hasSelections = Object.keys(userSelections).length > 0;

  return (
    <div
      className={
        view === "map"
          ? "h-screen overflow-hidden bg-background"
          : "min-h-screen bg-background"
      }
    >
      <FeedHeader view={view} onViewChange={setView} />

      <main
        className={
          view === "map"
            ? "h-[calc(100vh-3.5rem)]"
            : "mx-auto max-w-5xl px-6 py-8"
        }
      >
        {/* Summary */}
        {view === "list" && hasSelections && (
          <div className="mb-8 flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm">
            <Sparkles className="size-4 text-primary" />
            <span>
              Showing <strong>{listings.length} WGs</strong> sorted by your vibe
              match
            </span>
          </div>
        )}

        {view === "list" ? (
          <LayoutGroup>
            <div className="grid gap-5">
              <AnimatePresence mode="popLayout">
                {sorted.map((listing) => (
                  <motion.div
                    key={listing.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      layout: { type: "spring", stiffness: 350, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                  >
                    <FeedCard
                      listing={listing}
                      userSelections={userSelections}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </LayoutGroup>
        ) : (
          <FeedMap listings={sorted} userSelections={userSelections} />
        )}

        {/* End */}
        {view === "list" && (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            You&apos;ve seen all {listings.length} WGs.{" "}
            <Link
              href="/app"
              className="font-medium text-primary hover:underline"
            >
              Update your vibe
            </Link>{" "}
            for better matches.
          </p>
        )}
      </main>
    </div>
  );
}
