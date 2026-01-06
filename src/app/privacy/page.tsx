export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
        Privacy Policy
      </h1>

      <div className="prose prose-gray max-w-none">
        <div className="card mb-6">
          <p className="text-sm text-gray-600 italic">
            Last Updated: January 2026
          </p>
        </div>

        <div className="space-y-8">
          <section className="card">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Our Privacy Commitment</h2>
            <p className="text-gray-700 leading-relaxed">
              Alcohol Impact is designed with privacy as a core principle. We do not collect, store, or transmit any personal data to external servers. All information you enter into this application remains exclusively on your device.
            </p>
          </section>

          <section className="card">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Data Storage</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              This application uses browser local storage to save your responses and preferences. This means:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>All data is stored locally on your device only</li>
              <li>No data is transmitted to our servers or any third parties</li>
              <li>Data persists only in your browser on your device</li>
              <li>You can clear all data at any time through your browser settings or the app interface</li>
            </ul>
          </section>

          <section className="card">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Information We Do NOT Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We want to be clear about what we don't collect:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>No personal identifying information (name, email, phone number, etc.)</li>
              <li>No location data</li>
              <li>No usage analytics or tracking</li>
              <li>No cookies (except essential ones for app functionality)</li>
              <li>No third-party tracking scripts</li>
              <li>No advertising identifiers</li>
            </ul>
          </section>

          <section className="card">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">How to Delete Your Data</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Since all data is stored locally on your device, you have complete control:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Use the "Clear Data" button on the results page</li>
              <li>Clear your browser's local storage for this site</li>
              <li>Uninstall the PWA or clear browser cache</li>
            </ul>
          </section>

          <section className="card">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Open Source & Transparency</h2>
            <p className="text-gray-700 leading-relaxed">
              This application is built with open web technologies. The code can be inspected to verify our privacy claims. We believe in transparency and user control over personal information.
            </p>
          </section>

          <section className="card">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Third-Party Services</h2>
            <p className="text-gray-700 leading-relaxed">
              This application does not integrate with any third-party services, analytics platforms, or advertising networks. When you use this app, you are only interacting with code running on your device.
            </p>
          </section>

          <section className="card">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              If we make changes to this privacy policy, we will update the "Last Updated" date at the top of this page. Since we don't collect contact information, we cannot notify you directly of changes. We encourage you to review this policy periodically.
            </p>
          </section>

          <section className="card bg-blue-50 border-2 border-blue-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Questions or Concerns?</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions about this privacy policy or how your data is handled, please understand that since this is a privacy-first application with no data collection, there is no data for us to access, modify, or delete on our end. All control remains with you on your device.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
