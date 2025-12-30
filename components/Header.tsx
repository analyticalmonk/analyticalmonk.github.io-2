'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isRetroMode, setIsRetroMode] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('retro-mode')
    if (saved !== null) {
      setIsRetroMode(saved === 'true')
    }

    // Listen for storage changes from HomeClient
    const handleStorageChange = () => {
      const saved = localStorage.getItem('retro-mode')
      if (saved !== null) {
        setIsRetroMode(saved === 'true')
      }
    }

    // Listen for transition start
    const handleTransitionStart = () => {
      setIsTransitioning(true)
      setTimeout(() => setIsTransitioning(false), 1400)
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('retro-mode-change', handleStorageChange)
    window.addEventListener('retro-mode-change', handleTransitionStart)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('retro-mode-change', handleStorageChange)
      window.removeEventListener('retro-mode-change', handleTransitionStart)
    }
  }, [])

  const toggleMode = () => {
    const newMode = !isRetroMode
    setIsRetroMode(newMode)
    localStorage.setItem('retro-mode', String(newMode))
    // Dispatch custom event for same-page updates
    window.dispatchEvent(new Event('retro-mode-change'))
  }

  if (!mounted) {
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

  // Check if we're on the homepage (with or without basePath)
  const isHomepage = pathname === '/' || pathname === '/analyticalmonk.github.io-2' || pathname === '/analyticalmonk.github.io-2/'

  return (
    <header
      className="border-b border-gray-200 transition-all duration-700 ease-in-out"
      style={{
        opacity: isTransitioning ? 0.2 : 1,
        transform: isTransitioning ? 'scale(0.95)' : 'scale(1)'
      }}
    >
      <nav className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:text-accent transition-colors">
          Akash Tandon
        </Link>
        <div className="flex items-center gap-6">
          {isHomepage && (
            <button
              onClick={toggleMode}
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
                isRetroMode
                  ? 'bg-yellow-400 text-black border-2 border-black font-bold'
                  : 'bg-gray-50 text-gray-700 border border-gray-300 hover:border-accent hover:bg-gray-100'
              }`}
              aria-label="Toggle time machine"
              style={isRetroMode ? { fontFamily: 'Courier New, monospace' } : {}}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">⏰</span>
                <span className="font-semibold">
                  {isRetroMode ? '1995' : '2025'}
                </span>
              </div>
            </button>
          )}
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
