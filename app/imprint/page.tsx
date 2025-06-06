import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function ImprintPage() {
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
          <h1 className="text-3xl font-bold mb-6">Imprint</h1>

          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mt-6 mb-3">Legal Information</h2>
            <p className="text-gray-600 mb-4">This website is operated by:</p>

            <div className="bg-gray-50 p-4 rounded mb-6">
              <p className="text-gray-700">PowerGrid Africa Ltd.</p>
              <p className="text-gray-700">123 Energy Street</p>
              <p className="text-gray-700">Example City, EX 12345</p>
              <p className="text-gray-700">Country</p>
              <p className="text-gray-700 mt-2">Email: info@powergridafrica.example</p>
              <p className="text-gray-700">Phone: +1 (555) 123-4567</p>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-3">Responsible for Content</h2>
            <p className="text-gray-600 mb-4">
              John Doe
              <br />
              CEO, PowerGrid Africa Ltd.
              <br />
              Address same as above
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Commercial Register</h2>
            <p className="text-gray-600 mb-4">
              Commercial Register: Example City Commercial Court
              <br />
              Registration Number: REG12345678
              <br />
              VAT ID: VAT987654321
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Disclaimer</h2>
            <p className="text-gray-600 mb-4">
              The information contained in this website is for general information purposes only. The information is
              provided by PowerGrid Africa Ltd., and while we endeavor to keep the information up to date and correct,
              we make no representations or warranties of any kind, express or implied, about the completeness,
              accuracy, reliability, suitability or availability with respect to the website or the information,
              products, services, or related graphics contained on the website for any purpose.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Copyright</h2>
            <p className="text-gray-600 mb-4">
              © 2023 PowerGrid Africa Ltd. All rights reserved. The content, design, and layout of this website are
              subject to copyright owned by PowerGrid Africa Ltd. or used under license from third-party copyright
              owners. No part of this website may be reproduced in any form without the prior written permission of
              PowerGrid Africa Ltd.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
