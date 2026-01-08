import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="container mx-auto px-4 py-3">
        <Link href="/" className="text-lg font-bold text-primary-700">
          Alcohol Impact Estimator
        </Link>
      </nav>
    </header>
  );
}
