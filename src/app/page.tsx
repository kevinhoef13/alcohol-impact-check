"use client";

import { useEffect, useState } from "react";
import { BacInput, BacResult, SexAtBirth } from "@/engine/types";
import { estimateBacRange } from "@/engine/bac";
import { getEffectsForBand } from "@/engine/effects";

const PAUSE_CHECKLIST_ITEMS = [
  "I have a plan for getting home safely",
  "I know my limits and intend to stick to them",
  "I&apos;ve eaten food and am staying hydrated",
  "I&apos;m with people I trust",
  "I have my phone charged and accessible",
];

export default function Home() {
  // Input state
  const [standardDrinks, setStandardDrinks] = useState<number>(2);
  const [durationHours, setDurationHours] = useState<number>(2);
  const [weightLbs, setWeightLbs] = useState<number>(160);
  const [sexAtBirth, setSexAtBirth] = useState<SexAtBirth>("male");

  // Result state
  const [result, setResult] = useState<BacResult | null>(null);

  // UI state
  const [sleepExpanded, setSleepExpanded] = useState(false);
  const [pauseChecklist, setPauseChecklist] = useState<boolean[]>(
    new Array(PAUSE_CHECKLIST_ITEMS.length).fill(false)
  );

  // Load from localStorage on mount
  useEffect(() => {
    const storedInputs = localStorage.getItem("bacInputs");
    const storedResult = localStorage.getItem("bacResult");
    const storedPause = localStorage.getItem("pauseChecklist");

    if (storedInputs) {
      try {
        const inputs = JSON.parse(storedInputs);
        setStandardDrinks(inputs.standardDrinks || 2);
        setDurationHours(inputs.durationHours || 2);
        setWeightLbs(inputs.weightLbs || 160);
        setSexAtBirth(inputs.sexAtBirth || "male");
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

    if (storedPause) {
      try {
        setPauseChecklist(JSON.parse(storedPause));
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

  // Save pause checklist to localStorage
  useEffect(() => {
    localStorage.setItem("pauseChecklist", JSON.stringify(pauseChecklist));
  }, [pauseChecklist]);

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
    // Scroll to results
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const togglePauseItem = (index: number) => {
    const newChecklist = [...pauseChecklist];
    newChecklist[index] = !newChecklist[index];
    setPauseChecklist(newChecklist);
  };

  const effects = result ? getEffectsForBand(result.bandKey) : null;

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Alcohol Impact Estimator
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
                value={standardDrinks}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val) && val >= 0.5 && val <= 30) {
                    setStandardDrinks(val);
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
              onChange={(e) => setStandardDrinks(parseFloat(e.target.value))}
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
                value={durationHours}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val) && val >= 0.5 && val <= 20) {
                    setDurationHours(val);
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
              onChange={(e) => setDurationHours(parseFloat(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
          </div>

          {/* Weight */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Body Weight: {weightLbs} lbs
            </label>
            <input
              type="range"
              min="70"
              max="450"
              step="1"
              value={weightLbs}
              onChange={(e) => setWeightLbs(parseInt(e.target.value))}
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
              <div className="inline-block bg-white px-4 py-2 rounded-lg mt-2">
                <div className="text-lg font-semibold text-gray-900">
                  {effects.label}
                </div>
              </div>
            </div>
          </div>

          {/* Typical Effects */}
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Typical Effects
            </h3>
            <ul className="space-y-2">
              {effects.effects.map((effect, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <span className="text-primary-600 mt-1 flex-shrink-0">•</span>
                  <span>{effect}</span>
                </li>
              ))}
            </ul>
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
                  Always arrange for safe transportation if you&apos;ve been drinking.
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Pause & Decide Checklist - Always Visible */}
      <div className="card mt-8 bg-green-50 border-2 border-green-200">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Pause & Decide
        </h2>
        <p className="text-gray-700 mb-4">
          Take a moment to check in with yourself:
        </p>
        <div className="space-y-3">
          {PAUSE_CHECKLIST_ITEMS.map((item, idx) => (
            <label
              key={idx}
              className="flex items-start gap-3 cursor-pointer p-3 rounded-lg hover:bg-green-100 transition-colors"
            >
              <input
                type="checkbox"
                checked={pauseChecklist[idx]}
                onChange={() => togglePauseItem(idx)}
                className="w-5 h-5 mt-0.5 text-green-600 rounded focus:ring-green-500 cursor-pointer"
              />
              <span
                className="text-gray-800"
                dangerouslySetInnerHTML={{ __html: item }}
              />
            </label>
          ))}
        </div>

        {pauseChecklist.every((item) => item) && (
          <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg flex items-start gap-3">
            <svg
              className="w-6 h-6 text-green-700 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-green-900 mb-1">
                You&apos;ve checked in
              </h3>
              <p className="text-green-800">
                You&apos;ve thought through the important aspects of your safety and
                wellbeing. Continue to check in with yourself throughout the evening.
              </p>
            </div>
          </div>
        )}
      </div>

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
