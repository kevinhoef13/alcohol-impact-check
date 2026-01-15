/**
 * BAC estimation engine using Widmark formula with metabolism range
 */

import { BacInput, BacResult, BacBandKey, BAC_CONSTRAINTS } from "./types";

/**
 * Widmark r-values (body water distribution) by sex
 */
const WIDMARK_R = {
  male: 0.68,
  female: 0.55,
} as const;

/**
 * Standard drink alcohol content in grams
 */
const STANDARD_DRINK_GRAMS = 14;

/**
 * Metabolism rate range (% BAC per hour)
 * Using a range to account for individual variation
 */
const METABOLISM_RATE = {
  low: 0.010, // Slower metabolism
  high: 0.020, // Faster metabolism
} as const;

/**
 * Absorption efficiency factor
 * Not all alcohol consumed is fully absorbed (first-pass metabolism, etc.)
 */
const ABSORPTION_EFFICIENCY = 0.9;

/**
 * Absorption lag time (hours)
 * Time before alcohol begins to be absorbed into the bloodstream
 */
const ABSORPTION_LAG_HOURS = 0.5;

/**
 * Distributed consumption peak dampening factor
 * Peak BAC is lower when drinks are spread over time vs instant consumption
 */
const DISTRIBUTED_PEAK_FACTOR = 0.65;

/**
 * Convert pounds to kilograms
 */
function lbsToKg(lbs: number): number {
  return lbs * 0.453592;
}

/**
 * Calculate peak BAC using Widmark formula
 * BAC = (alcohol_grams / (body_weight_kg * 1000 * r_value)) * 100
 */
function calculatePeakBac(
  alcoholGrams: number,
  weightKg: number,
  rValue: number
): number {
  return (alcoholGrams / (weightKg * 1000 * rValue)) * 100;
}

/**
 * Clamp BAC value to safe range
 */
function clampBac(bac: number): number {
  return Math.max(BAC_CONSTRAINTS.min, Math.min(BAC_CONSTRAINTS.max, bac));
}

/**
 * Round BAC value to 2 decimal places
 */
function roundTo2(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Create a fixed-width range (0.02) centered on midpoint
 * Ensures the range stays within [0.00, 0.40] and preserves width even after rounding
 */
function fixedWidthRangeFromMidpoint(midpoint: number): {
  low: number;
  high: number;
} {
  // Calculate initial range centered on midpoint
  let low = midpoint - 0.01;
  let high = midpoint + 0.01;

  // Clamp to valid BAC range
  low = clampBac(low);
  high = clampBac(high);

  // Round to 2 decimals
  let roundedLow = roundTo2(low);
  let roundedHigh = roundTo2(high);

  // Ensure rounding didn't collapse the range
  if (roundedLow === roundedHigh) {
    // Try to expand downward first
    const expandedLow = roundTo2(Math.max(0, roundedHigh - 0.02));
    if (expandedLow !== roundedHigh) {
      roundedLow = expandedLow;
    } else {
      // If can't expand down, expand upward
      roundedHigh = roundTo2(Math.min(0.40, roundedLow + 0.02));
    }
  }

  return {
    low: roundedLow,
    high: roundedHigh,
  };
}

/**
 * Determine BAC band classification based on 0.02 increments
 */
function getBacBand(bac: number): BacBandKey {
  if (bac < 0.01) return "baseline";
  if (bac < 0.03) return "b01_02";
  if (bac < 0.05) return "b03_04";
  if (bac < 0.07) return "b05_06";
  if (bac < 0.09) return "b07_08";
  if (bac < 0.11) return "b09_10";
  if (bac < 0.13) return "b11_12";
  if (bac < 0.15) return "b13_14";
  if (bac < 0.17) return "b15_16";
  if (bac < 0.19) return "b17_18";
  if (bac < 0.21) return "b19_20";
  if (bac < 0.25) return "b21_24";
  return "b25_plus";
}

/**
 * Estimate BAC range based on input parameters
 *
 * Accounts for:
 * - Distributed consumption over time period (drinks consumed gradually)
 * - Absorption efficiency (not all alcohol fully absorbed)
 * - Individual variation in metabolism rates
 * - Body weight and biological sex differences
 *
 * Returns a fixed 0.02-wide range centered on the metabolism-based midpoint
 *
 * Example sanity test:
 * - 14 drinks over 7.5 hours, 161 lbs, male
 * - Should produce lower midpoint than instant consumption model
 * - Distributed model accounts for metabolism during drinking period
 */
export function estimateBacRange(input: BacInput): BacResult {
  const { standardDrinks, durationHours, weightLbs, sexAtBirth } = input;

  // Handle edge cases
  if (standardDrinks <= 0) {
    return {
      low: 0,
      high: 0,
      midpoint: 0,
      bandKey: "baseline",
    };
  }

  // Calculate total alcohol consumed with absorption efficiency
  const totalAlcoholGrams = standardDrinks * STANDARD_DRINK_GRAMS * ABSORPTION_EFFICIENCY;
  const weightKg = lbsToKg(weightLbs);
  const rValue = WIDMARK_R[sexAtBirth];

  // Calculate theoretical peak BAC (instant consumption baseline)
  const theoreticalPeak = calculatePeakBac(totalAlcoholGrams, weightKg, rValue);

  // Distributed consumption: BAC peak is lower when drinks spread over time
  // Factor calibrated against NIAAA benchmarks (4-5 drinks/2h ≈ 0.08%)
  const peakBac = theoreticalPeak * DISTRIBUTED_PEAK_FACTOR;

  // Effective metabolism time: durationHours / 2 - absorption lag
  // Rationale: on average, alcohol was consumed at midpoint of time period
  // so metabolism occurs for approximately half the duration, minus absorption lag
  const effectiveMetabolismHours = Math.max(0, (durationHours / 2) - ABSORPTION_LAG_HOURS);

  // Calculate BAC range accounting for metabolism over effective time
  // High BAC estimate: slower metabolism
  const metabolizedSlow = effectiveMetabolismHours * METABOLISM_RATE.low;
  const bacHigh = clampBac(peakBac - metabolizedSlow);

  // Low BAC estimate: faster metabolism
  const metabolizedFast = effectiveMetabolismHours * METABOLISM_RATE.high;
  const bacLow = clampBac(peakBac - metabolizedFast);

  // Calculate midpoint from metabolism-based estimates
  const rawMidpoint = (bacLow + bacHigh) / 2;
  const midpoint = roundTo2(clampBac(rawMidpoint));

  // Create fixed-width range (0.02) centered on midpoint
  const range = fixedWidthRangeFromMidpoint(midpoint);

  // Determine band based on midpoint
  const bandKey = getBacBand(midpoint);

  return {
    low: range.low,
    high: range.high,
    midpoint: midpoint,
    bandKey,
  };
}
