import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/" className="text-accent hover:text-accent-hover font-medium">
        Go back home →
      </Link>
    </div>
  )
}
