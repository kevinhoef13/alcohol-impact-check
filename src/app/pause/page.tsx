"use client";

import { useState } from "react";
import Link from "next/link";

type ChecklistItem = {
  id: string;
  label: string;
  checked: boolean;
};

export default function PausePage() {
  const [items, setItems] = useState<ChecklistItem[]>([
    {
      id: "feeling",
      label: "I've taken a moment to check in with how I'm feeling physically and mentally",
      checked: false,
    },
    {
      id: "safety",
      label: "I have a safe way to get home (rideshare, taxi, designated driver, staying here)",
      checked: false,
    },
    {
      id: "water",
      label: "I've had some water and/or food",
      checked: false,
    },
    {
      id: "pace",
      label: "I'm aware of how much I've had and am making intentional choices",
      checked: false,
    },
    {
      id: "comfortable",
      label: "I feel comfortable with my surroundings and the people I'm with",
      checked: false,
    },
  ]);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const allChecked = items.every((item) => item.checked);

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Pause & Decide
        </h1>
        <p className="text-gray-600">
          Take a moment to check in with yourself. Use this checklist to make intentional decisions about your evening.
        </p>
      </div>

      {/* Important Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-5 mb-8 rounded-lg">
        <div className="flex items-start gap-4">
          <svg
            className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="text-blue-900 font-semibold mb-1">
              Remember: This is not a tool for deciding when it's safe to drive
            </p>
            <p className="text-blue-800 text-sm">
              If you've been drinking, don't drive. Plan for safe transportation regardless of how you feel.
            </p>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Check-In Checklist
        </h2>
        <div className="space-y-4">
          {items.map((item) => (
            <label
              key={item.id}
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 cursor-pointer border-2 transition-colors"
              style={{
                borderColor: item.checked ? "#0284c7" : "transparent",
                backgroundColor: item.checked ? "#f0f9ff" : "transparent",
              }}
            >
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleItem(item.id)}
                className="w-5 h-5 text-primary-600 rounded mt-0.5 flex-shrink-0"
              />
              <span className="text-gray-800 leading-relaxed">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Completion Message */}
      {allChecked && (
        <div className="card bg-green-50 border-2 border-green-200 mb-8">
          <div className="flex items-start gap-4">
            <svg
              className="w-8 h-8 text-green-600 flex-shrink-0"
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
                You've checked in
              </h3>
              <p className="text-green-800">
                You've thought through the important aspects of your safety and wellbeing. Continue to check in with yourself throughout the evening.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tips Section */}
      <div className="card bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Helpful Tips
        </h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
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
            <span className="text-gray-700">
              Alternate alcoholic drinks with water to stay hydrated and pace yourself
            </span>
          </li>
          <li className="flex items-start gap-3">
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
            <span className="text-gray-700">
              Eat food before and while drinking to slow alcohol absorption
            </span>
          </li>
          <li className="flex items-start gap-3">
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
            <span className="text-gray-700">
              Set a limit for yourself before you start drinking and stick to it
            </span>
          </li>
          <li className="flex items-start gap-3">
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
            <span className="text-gray-700">
              Stay with friends and look out for each other
            </span>
          </li>
          <li className="flex items-start gap-3">
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
            <span className="text-gray-700">
              It's always okay to stop drinking or leave if you're uncomfortable
            </span>
          </li>
          <li className="flex items-start gap-3">
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
            <span className="text-gray-700">
              Keep your phone charged and accessible for safety and transportation
            </span>
          </li>
        </ul>
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Link href="/check/" className="btn-primary text-center flex-1">
          Check BAC Range
        </Link>
        <Link href="/" className="btn-secondary text-center flex-1">
          Return Home
        </Link>
      </div>

      {/* Emergency Info */}
      <div className="mt-8 bg-red-50 border-2 border-red-200 rounded-lg p-5">
        <h3 className="text-lg font-semibold text-red-900 mb-2">
          In Case of Emergency
        </h3>
        <p className="text-red-800 text-sm mb-3">
          If you or someone you're with shows signs of alcohol poisoning (confusion, vomiting, seizures, slow breathing, unconsciousness), call 911 immediately.
        </p>
        <p className="text-red-800 text-sm font-semibold">
          Emergency: 911
        </p>
      </div>
    </div>
  );
}
