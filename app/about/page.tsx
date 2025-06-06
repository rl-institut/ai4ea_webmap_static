import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function AboutPage() {
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
          <h1 className="text-3xl font-bold mb-6">About</h1>

          <div className="prose max-w-none">
            <p className="text-gray-600 mb-4">
              This is the About page for the PowerGrid Africa platform. This page would contain information about the
              project, its goals, and the team behind it.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Project Overview</h2>
            <p className="text-gray-600 mb-4">
              The PowerGrid Africa platform is designed to visualize electricity load data across local regions (LGAs)
              in Africa. It provides tools for analyzing peak demand, load factors, and electrification rates across
              different countries and regions.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              Our mission is to provide accessible data visualization tools that help stakeholders make informed
              decisions about energy infrastructure and planning in Africa.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">The Team</h2>
            <p className="text-gray-600 mb-4">
              Information about the team members and organizations involved in the project would be listed here.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
