"use client";

import { useEffect, useState } from "react";
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

  // Load from localStorage on mount
  useEffect(() => {
    const storedInputs = localStorage.getItem("bacInputs");
    const storedResult = localStorage.getItem("bacResult");

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

  const handleCalculate = () => {
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
    // Scroll to results
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const effects = result ? getEffectsForBand(result.bandKey) : null;

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Alcohol Impact Check
        </h1>
        <p className="text-gray-600">
          Estimate BAC and understand potential effects
        </p>
      </div>

      {/* Driving Banner - Always Visible */}
      <div className="card mb-6 bg-red-50 border-2 border-red-300">
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
            <p className="text-red-800">
              If you&apos;ve been drinking, don&apos;t drive. This estimate cannot
              determine if it&apos;s safe to operate a vehicle or machinery.
            </p>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="card mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Enter Information
        </h2>

        <div className="space-y-5">
          {/* Standard Drinks */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-700">
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
                className="w-20 px-2 py-1 border border-gray-300 rounded text-center text-sm font-semibold"
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
            <p className="text-xs text-gray-500 mt-1">
              1 standard drink = 12oz beer, 5oz wine, or 1.5oz spirits
            </p>
          </div>

          {/* Duration */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-700">
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
                className="w-20 px-2 py-1 border border-gray-300 rounded text-center text-sm font-semibold"
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
              <label className="text-sm font-semibold text-gray-700">
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
                className="w-20 px-2 py-1 border border-gray-300 rounded text-center text-sm font-semibold"
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
            <label className="block text-sm font-semibold text-gray-700 mb-3">
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
            className="btn-primary w-full text-lg py-4"
          >
            Calculate BAC Estimate
          </button>
        </div>
      </div>

      {/* Results Section */}
      {result && effects && (
        <div id="results" className="space-y-6">
          {/* BAC Range */}
          <div className="card bg-gradient-to-br from-primary-50 to-primary-100 border-2 border-primary-300">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Estimated BAC
            </h2>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary-700 mb-2">
                {result.low.toFixed(2)}–{result.high.toFixed(2)}%
              </div>
              <div className="text-sm text-gray-700 mb-1">
                Midpoint: {result.midpoint.toFixed(2)}%
              </div>
            </div>
          </div>

          {/* Important Reminders */}
          <div className="card bg-yellow-50 border-2 border-yellow-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
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
                <span className="text-gray-800">
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
                <span className="text-gray-800">
                  The legal limit for driving is 0.08% BAC in the United States. Impairment of reaction time, judgment, and divided attention begins well below this level.
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
                <span className="text-gray-800">
                  Always arrange for safe transportation if you&apos;ve been drinking.
                </span>
              </li>
            </ul>
          </div>

          {/* Typical Effects */}
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Typical Effects ({effects.label})
            </h3>
            <ul className="space-y-2">
              {effects.effects.map((effect, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <span className="text-primary-600 mt-1 flex-shrink-0">•</span>
                  <span>{effect}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setEffectsExpanded(!effectsExpanded)}
              className="text-primary-700 hover:text-primary-900 font-medium text-sm flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded px-2 py-1 -ml-2 mt-3"
              aria-expanded={effectsExpanded}
            >
              {effectsExpanded ? "Less detail" : "More detail on effects"}
              <svg
                className={`w-4 h-4 transition-transform ${effectsExpanded ? "rotate-180" : ""}`}
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
              <div className="mt-4 pt-4 border-t border-gray-200">
                <ul className="space-y-2">
                  {effects.effectsDetail.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                      <span className="text-primary-600 mt-1 flex-shrink-0">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sleep Impact */}
          <div className="card bg-purple-50 border-2 border-purple-200">
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
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Sleep Impact
                </h3>
                <p className="text-gray-700 mb-3">{effects.sleepSummary}</p>

                <button
                  onClick={() => setSleepExpanded(!sleepExpanded)}
                  className="text-purple-700 hover:text-purple-900 font-medium text-sm flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded px-2 py-1 -ml-2"
                  aria-expanded={sleepExpanded}
                >
                  {sleepExpanded ? "Less detail" : "More detail"}
                  <svg
                    className={`w-4 h-4 transition-transform ${sleepExpanded ? "rotate-180" : ""}`}
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
                  <div className="mt-4 space-y-4 pt-4 border-t border-purple-300">
                    {/* Tonight */}
                    {effects.sleepTonight && effects.sleepTonight.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Tonight:</h4>
                        <ul className="space-y-1.5 text-gray-700 text-sm">
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
                        <ul className="space-y-1.5 text-gray-700 text-sm">
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
                        <ul className="space-y-1.5 text-gray-700 text-sm">
                          {effects.whatHelps.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-purple-600 mt-1 flex-shrink-0">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Methodology Section */}
          <div className="card bg-blue-50 border-2 border-blue-200">
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
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  How This Works
                </h3>
                <p className="text-gray-700 mb-3">
                  This tool uses a modified Widmark formula with distributed consumption modeling to estimate blood alcohol content.
                </p>

                <button
                  onClick={() => setMethodologyExpanded(!methodologyExpanded)}
                  className="text-blue-700 hover:text-blue-900 font-medium text-sm flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1 -ml-2"
                  aria-expanded={methodologyExpanded}
                >
                  {methodologyExpanded ? "Less detail" : "More detail"}
                  <svg
                    className={`w-4 h-4 transition-transform ${methodologyExpanded ? "rotate-180" : ""}`}
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

                {methodologyExpanded && (
                  <div className="mt-4 space-y-4 pt-4 border-t border-blue-300 text-sm">
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
                        The body metabolizes alcohol at 0.012–0.018% BAC per hour. Individual rates vary based on genetics, liver health, food intake, and other factors. We use this range to provide an estimated BAC range.
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
