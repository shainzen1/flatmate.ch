import {
  VIBE_DIMENSIONS,
  type Listing,
  type VibeSliderValues,
  type VibeDimensionId,
} from "./mvp-data";

/**
 * Chemistry score: 100 − average absolute difference across 5 dimensions.
 * Returns an integer 0-100 (higher = better match).
 */
export function calculateMatchScore(
  user: Partial<VibeSliderValues> | null | undefined,
  listing: Listing
): number {
  if (!user || Object.keys(user).length === 0) return 0;

  let totalDiff = 0;
  let count = 0;

  for (const dim of VIBE_DIMENSIONS) {
    const uid = dim.id as VibeDimensionId;
    const uVal = user[uid];
    const lVal = listing.vibeValues[uid];
    if (uVal === undefined || lVal === undefined) continue;
    totalDiff += Math.abs(uVal - lVal);
    count++;
  }

  if (count === 0) return 0;
  const avgDiff = totalDiff / count;
  return Math.round(Math.max(0, Math.min(100, 100 - avgDiff)));
}

export type MatchTag = {
  dimensionId: VibeDimensionId;
  label: string;
  diff: number;
};

/**
 * Returns the top 3 dimensions where user and listing are closest,
 * formatted as human-readable match tags (e.g. "Both Social").
 */
export function getTopMatchTags(
  user: Partial<VibeSliderValues> | null | undefined,
  listing: Listing,
  limit = 3
): MatchTag[] {
  if (!user || Object.keys(user).length === 0) return [];

  const FRIENDLY_LABELS: Record<VibeDimensionId, string> = {
    socialBattery: "Social",
    cleanliness: "Clean",
    guestPolicy: "Guest-Friendly",
    sharedLiving: "Community",
    noiseLevel: "Noise Vibe",
  };

  const diffs: MatchTag[] = [];

  for (const dim of VIBE_DIMENSIONS) {
    const uid = dim.id as VibeDimensionId;
    const uVal = user[uid];
    const lVal = listing.vibeValues[uid];
    if (uVal === undefined || lVal === undefined) continue;
    diffs.push({
      dimensionId: uid,
      label: `Both ${FRIENDLY_LABELS[uid]}`,
      diff: Math.abs(uVal - lVal),
    });
  }

  return diffs.sort((a, b) => a.diff - b.diff).slice(0, limit);
}
