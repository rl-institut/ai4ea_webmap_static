import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function SourcesPage() {
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
          <h1 className="text-3xl font-bold mb-6">Data Sources</h1>

          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              This page provides information about the data sources used in the PowerGrid Africa platform. Understanding
              our data sources helps users interpret the visualizations correctly.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Primary Data Sources</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                <strong>National Energy Commissions</strong> - Official data from energy regulatory bodies in Benin,
                Niger, Nigeria, Togo, and Ghana.
              </li>
              <li>
                <strong>World Bank Energy Data</strong> - Comprehensive datasets on energy access, consumption, and
                infrastructure across African nations.
              </li>
              <li>
                <strong>African Development Bank</strong> - Regional energy statistics and development indicators.
              </li>
              <li>
                <strong>Local Government Surveys</strong> - Detailed information collected at the LGA level about energy
                usage patterns.
              </li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">Data Processing Methodology</h2>
            <p className="text-gray-600 mb-4">
              Our data undergoes rigorous processing and validation before being presented in the platform:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-gray-600">
              <li>Raw data collection from multiple sources</li>
              <li>Data cleaning and normalization</li>
              <li>Cross-validation between sources</li>
              <li>Aggregation at different geographic levels</li>
              <li>Quality assurance checks</li>
            </ol>

            <h2 className="text-xl font-semibold mt-6 mb-3">Data Update Frequency</h2>
            <p className="text-gray-600 mb-4">
              The data on this platform is updated quarterly, with the most recent update on June 1, 2023. Historical
              data is available dating back to 2015.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Citations and References</h2>
            <div className="bg-gray-50 p-4 rounded text-sm text-gray-600">
              <p className="mb-2">
                World Bank. (2022). <em>Electricity Access in Sub-Saharan Africa</em>. Washington, DC: World Bank.
              </p>
              <p className="mb-2">
                African Development Bank. (2023). <em>Energy Sector Database</em>. Abidjan: AfDB Group.
              </p>
              <p className="mb-2">
                Nigerian Electricity Regulatory Commission. (2023). <em>Annual Report on Electricity Distribution</em>.
                Abuja: NERC.
              </p>
              <p>
                Ghana Energy Commission. (2022). <em>National Energy Statistics</em>. Accra: GEC.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
