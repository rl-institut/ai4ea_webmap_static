import Link from "next/link"
import Image from "next/image"

export function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Link href="/">
            <Image
              src="/ai4ea-logo.svg"
              alt="AI4EA Logo"
              width={140}
              height={45}
              className="h-10 w-auto cursor-pointer"
            />
          </Link>
        </div>

        {/* Right Navigation */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-gray-600 hover:text-emerald-600 font-normal transition-colors duration-200">
            Map
          </Link>
          <Link
            href="/about"
            className="text-gray-600 hover:text-emerald-600 font-normal transition-colors duration-200"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 hover:text-emerald-600 font-normal transition-colors duration-200"
          >
            Contact
          </Link>
          <Link
            href="/sources"
            className="text-gray-600 hover:text-emerald-600 font-normal transition-colors duration-200"
          >
            Sources
          </Link>
        </div>
      </div>
    </nav>
  )
}
