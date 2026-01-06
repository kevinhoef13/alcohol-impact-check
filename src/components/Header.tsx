"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-primary-700">
            Alcohol Impact
          </Link>

          <div className="flex gap-2 sm:gap-4">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/")
                  ? "bg-primary-100 text-primary-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Home
            </Link>
            <Link
              href="/check/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/check/")
                  ? "bg-primary-100 text-primary-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Check
            </Link>
            <Link
              href="/pause/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/pause/")
                  ? "bg-primary-100 text-primary-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Pause
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
