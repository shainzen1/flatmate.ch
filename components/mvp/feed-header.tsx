"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

type FeedHeaderProps = {
  view: "list" | "map";
  onViewChange?: (view: "list" | "map") => void;
};

export function FeedHeader({ view, onViewChange }: FeedHeaderProps) {
  const pathname = usePathname();
  const isFeedRoute = pathname === "/app/feed";

  const handleViewChange = (nextView: "list" | "map") => {
    if (isFeedRoute && onViewChange) {
      onViewChange(nextView);
      return;
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          flatmate<span className="text-primary/60">.ch</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1 rounded-xl border border-border bg-card p-1">
            <Button
              asChild={!isFeedRoute}
              variant={view === "list" ? "default" : "ghost"}
              size="sm"
              onClick={isFeedRoute ? () => handleViewChange("list") : undefined}
            >
              {isFeedRoute ? (
                <span>List</span>
              ) : (
                <Link href="/app/feed?view=list">List</Link>
              )}
            </Button>
            <Button
              asChild={!isFeedRoute}
              variant={view === "map" ? "default" : "ghost"}
              size="sm"
              onClick={isFeedRoute ? () => handleViewChange("map") : undefined}
            >
              {isFeedRoute ? (
                <span>Map</span>
              ) : (
                <Link href="/app/feed?view=map">Map</Link>
              )}
            </Button>
          </div>
          <Link
            href="/app"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <RotateCcw className="size-3" />
            Retake vibe quiz
          </Link>
        </div>
      </div>
    </header>
  );
}
