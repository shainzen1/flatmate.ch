"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { VIBE_DIMENSIONS, type VibeSliderValues } from "@/lib/mvp-data";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useUserVibe } from "@/components/mvp/user-vibe-context";

export default function OnboardingPage() {
  const router = useRouter();
  const { setSliders } = useUserVibe();
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, number>>({});

  const dimension = VIBE_DIMENSIONS[step];
  const isFirst = step === 0;
  const isLast = step === VIBE_DIMENSIONS.length - 1;
  const currentValue = dimension ? selections[dimension.id] : undefined;
  const isValid = currentValue !== undefined;

  function handleSliderChange(value: number) {
    if (!dimension) return;
    setSelections((prev) => ({ ...prev, [dimension.id]: value }));
  }

  function next() {
    if (!isValid) return;
    if (isLast) {
      setSliders(selections as Partial<VibeSliderValues>);
      router.push("/app/feed");
    } else {
      setStep((s) => s + 1);
    }
  }

  function back() {
    if (!isFirst) setStep((s) => s - 1);
  }

  if (!dimension) return null;

  const progress = ((step + 1) / VIBE_DIMENSIONS.length) * 100;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border/40 px-6 py-4">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <span className="text-lg font-semibold tracking-tight">
            flatmate<span className="text-primary/60">.ch</span>
          </span>
          <span className="text-sm text-muted-foreground">
            {step + 1} / {VIBE_DIMENSIONS.length}
          </span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="h-1 w-full bg-muted">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-lg">
          <p className="mb-2 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
            {dimension.label}
          </p>
          <h1 className="mb-10 text-center text-2xl font-bold tracking-tight md:text-3xl">
            Where do you land?
          </h1>

          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <span className="max-w-[40%] text-sm text-muted-foreground">
                {dimension.anchorLow}
              </span>
              <span className="text-lg font-semibold text-primary">
                {currentValue ?? 50}
              </span>
              <span className="max-w-[40%] text-right text-sm text-muted-foreground">
                {dimension.anchorHigh}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={currentValue ?? 50}
              onChange={(e) => handleSliderChange(parseInt(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-muted accent-primary"
            />
          </div>
        </div>
      </main>

      {/* Navigation */}
      <footer className="border-t border-border/40 px-6 py-4">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <button
            onClick={back}
            disabled={isFirst}
            className="inline-flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:invisible"
          >
            <ArrowLeft className="size-4" />
            Back
          </button>
          <button
            onClick={next}
            disabled={!isValid}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-40 disabled:hover:bg-primary"
          >
            {isLast ? "See matches" : "Next"}
            <ArrowRight className="size-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}
