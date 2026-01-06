"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BacInput } from "@/engine/types";
import { estimateBacRange } from "@/engine/bac";
import { getEffectsForBand } from "@/engine/effects";

export default function ResultsPage() {
  const router = useRouter();
  const [data, setData] = useState<BacInput | null>(null);
  const [sleepExpanded, setSleepExpanded] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("bacInputData");
    if (storedData) {
      try {
        setData(JSON.parse(storedData));
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, []);

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="card text-center">
          <p className="text-gray-600 mb-4">
            No input data found. Please complete the BAC estimator first.
          </p>
          <Link href="/check/" className="btn-primary inline-block">
            Start BAC Estimator
          </Link>
        </div>
      </div>
    );
  }

  // Compute BAC range
  const result = estimateBacRange(data);
  const effects = getEffectsForBand(result.bandKey);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Persistent Driving Banner */}
      <div className="mb-8 bg-red-100 border-l-4 border-red-600 p-5 rounded-lg">
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
              If you&apos;ve been drinking, don&apos;t drive. This estimate cannot determine if it&apos;s safe to operate a vehicle or machinery.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Your Estimated BAC Range
        </h1>
        <p className="text-gray-600">
          Based on your inputs, here is an estimated blood alcohol concentration range and typical effects.
        </p>
      </div>

      {/* Input Summary */}
      <div className="card mb-8 bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Your Inputs
        </h2>
        <div className="grid sm:grid-cols-2 gap-3 text-gray-700">
          <p>
            <strong>Standard drinks:</strong> {data.standardDrinks}
          </p>
          <p>
            <strong>Time window:</strong> {data.durationHours} hours
          </p>
          <p>
            <strong>Body weight:</strong> {data.weightLbs} lbs
          </p>
          <p>
            <strong>Sex at birth:</strong>{" "}
            {data.sexAtBirth === "male" ? "Male" : "Female"}
          </p>
        </div>
      </div>

      {/* BAC Range Display */}
      <div className="card mb-8 bg-gradient-to-br from-primary-50 to-blue-50 border-2 border-primary-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Estimated BAC Range
        </h2>
        <div className="text-center mb-6">
          <div className="text-6xl font-bold text-primary-700 mb-2">
            {result.low.toFixed(2)}–{result.high.toFixed(2)}%
          </div>
          <p className="text-lg text-gray-700">
            Midpoint estimate: {result.midpoint.toFixed(2)}%
          </p>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          This estimated range accounts for individual variation in metabolism rates. Actual BAC may vary based on factors including food consumption, hydration, liver health, medications, and genetics.
        </p>
      </div>

      {/* Effects Information */}
      <div className="card mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {effects.label}
        </h2>
        <p className="text-gray-600 mb-4">
          At this estimated BAC level, you may typically experience:
        </p>
        <ul className="space-y-3">
          {effects.effects.map((effect, index) => (
            <li key={index} className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-gray-800">{effect}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Sleep Impact */}
      <div className="card mb-8 bg-purple-50 border-2 border-purple-200">
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
                {/* Tonight Section */}
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

                {/* Tomorrow Section */}
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

                {/* What Helps Section */}
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
              This is an estimate only. Individual responses to alcohol vary significantly.
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
              Even small amounts of alcohol can impair judgment and reaction time.
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
              If concerned about your alcohol use, consult a healthcare provider.
            </span>
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Link href="/check/" className="btn-primary text-center flex-1">
          Check Again
        </Link>
        <Link href="/pause/" className="btn-secondary text-center flex-1">
          Pause & Decide
        </Link>
        <Link href="/" className="btn-secondary text-center flex-1">
          Return Home
        </Link>
      </div>
    </div>
  );
}
