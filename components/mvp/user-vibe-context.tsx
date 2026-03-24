"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { VibeSliderValues } from "@/lib/mvp-data";

const STORAGE_KEY = "flatmate-vibe";

type UserVibeState = {
  sliders: Partial<VibeSliderValues>;
  personaId: string | null;
  setSliders: (values: Partial<VibeSliderValues>) => void;
  setPersona: (id: string | null, values: Partial<VibeSliderValues>) => void;
};

const UserVibeContext = createContext<UserVibeState>({
  sliders: {},
  personaId: null,
  setSliders: () => {},
  setPersona: () => {},
});

export function useUserVibe() {
  return useContext(UserVibeContext);
}

function loadFromStorage(): Partial<VibeSliderValues> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function UserVibeProvider({ children }: { children: ReactNode }) {
  const [sliders, setSlidersRaw] = useState<Partial<VibeSliderValues>>({});
  const [personaId, setPersonaId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSlidersRaw(loadFromStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (Object.keys(sliders).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sliders));
    }
  }, [sliders, hydrated]);

  const setSliders = useCallback((values: Partial<VibeSliderValues>) => {
    setSlidersRaw(values);
    setPersonaId(null);
  }, []);

  const setPersona = useCallback(
    (id: string | null, values: Partial<VibeSliderValues>) => {
      setPersonaId(id);
      setSlidersRaw(values);
    },
    []
  );

  return (
    <UserVibeContext.Provider
      value={{ sliders, personaId, setSliders, setPersona }}
    >
      {children}
    </UserVibeContext.Provider>
  );
}
