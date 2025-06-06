import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <div className="flex items-center mb-2">
              <Image src="/ai4ea-logo.svg" alt="AI4EA Logo" width={100} height={32} className="h-8 w-auto" />
            </div>
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} AI4EA. All rights reserved.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            <Link href="/" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors duration-200">
              Map
            </Link>
            <Link href="/about" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors duration-200">
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm text-gray-600 hover:text-emerald-600 transition-colors duration-200"
            >
              Contact
            </Link>
            <Link
              href="/sources"
              className="text-sm text-gray-600 hover:text-emerald-600 transition-colors duration-200"
            >
              Sources
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-gray-600 hover:text-emerald-600 transition-colors duration-200"
            >
              Privacy
            </Link>
            <Link
              href="/imprint"
              className="text-sm text-gray-600 hover:text-emerald-600 transition-colors duration-200"
            >
              Imprint
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
