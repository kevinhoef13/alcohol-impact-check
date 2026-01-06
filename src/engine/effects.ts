/**
 * BAC band to effects mapping with plain-English descriptions
 */

import { BacBandKey } from "./types";

export interface BacEffects {
  label: string;
  effects: string[];
  sleepNote: string;
}

/**
 * Map BAC bands to typical effects
 * Uses neutral, informational tone with "typically", "may", "estimated"
 */
export const BAC_EFFECTS_MAP: Record<BacBandKey, BacEffects> = {
  sober: {
    label: "No significant alcohol present",
    effects: [
      "No measurable alcohol effects",
      "Normal cognitive and motor function",
      "Baseline state",
    ],
    sleepNote:
      "Sleep quality should not be affected by alcohol at this level.",
  },

  minimal: {
    label: "Minimal effects (0.01–0.03% BAC)",
    effects: [
      "Typically no obvious impairment to most people",
      "May experience slight relaxation or mood elevation",
      "Cognitive and motor skills remain largely intact",
    ],
    sleepNote:
      "Sleep may be minimally affected. Some individuals may experience slight changes in sleep architecture.",
  },

  mild: {
    label: "Mild effects (0.03–0.06% BAC)",
    effects: [
      "Mild relaxation and lowered inhibitions are typical",
      "Slight impairment in judgment and memory may occur",
      "Coordination may be subtly affected",
      "Some individuals may feel more talkative or confident",
    ],
    sleepNote:
      "Sleep disruption becomes more likely. REM sleep may be reduced, and you may wake more frequently during the night.",
  },

  moderate: {
    label: "Moderate effects (0.06–0.10% BAC)",
    effects: [
      "Noticeable impairment in judgment, reasoning, and memory",
      "Reduced coordination and reaction time",
      "Speech may become slightly slurred",
      "Balance and fine motor skills are typically impaired",
      "Driving or operating machinery is unsafe and illegal in most jurisdictions",
    ],
    sleepNote:
      "Sleep quality is typically significantly disrupted. Expect reduced REM sleep, frequent awakenings, and poor sleep quality overall.",
  },

  high: {
    label: "High intoxication (0.10–0.15% BAC)",
    effects: [
      "Significant impairment in motor control and coordination",
      "Speech is typically slurred",
      "Judgment and decision-making are substantially impaired",
      "Risk of injury from falls or accidents increases",
      "Memory formation (blackouts) may be affected",
      "Nausea may occur",
    ],
    sleepNote:
      "Sleep architecture is heavily disrupted. You may pass out rather than fall asleep naturally. Next-day fatigue is very likely.",
  },

  veryHigh: {
    label: "Very high intoxication (0.15–0.25% BAC)",
    effects: [
      "Severe impairment of physical and mental functions",
      "Difficulty walking and standing without assistance",
      "Confusion and disorientation are common",
      "Vomiting is likely as the body tries to expel toxins",
      "Blackouts (memory loss) are very common",
      "Risk of injury is very high",
      "Medical attention may be needed",
    ],
    sleepNote:
      "At this level, loss of consciousness is likely. This is not healthy sleep—it's a state of severe intoxication. Medical evaluation is recommended.",
  },

  dangerous: {
    label: "Dangerous level (0.25% BAC and above)",
    effects: [
      "Life-threatening alcohol poisoning is possible",
      "Risk of loss of consciousness, seizures, or respiratory depression",
      "Choking on vomit is a serious risk",
      "Hypothermia and irregular heartbeat may occur",
      "This is a medical emergency—call 911 immediately",
    ],
    sleepNote:
      "This is a medical emergency, not sleep. Immediate medical attention is required. Do not leave the person alone.",
  },
};

/**
 * Get effects for a specific BAC band
 */
export function getEffectsForBand(bandKey: BacBandKey): BacEffects {
  return BAC_EFFECTS_MAP[bandKey];
}
