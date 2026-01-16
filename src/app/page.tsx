"use client";

import { useEffect, useState, useRef } from "react";
import { BacInput, BacResult, SexAtBirth } from "@/engine/types";
import { estimateBacRange } from "@/engine/bac";
import { getEffectsForBand } from "@/engine/effects";

/**
 * Clamp a number between min and max (inclusive)
 */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export default function Home() {
  // Input state - numeric (source of truth for calculation)
  const [standardDrinks, setStandardDrinks] = useState<number>(2);
  const [durationHours, setDurationHours] = useState<number>(2);
  const [weightLbs, setWeightLbs] = useState<number>(160);
  const [sexAtBirth, setSexAtBirth] = useState<SexAtBirth>("male");

  // Input state - text (for number input display/editing)
  const [drinksText, setDrinksText] = useState<string>("2");
  const [hoursText, setHoursText] = useState<string>("2");
  const [weightText, setWeightText] = useState<string>("160");

  // Result state
  const [result, setResult] = useState<BacResult | null>(null);

  // UI state
  const [sleepExpanded, setSleepExpanded] = useState(false);
  const [effectsExpanded, setEffectsExpanded] = useState(false);
  const [methodologyExpanded, setMethodologyExpanded] = useState(false);
  const [onboardingCollapsed, setOnboardingCollapsed] = useState(false);
  const [methodologyTab, setMethodologyTab] = useState<"calculation" | "research" | "why">("calculation");
  const [isCalculating, setIsCalculating] = useState(false);

  // Refs
  const bacCardRef = useRef<HTMLDivElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const storedInputs = localStorage.getItem("bacInputs");
    const storedResult = localStorage.getItem("bacResult");
    const storedOnboarding = localStorage.getItem("onboardingCollapsed");

    if (storedInputs) {
      try {
        const inputs = JSON.parse(storedInputs);
        const drinks = inputs.standardDrinks || 2;
        const hours = inputs.durationHours || 2;
        const weight = inputs.weightLbs || 160;

        setStandardDrinks(drinks);
        setDurationHours(hours);
        setWeightLbs(weight);
        setSexAtBirth(inputs.sexAtBirth || "male");

        // Sync text states
        setDrinksText(String(drinks));
        setHoursText(String(hours));
        setWeightText(String(weight));
      } catch (e) {
        // Ignore parse errors
      }
    }

    if (storedResult) {
      try {
        setResult(JSON.parse(storedResult));
      } catch (e) {
        // Ignore parse errors
      }
    }

    // Load onboarding collapsed state (defaults to false/expanded on first visit)
    if (storedOnboarding === "true") {
      setOnboardingCollapsed(true);
    }
  }, []);

  // Save inputs to localStorage
  useEffect(() => {
    const inputs: BacInput = {
      standardDrinks,
      durationHours,
      weightLbs,
      sexAtBirth,
    };
    localStorage.setItem("bacInputs", JSON.stringify(inputs));
  }, [standardDrinks, durationHours, weightLbs, sexAtBirth]);

  // Save result to localStorage
  useEffect(() => {
    if (result) {
      localStorage.setItem("bacResult", JSON.stringify(result));
    }
  }, [result]);

  // Save onboarding collapsed state to localStorage
  useEffect(() => {
    localStorage.setItem("onboardingCollapsed", String(onboardingCollapsed));
  }, [onboardingCollapsed]);

  const handleCalculate = async () => {
    setIsCalculating(true);

    // 200ms loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 200));

    const input: BacInput = {
      standardDrinks,
      durationHours,
      weightLbs,
      sexAtBirth,
    };
    const bacResult = estimateBacRange(input);
    setResult(bacResult);
    setSleepExpanded(false);
    setEffectsExpanded(false);
    setIsCalculating(false);

    // Scroll to BAC card smoothly after calculation
    setTimeout(() => {
      bacCardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const effects = result ? getEffectsForBand(result.bandKey) : null;

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
          Alcohol Impact Check
        </h1>
        <p className="text-gray-600">
          Estimate BAC and understand potential effects
        </p>
      </div>

      {/* Driving Banner - Always Visible */}
      <div className="card mb-6 bg-red-50 border-2 border-red-300 p-5 md:p-6">
        <div className="flex items-start gap-4">
          <svg
            className="w-8 h-8 text-red-600 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="font-bold text-red-900 text-lg mb-1">
              Do not use this to decide about driving
            </p>
            <p className="text-red-800 text-base">
              If you&apos;ve been drinking, don&apos;t drive. This estimate cannot
              determine if it&apos;s safe to operate a vehicle or machinery.
            </p>
          </div>
        </div>
      </div>

      {/* Onboarding Section */}
      <div className="card mb-6 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-blue-200 p-5 md:p-6">
        <button
          onClick={() => setOnboardingCollapsed(!onboardingCollapsed)}
          className="w-full flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
        >
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            How to Use This Tool
          </h2>
          <svg
            className={`w-6 h-6 text-blue-700 transition-transform duration-300 ${onboardingCollapsed ? "" : "rotate-180"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {!onboardingCollapsed && (
          <div className="mt-4 pt-4 border-t border-blue-300 overflow-hidden transition-all duration-300 ease-in-out">
            <ul className="space-y-3 text-gray-700 text-base">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                <span>Enter the number of drinks consumed, time period, and your details</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                <span>See your estimated BAC range and detailed cognitive effects</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                <span>Learn how alcohol affects reaction time, judgment, and sleep quality</span>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="card mb-6 p-5 md:p-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white -m-5 md:-m-6 mb-5 md:mb-6 p-5 md:p-6 rounded-t-lg">
          <h2 className="text-2xl font-bold tracking-tight">
            Enter Information
          </h2>
        </div>

        <div className="space-y-5">
          {/* Standard Drinks */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-base font-semibold text-gray-700">
                Standard Drinks
              </label>
              <input
                type="number"
                min="0.5"
                max="30"
                step="0.5"
                value={drinksText}
                onChange={(e) => {
                  // Always update text state
                  setDrinksText(e.target.value);
                  // If parseable, update numeric state
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val)) {
                    setStandardDrinks(clamp(val, 0.5, 30));
                  }
                }}
                onBlur={() => {
                  // On blur, normalize text to match clamped numeric
                  const val = parseFloat(drinksText);
                  if (isNaN(val) || drinksText.trim() === "") {
                    // Revert to current numeric
                    setDrinksText(String(standardDrinks));
                  } else {
                    // Normalize to clamped value
                    setDrinksText(String(clamp(val, 0.5, 30)));
                  }
                }}
                className="w-24 h-12 px-3 border border-gray-300 rounded text-center text-base font-semibold focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none transition-all duration-200"
              />
            </div>
            <input
              type="range"
              min="0.5"
              max="30"
              step="0.5"
              value={standardDrinks}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setStandardDrinks(val);
                setDrinksText(String(val));
              }}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
            <p className="text-sm text-gray-500 mt-1">
              1 standard drink = 12oz beer, 5oz wine, or 1.5oz spirits
            </p>
          </div>

          {/* Duration */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-base font-semibold text-gray-700">
                Time Period (hours)
              </label>
              <input
                type="number"
                min="0.5"
                max="20"
                step="0.5"
                value={hoursText}
                onChange={(e) => {
                  // Always update text state
                  setHoursText(e.target.value);
                  // If parseable, update numeric state
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val)) {
                    setDurationHours(clamp(val, 0.5, 20));
                  }
                }}
                onBlur={() => {
                  // On blur, normalize text to match clamped numeric
                  const val = parseFloat(hoursText);
                  if (isNaN(val) || hoursText.trim() === "") {
                    // Revert to current numeric
                    setHoursText(String(durationHours));
                  } else {
                    // Normalize to clamped value
                    setHoursText(String(clamp(val, 0.5, 20)));
                  }
                }}
                className="w-24 h-12 px-3 border border-gray-300 rounded text-center text-base font-semibold focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none transition-all duration-200"
              />
            </div>
            <input
              type="range"
              min="0.5"
              max="20"
              step="0.5"
              value={durationHours}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setDurationHours(val);
                setHoursText(String(val));
              }}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
          </div>

          {/* Weight */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-base font-semibold text-gray-700">
                Body Weight (lbs)
              </label>
              <input
                type="number"
                min="70"
                max="450"
                step="1"
                value={weightText}
                onChange={(e) => {
                  // Always update text state
                  setWeightText(e.target.value);
                  // If parseable, update numeric state
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val)) {
                    setWeightLbs(Math.round(clamp(val, 70, 450)));
                  }
                }}
                onBlur={() => {
                  // On blur, normalize text to match clamped numeric
                  const val = parseFloat(weightText);
                  if (isNaN(val) || weightText.trim() === "") {
                    // Revert to current numeric
                    setWeightText(String(weightLbs));
                  } else {
                    // Normalize to clamped value
                    setWeightText(String(Math.round(clamp(val, 70, 450))));
                  }
                }}
                className="w-24 h-12 px-3 border border-gray-300 rounded text-center text-base font-semibold focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none transition-all duration-200"
              />
            </div>
            <input
              type="range"
              min="70"
              max="450"
              step="1"
              value={weightLbs}
              onChange={(e) => {
                const val = Number(e.target.value);
                setWeightLbs(val);
                setWeightText(String(val));
              }}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
          </div>

          {/* Sex at Birth */}
          <div>
            <label className="block text-base font-semibold text-gray-700 mb-3">
              Sex at Birth
            </label>
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="sex"
                  value="male"
                  checked={sexAtBirth === "male"}
                  onChange={(e) => setSexAtBirth(e.target.value as SexAtBirth)}
                  className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-gray-700">Male</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="sex"
                  value="female"
                  checked={sexAtBirth === "female"}
                  onChange={(e) => setSexAtBirth(e.target.value as SexAtBirth)}
                  className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-gray-700">Female</span>
              </label>
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            disabled={isCalculating}
            className={`btn-primary w-full text-lg py-4 flex items-center justify-center transition-all duration-200 ${
              isCalculating ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {isCalculating && (
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}
            {isCalculating ? "Calculating..." : "Calculate BAC Estimate"}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {result && effects && (
        <div id="results" className="space-y-6">
          {/* BAC Range */}
          <div
            ref={bacCardRef}
            className="card bg-gradient-to-br from-blue-500 to-blue-600 border-2 border-blue-700 p-5 md:p-6 opacity-0 translate-y-[10px] animate-fadeIn"
          >
            <div className="text-center">
              <div className="text-6xl font-bold text-white mb-3">
                {result.low.toFixed(2)}–{result.high.toFixed(2)}%
              </div>
              <div className="text-base text-blue-100 mb-2">
                Estimated BAC Range
              </div>
              <div className="text-sm text-blue-200">
                Midpoint: {result.midpoint.toFixed(2)}%
              </div>
            </div>
          </div>

          {/* Conditional Legal Warning */}
          {result.midpoint >= 0.06 && (
            <div className="card bg-red-50 border-2 border-red-500 p-5 md:p-6 opacity-0 translate-y-[10px] animate-fadeIn delay-50">
              <div className="flex items-start gap-4">
                <svg
                  className="w-8 h-8 text-red-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <p className="text-gray-900 font-semibold text-base flex-1">
                  ⚠️ It is illegal to drive with a BAC of 0.08% or higher in the United States. At this level, significant impairment of reaction time, judgment, and coordination is typical.
                </p>
              </div>
            </div>
          )}

          {/* Important Reminders */}
          <div className="card bg-yellow-50 border-2 border-yellow-200 border-l-4 border-l-yellow-400 p-5 md:p-6 opacity-0 translate-y-[10px] animate-fadeIn delay-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
              Important Reminders
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span className="text-gray-800 text-base">
                  This is an estimate only. Individual responses to alcohol vary
                  significantly.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span className="text-gray-800 text-base">
                  It is illegal to drive with a BAC of 0.08% or higher in the United States. Impairment of reaction time, judgment, and divided attention begins well below this level.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span className="text-gray-800 text-base">
                  Always arrange for safe transportation if you&apos;ve been drinking.
                </span>
              </li>
            </ul>
          </div>

          {/* Typical Effects */}
          <div className="card bg-gradient-to-br from-gray-50 to-gray-100 p-5 md:p-6 opacity-0 translate-y-[10px] animate-fadeIn delay-150">
            <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
              Typical Effects ({effects.label})
            </h3>
            <ul className="space-y-2">
              {effects.effects.map((effect, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700 text-base">
                  <span className="text-primary-600 mt-1 flex-shrink-0">•</span>
                  <span>{effect}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setEffectsExpanded(!effectsExpanded)}
              className="text-primary-700 hover:text-primary-900 hover:bg-gray-100 font-medium text-base flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded px-2 py-1 -ml-2 mt-3 h-12 transition-colors duration-200"
              aria-expanded={effectsExpanded}
            >
              {effectsExpanded ? "Less detail" : "More detail on effects"}
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${effectsExpanded ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {effectsExpanded && effects.effectsDetail && effects.effectsDetail.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200 overflow-hidden transition-all duration-300 ease-in-out">
                <ul className="space-y-2">
                  {effects.effectsDetail.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700 text-base">
                      <span className="text-primary-600 mt-1 flex-shrink-0">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sleep Impact */}
          <div className="card bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-purple-200 p-5 md:p-6 opacity-0 translate-y-[10px] animate-fadeIn delay-200">
            <div className="flex items-start gap-4">
              <svg
                className="w-8 h-8 text-purple-600 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
                  Sleep Impact
                </h3>
                <p className="text-gray-700 text-base mb-3">{effects.sleepSummary}</p>

                <button
                  onClick={() => setSleepExpanded(!sleepExpanded)}
                  className="text-purple-700 hover:text-purple-900 hover:bg-gray-100 font-medium text-base flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded px-2 py-1 -ml-2 h-12 transition-colors duration-200"
                  aria-expanded={sleepExpanded}
                >
                  {sleepExpanded ? "Less detail" : "More detail"}
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${sleepExpanded ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {sleepExpanded && (
                  <div className="mt-4 space-y-4 pt-4 border-t border-purple-300 overflow-hidden transition-all duration-300 ease-in-out">
                    {/* Tonight */}
                    {effects.sleepTonight && effects.sleepTonight.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Tonight:</h4>
                        <ul className="space-y-1.5 text-gray-700 text-base">
                          {effects.sleepTonight.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-purple-600 mt-1 flex-shrink-0">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tomorrow */}
                    {effects.tomorrow && effects.tomorrow.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Tomorrow:</h4>
                        <ul className="space-y-1.5 text-gray-700 text-base">
                          {effects.tomorrow.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-purple-600 mt-1 flex-shrink-0">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* What Helps */}
                    {effects.whatHelps && effects.whatHelps.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">What helps:</h4>
                        <ul className="space-y-1.5 text-gray-700 text-base">
                          {effects.whatHelps.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-purple-600 mt-1 flex-shrink-0">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* What Actually Helps (And What Doesn't) */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">What Actually Helps (And What Doesn&apos;t):</h4>
                      <ul className="space-y-1.5 text-base">
                        <li className="flex items-start gap-2 text-green-700">
                          <span className="mt-1 flex-shrink-0">✅</span>
                          <span>Hydrate before bed (reduces dehydration effects)</span>
                        </li>
                        <li className="flex items-start gap-2 text-green-700">
                          <span className="mt-1 flex-shrink-0">✅</span>
                          <span>Stop drinking 2-3 hours before sleep (allows some metabolism)</span>
                        </li>
                        <li className="flex items-start gap-2 text-red-700">
                          <span className="mt-1 flex-shrink-0">❌</span>
                          <span>Cold showers, coffee, or exercise do NOT speed alcohol elimination</span>
                        </li>
                        <li className="flex items-start gap-2 text-red-700">
                          <span className="mt-1 flex-shrink-0">❌</span>
                          <span>&apos;Sleeping it off&apos; doesn&apos;t prevent next-day cognitive effects</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Methodology Section with Tabs */}
          <div className="card bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-blue-200 p-5 md:p-6 opacity-0 translate-y-[10px] animate-fadeIn delay-[250ms]">
            <div className="flex items-start gap-4">
              <svg
                className="w-8 h-8 text-blue-600 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                  How This Works
                </h3>

                {/* Tab Buttons */}
                <div className="flex gap-2 mb-4 border-b border-blue-300">
                  <button
                    onClick={() => setMethodologyTab("calculation")}
                    className={`px-4 py-2 font-medium text-base transition-colors duration-200 ${
                      methodologyTab === "calculation"
                        ? "text-blue-900 border-b-2 border-blue-600"
                        : "text-blue-700 hover:text-blue-900 hover:bg-gray-100"
                    }`}
                  >
                    BAC Calculation
                  </button>
                  <button
                    onClick={() => setMethodologyTab("research")}
                    className={`px-4 py-2 font-medium text-base transition-colors duration-200 ${
                      methodologyTab === "research"
                        ? "text-blue-900 border-b-2 border-blue-600"
                        : "text-blue-700 hover:text-blue-900 hover:bg-gray-100"
                    }`}
                  >
                    Research Sources
                  </button>
                  <button
                    onClick={() => setMethodologyTab("why")}
                    className={`px-4 py-2 font-medium text-base transition-colors duration-200 ${
                      methodologyTab === "why"
                        ? "text-blue-900 border-b-2 border-blue-600"
                        : "text-blue-700 hover:text-blue-900 hover:bg-gray-100"
                    }`}
                  >
                    Why We Built This
                  </button>
                </div>

                {/* Tab Content */}
                <div className="text-base">
                  {methodologyTab === "calculation" && (
                    <div className="space-y-4">
                      <p className="text-gray-700">
                        This tool uses a modified Widmark formula with distributed consumption modeling to estimate blood alcohol content.
                      </p>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1.5">Standard Drink Definition</h4>
                        <p className="text-gray-700">
                          One standard drink contains 14 grams of pure alcohol. This equals approximately 12oz of beer (5% ABV), 5oz of wine (12% ABV), or 1.5oz of distilled spirits (40% ABV).
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1.5">Body Water Distribution (Widmark r-values)</h4>
                        <p className="text-gray-700">
                          Alcohol distributes in body water. Males typically have 68% body water (r = 0.68), females 55% (r = 0.55). This accounts for differences in body composition between sexes.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1.5">Distributed Consumption Model</h4>
                        <p className="text-gray-700">
                          We assume drinks are consumed gradually over the time period, not all at once. Metabolism begins during consumption, so the effective metabolism time is approximately half the total duration. Peak BAC is adjusted downward because drinking over time results in lower peak levels than instant consumption (calibrated to NIAAA benchmarks: 4-5 drinks over 2 hours ≈ 0.08%).
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1.5">Absorption Efficiency (90%)</h4>
                        <p className="text-gray-700">
                          Not all consumed alcohol enters the bloodstream due to first-pass metabolism in the stomach and liver. We apply a 90% absorption efficiency factor.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1.5">Metabolism Rate Range</h4>
                        <p className="text-gray-700">
                          The body metabolizes alcohol at 0.010–0.020% BAC per hour. Individual rates vary based on genetics, liver health, food intake, and other factors. We use this range to provide an estimated BAC range.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1.5">Individual Variability</h4>
                        <p className="text-gray-700">
                          Many factors affect actual BAC: recent food intake, hydration, medications, genetics, liver health, tolerance, and more. This tool provides a general estimate and cannot account for all individual factors.
                        </p>
                      </div>

                      <div className="pt-2 border-t border-blue-200">
                        <p className="text-gray-800 font-medium">
                          <strong>Important:</strong> This is an educational estimate only. It is not suitable for making decisions about driving, operating machinery, or legal matters. When in doubt, don&apos;t drive.
                        </p>
                      </div>
                    </div>
                  )}

                  {methodologyTab === "research" && (
                    <div className="space-y-4">
                      <p className="text-gray-700">
                        This tool is based on peer-reviewed research and data from authoritative sources on alcohol metabolism and impairment.
                      </p>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1.5">Key Sources</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                            <span><strong>NIAAA (National Institute on Alcohol Abuse and Alcoholism)</strong> - Standard drink definitions, BAC effects, and impairment benchmarks</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                            <span><strong>Widmark Formula</strong> - Foundation for BAC estimation based on body weight and sex</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                            <span><strong>Sleep Research</strong> - Studies on alcohol&apos;s effects on REM sleep, sleep architecture, and next-day cognitive function</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                            <span><strong>Cognitive Impairment Studies</strong> - Research on divided attention, reaction time, and judgment at various BAC levels</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1.5">Limitations</h4>
                        <p className="text-gray-700">
                          While based on established research, this tool provides estimates only. Actual BAC and impairment vary significantly between individuals due to factors like genetics, health status, medications, and tolerance. This tool should not be used for medical, legal, or safety decisions.
                        </p>
                      </div>
                    </div>
                  )}

                  {methodologyTab === "why" && (
                    <div className="space-y-4">
                      <p className="text-gray-700">
                        We built this tool to help people understand how alcohol affects the body, particularly its impact on cognitive function and sleep quality.
                      </p>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1.5">The Problem</h4>
                        <p className="text-gray-700">
                          Many people underestimate alcohol&apos;s effects on reaction time, judgment, and next-day performance. Even low BAC levels can impair driving-critical abilities like divided attention and hazard detection. Additionally, alcohol significantly disrupts sleep architecture, reducing restorative REM sleep even at moderate levels.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1.5">Our Approach</h4>
                        <p className="text-gray-700">
                          Rather than simply displaying a BAC number, we provide context about specific cognitive effects and sleep impacts. We use neutral, evidence-based language to describe typical effects at different BAC levels, helping users make informed decisions without judgment.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1.5">Educational Purpose</h4>
                        <p className="text-gray-700">
                          This tool is designed for education and awareness, not for deciding whether it&apos;s safe to drive or operate machinery. If you&apos;ve been drinking, the safest choice is always to arrange alternative transportation. Our goal is to increase understanding of alcohol&apos;s effects, particularly on abilities that may not &quot;feel&quot; impaired but are measurably affected.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          This tool provides estimates based on general formulas. It is not medical
          advice. Always consult healthcare professionals for guidance specific to
          your situation.
        </p>
      </div>
    </div>
  );
}
