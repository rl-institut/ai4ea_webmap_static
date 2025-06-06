import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow max-w-4xl mx-auto py-12 px-4">
        <div className="mb-6">
          <Link
            href="/"
            className="text-emerald-700 hover:text-emerald-600 hover:underline transition-colors duration-200"
          >
            ← Back to Map
          </Link>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

          <div className="prose max-w-none">
            <p className="text-gray-600 mb-4">Last updated: June 1, 2023</p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Introduction</h2>
            <p className="text-gray-600 mb-4">
              This Privacy Policy describes how PowerGrid Africa ("we," "us," or "our") collects, uses, and shares
              information in connection with your use of our website (powergridafrica.example).
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Information We Collect</h2>
            <p className="text-gray-600 mb-4">We collect information that you provide directly to us when you:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Use interactive features of our platform</li>
              <li>Register for an account</li>
              <li>Sign up for our newsletter</li>
              <li>Contact us with questions or feedback</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">How We Use Information</h2>
            <p className="text-gray-600 mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Provide, maintain, and improve our services</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Communicate with you about products, services, and events</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">Cookies and Similar Technologies</h2>
            <p className="text-gray-600 mb-4">
              We use cookies and similar technologies to collect information about your browsing activities and to
              distinguish you from other users of our website.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Data Security</h2>
            <p className="text-gray-600 mb-4">
              We take reasonable measures to help protect information about you from loss, theft, misuse, and
              unauthorized access, disclosure, alteration, and destruction.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Changes to This Privacy Policy</h2>
            <p className="text-gray-600 mb-4">
              We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising
              the date at the top of the policy.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy, please contact us at: privacy@powergridafrica.example
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
