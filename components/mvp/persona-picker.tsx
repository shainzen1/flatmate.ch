"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, FlaskConical } from "lucide-react";
import { useUserVibe } from "./user-vibe-context";
import type { VibeSliderValues } from "@/lib/mvp-data";

type Persona = {
  id: string;
  name: string;
  emoji: string;
  values: VibeSliderValues;
};

const PERSONAS: Persona[] = [
  {
    id: "clean-freak",
    name: "The Clean Freak",
    emoji: "🧹",
    values: {
      socialBattery: 40,
      cleanliness: 98,
      guestPolicy: 20,
      sharedLiving: 30,
      noiseLevel: 15,
    },
  },
  {
    id: "social-butterfly",
    name: "The Social Butterfly",
    emoji: "🦋",
    values: {
      socialBattery: 95,
      cleanliness: 50,
      guestPolicy: 85,
      sharedLiving: 90,
      noiseLevel: 80,
    },
  },
  {
    id: "quiet-scholar",
    name: "The Quiet Scholar",
    emoji: "📚",
    values: {
      socialBattery: 20,
      cleanliness: 70,
      guestPolicy: 10,
      sharedLiving: 15,
      noiseLevel: 5,
    },
  },
  {
    id: "party-animal",
    name: "The Party Animal",
    emoji: "🎉",
    values: {
      socialBattery: 90,
      cleanliness: 25,
      guestPolicy: 95,
      sharedLiving: 70,
      noiseLevel: 95,
    },
  },
  {
    id: "balanced-roomie",
    name: "The Balanced Roomie",
    emoji: "⚖️",
    values: {
      socialBattery: 55,
      cleanliness: 60,
      guestPolicy: 50,
      sharedLiving: 55,
      noiseLevel: 45,
    },
  },
];

export function PersonaPicker() {
  const { personaId, setPersona } = useUserVibe();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-4 top-20 z-[9999] flex flex-col items-end gap-2">
      {open && (
        <div className="w-64 rounded-xl border border-border bg-card p-3 shadow-2xl">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Dev Persona Switcher
          </p>
          <div className="grid gap-1.5">
            {PERSONAS.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setPersona(p.id, p.values);
                }}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                  personaId === p.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                <span className="text-base">{p.emoji}</span>
                {p.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold shadow-lg transition-colors hover:bg-muted"
      >
        <FlaskConical className="size-4 text-primary" />
        Persona
        {open ? (
          <ChevronDown className="size-3.5" />
        ) : (
          <ChevronUp className="size-3.5" />
        )}
      </button>
    </div>
  );
}
