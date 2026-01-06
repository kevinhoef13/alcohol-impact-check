/**
 * Core type definitions and constants for BAC estimation
 */

export type SexAtBirth = "male" | "female";

export type BacBandKey =
  | "baseline"
  | "b01_02"
  | "b03_04"
  | "b05_06"
  | "b07_08"
  | "b09_10"
  | "b11_12"
  | "b13_14"
  | "b15_16"
  | "b17_18"
  | "b19_20"
  | "b21_24"
  | "b25_plus";

/**
 * Input parameters for BAC estimation
 */
export interface BacInput {
  standardDrinks: number;
  durationHours: number;
  weightLbs: number;
  sexAtBirth: SexAtBirth;
}

/**
 * BAC estimation result with range and band classification
 */
export interface BacResult {
  low: number;
  high: number;
  midpoint: number;
  bandKey: BacBandKey;
}

/**
 * Input constraints and validation constants
 */
export const INPUT_CONSTRAINTS = {
  standardDrinks: {
    min: 0.5,
    max: 30,
    step: 0.5,
  },
  durationHours: {
    min: 0.5,
    max: 20,
    step: 0.5,
  },
  weightLbs: {
    min: 70,
    max: 450,
    step: 1,
  },
} as const;

/**
 * BAC value constraints
 */
export const BAC_CONSTRAINTS = {
  min: 0,
  max: 0.4,
} as const;
