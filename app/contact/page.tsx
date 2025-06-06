import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function ContactPage() {
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
          <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
              <p className="text-gray-600 mb-4">
                Have questions about AI4EA? We're here to help. Fill out the form or use the
                contact information below to reach us.
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Email</h3>
                  <p className="text-gray-600">contact@AI4EA.example</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Address</h3>
                  <p className="text-gray-600">
                    123 Energy Street
                    <br />
                    Suite 456
                    <br />
                    Example City, EX 12345
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Contact Form</h2>
              <p className="text-gray-600 mb-4">
                This is a placeholder for a contact form. In a real implementation, this would be a functional form that
                submits user inquiries.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Your name" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded h-32"
                    placeholder="Your message"
                  ></textarea>
                </div>

                <button className="bg-emerald-700 text-white px-4 py-2 rounded hover:bg-emerald-800 transition-colors duration-200">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
