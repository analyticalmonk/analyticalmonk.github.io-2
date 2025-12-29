import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-gray-200">
      <nav className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:text-accent transition-colors">
          Akash Tandon
        </Link>
        <div className="flex gap-6">
          <Link href="/blog" className="hover:text-accent transition-colors">
            Blog
          </Link>
          <Link href="/rss.xml" className="hover:text-accent transition-colors">
            RSS
          </Link>
        </div>
      </nav>
    </header>
  )
}
