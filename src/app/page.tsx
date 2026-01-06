import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Understand Alcohol&apos;s Impact
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Evidence-based information to help you make informed decisions about alcohol consumption and its effects on health.
        </p>
      </section>

      {/* Feature Cards */}
      <section className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="card">
          <div className="text-primary-600 mb-3">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-2">Impact Check</h2>
          <p className="text-gray-600 mb-4">
            Learn how alcohol consumption may affect various aspects of health based on research-backed information.
          </p>
          <Link href="/check/" className="btn-primary inline-block">
            Start Check
          </Link>
        </div>

        <div className="card">
          <div className="text-primary-600 mb-3">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-2">Pause Calculator</h2>
          <p className="text-gray-600 mb-4">
            Estimate how long it may take for alcohol to be processed by the body based on standard guidelines.
          </p>
          <Link href="/pause/" className="btn-primary inline-block">
            Calculate
          </Link>
        </div>
      </section>

      {/* Educational Content */}
      <section className="card mb-12">
        <h2 className="text-2xl font-semibold mb-4">What You&apos;ll Learn</h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-700">How alcohol is processed by the body and factors that influence metabolism</span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-700">Potential short-term and long-term effects of alcohol consumption</span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-700">Standard drink sizes and alcohol content guidelines</span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-700">Evidence-based information to support informed decision-making</span>
          </li>
        </ul>
      </section>

      {/* Important Note */}
      <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          Important Information
        </h3>
        <p className="text-blue-800 text-sm leading-relaxed">
          This educational tool provides general information only. Individual responses to alcohol vary significantly based on numerous factors including genetics, health status, medications, and other personal circumstances. This tool cannot provide personalized advice. Always consult healthcare professionals for guidance specific to your situation.
        </p>
      </section>
    </div>
  );
}
