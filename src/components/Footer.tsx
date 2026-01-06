import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-8">
        {/* Disclaimer */}
        <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-200 leading-relaxed">
            <strong className="font-semibold">Educational Information Only:</strong> This app provides general educational information about alcohol consumption and its effects. It is not medical advice and should not replace professional healthcare consultation. If you have concerns about alcohol use, please consult a qualified healthcare provider.
          </p>
        </div>

        {/* Footer Links */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
          <div className="flex gap-6">
            <Link
              href="/privacy/"
              className="text-sm hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms/"
              className="text-sm hover:text-white transition-colors"
            >
              Terms of Use
            </Link>
          </div>

          <p className="text-sm text-gray-400">
            &copy; {currentYear} Alcohol Impact. All rights reserved.
          </p>
        </div>

        {/* Additional Info */}
        <div className="text-xs text-gray-500 text-center pt-4 border-t border-gray-800">
          <p>This is an educational tool. Data is stored locally on your device only.</p>
        </div>
      </div>
    </footer>
  );
}
