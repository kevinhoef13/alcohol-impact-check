"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BacInput, INPUT_CONSTRAINTS, SexAtBirth } from "@/engine/types";

export default function CheckPage() {
  const router = useRouter();
  const [standardDrinks, setStandardDrinks] = useState<number>(1);
  const [durationHours, setDurationHours] = useState<number>(2);
  const [weightLbs, setWeightLbs] = useState<number>(150);
  const [sexAtBirth, setSexAtBirth] = useState<SexAtBirth>("male");

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("bacInputData");
    if (stored) {
      try {
        const data = JSON.parse(stored) as BacInput;
        setStandardDrinks(data.standardDrinks);
        setDurationHours(data.durationHours);
        setWeightLbs(data.weightLbs);
        setSexAtBirth(data.sexAtBirth);
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data: BacInput = {
      standardDrinks,
      durationHours,
      weightLbs,
      sexAtBirth,
    };

    localStorage.setItem("bacInputData", JSON.stringify(data));
    router.push("/results/");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          BAC Range Estimator
        </h1>
        <p className="text-gray-600">
          Estimate your blood alcohol concentration range based on drinks consumed, time elapsed, and body characteristics.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Standard Drinks */}
        <div className="card">
          <label className="block text-lg font-semibold text-gray-900 mb-2">
            Number of Standard Drinks
          </label>
          <p className="text-sm text-gray-600 mb-4">
            A standard drink is 12 oz beer (5% ABV), 5 oz wine (12% ABV), or 1.5 oz spirits (40% ABV).
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() =>
                setStandardDrinks((prev) =>
                  Math.max(
                    INPUT_CONSTRAINTS.standardDrinks.min,
                    prev - INPUT_CONSTRAINTS.standardDrinks.step
                  )
                )
              }
              className="w-12 h-12 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xl transition-colors"
              aria-label="Decrease drinks"
            >
              −
            </button>
            <div className="flex-1 text-center">
              <input
                type="number"
                value={standardDrinks}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val)) {
                    setStandardDrinks(
                      Math.max(
                        INPUT_CONSTRAINTS.standardDrinks.min,
                        Math.min(INPUT_CONSTRAINTS.standardDrinks.max, val)
                      )
                    );
                  }
                }}
                min={INPUT_CONSTRAINTS.standardDrinks.min}
                max={INPUT_CONSTRAINTS.standardDrinks.max}
                step={INPUT_CONSTRAINTS.standardDrinks.step}
                className="input-field text-center text-2xl font-bold w-full"
                required
              />
            </div>
            <button
              type="button"
              onClick={() =>
                setStandardDrinks((prev) =>
                  Math.min(
                    INPUT_CONSTRAINTS.standardDrinks.max,
                    prev + INPUT_CONSTRAINTS.standardDrinks.step
                  )
                )
              }
              className="w-12 h-12 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xl transition-colors"
              aria-label="Increase drinks"
            >
              +
            </button>
          </div>
        </div>

        {/* Duration Hours */}
        <div className="card">
          <label className="block text-lg font-semibold text-gray-900 mb-2">
            Time Window (hours)
          </label>
          <p className="text-sm text-gray-600 mb-4">
            How many hours have passed since you started drinking?
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() =>
                setDurationHours((prev) =>
                  Math.max(
                    INPUT_CONSTRAINTS.durationHours.min,
                    prev - INPUT_CONSTRAINTS.durationHours.step
                  )
                )
              }
              className="w-12 h-12 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xl transition-colors"
              aria-label="Decrease hours"
            >
              −
            </button>
            <div className="flex-1 text-center">
              <input
                type="number"
                value={durationHours}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val)) {
                    setDurationHours(
                      Math.max(
                        INPUT_CONSTRAINTS.durationHours.min,
                        Math.min(INPUT_CONSTRAINTS.durationHours.max, val)
                      )
                    );
                  }
                }}
                min={INPUT_CONSTRAINTS.durationHours.min}
                max={INPUT_CONSTRAINTS.durationHours.max}
                step={INPUT_CONSTRAINTS.durationHours.step}
                className="input-field text-center text-2xl font-bold w-full"
                required
              />
            </div>
            <button
              type="button"
              onClick={() =>
                setDurationHours((prev) =>
                  Math.min(
                    INPUT_CONSTRAINTS.durationHours.max,
                    prev + INPUT_CONSTRAINTS.durationHours.step
                  )
                )
              }
              className="w-12 h-12 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xl transition-colors"
              aria-label="Increase hours"
            >
              +
            </button>
          </div>
        </div>

        {/* Weight */}
        <div className="card">
          <label className="block text-lg font-semibold text-gray-900 mb-2">
            Body Weight (lbs)
          </label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() =>
                setWeightLbs((prev) =>
                  Math.max(
                    INPUT_CONSTRAINTS.weightLbs.min,
                    prev - INPUT_CONSTRAINTS.weightLbs.step
                  )
                )
              }
              className="w-12 h-12 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xl transition-colors"
              aria-label="Decrease weight"
            >
              −
            </button>
            <div className="flex-1 text-center">
              <input
                type="number"
                value={weightLbs}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (!isNaN(val)) {
                    setWeightLbs(
                      Math.max(
                        INPUT_CONSTRAINTS.weightLbs.min,
                        Math.min(INPUT_CONSTRAINTS.weightLbs.max, val)
                      )
                    );
                  }
                }}
                min={INPUT_CONSTRAINTS.weightLbs.min}
                max={INPUT_CONSTRAINTS.weightLbs.max}
                step={INPUT_CONSTRAINTS.weightLbs.step}
                className="input-field text-center text-2xl font-bold w-full"
                required
              />
            </div>
            <button
              type="button"
              onClick={() =>
                setWeightLbs((prev) =>
                  Math.min(
                    INPUT_CONSTRAINTS.weightLbs.max,
                    prev + INPUT_CONSTRAINTS.weightLbs.step
                  )
                )
              }
              className="w-12 h-12 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xl transition-colors"
              aria-label="Increase weight"
            >
              +
            </button>
          </div>
        </div>

        {/* Sex at Birth */}
        <div className="card">
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            Sex at Birth
          </label>
          <div className="flex gap-4">
            <label
              className="flex-1 flex items-center justify-center gap-3 p-4 rounded-lg hover:bg-gray-50 cursor-pointer border-2 transition-colors"
              style={{
                borderColor: sexAtBirth === "male" ? "#0284c7" : "transparent",
                backgroundColor:
                  sexAtBirth === "male" ? "#f0f9ff" : "transparent",
              }}
            >
              <input
                type="radio"
                name="sexAtBirth"
                value="male"
                checked={sexAtBirth === "male"}
                onChange={(e) => setSexAtBirth(e.target.value as SexAtBirth)}
                className="w-4 h-4 text-primary-600"
                required
              />
              <span className="text-gray-800 font-medium">Male</span>
            </label>
            <label
              className="flex-1 flex items-center justify-center gap-3 p-4 rounded-lg hover:bg-gray-50 cursor-pointer border-2 transition-colors"
              style={{
                borderColor:
                  sexAtBirth === "female" ? "#0284c7" : "transparent",
                backgroundColor:
                  sexAtBirth === "female" ? "#f0f9ff" : "transparent",
              }}
            >
              <input
                type="radio"
                name="sexAtBirth"
                value="female"
                checked={sexAtBirth === "female"}
                onChange={(e) => setSexAtBirth(e.target.value as SexAtBirth)}
                className="w-4 h-4 text-primary-600"
                required
              />
              <span className="text-gray-800 font-medium">Female</span>
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            BAC estimation differs by biological sex due to differences in body water distribution.
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button type="submit" className="btn-primary flex-1">
            Calculate BAC Range
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Privacy Note */}
      <div className="mt-8 bg-gray-100 rounded-lg p-5">
        <p className="text-sm text-gray-700">
          <strong>Privacy:</strong> All calculations are performed locally in your browser. No data is transmitted to any server.
        </p>
      </div>
    </div>
  );
}
