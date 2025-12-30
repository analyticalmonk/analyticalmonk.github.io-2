'use client'

import { useEffect, useState } from 'react'
import SocialLinks from '@/components/SocialLinks'
import BlogCard from '@/components/BlogCard'
import Link from 'next/link'
import { BlogPost } from '@/types/blog'

export default function HomeClient({ posts }: { posts: BlogPost[] }) {
  const [isRefinedMode, setIsRefinedMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('refined-mode')
    if (saved !== null) {
      setIsRefinedMode(saved === 'true')
    }
  }, [])

  const toggleMode = () => {
    const newMode = !isRefinedMode
    setIsRefinedMode(newMode)
    localStorage.setItem('refined-mode', String(newMode))
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      {/* Mode Toggle */}
      <button
        onClick={toggleMode}
        className={`fixed top-4 right-4 md:top-6 md:right-6 z-50 px-5 py-2.5 rounded-lg font-medium transition-all duration-300 text-sm ${
          isRefinedMode
            ? 'bg-gradient-to-r from-slate-800 to-slate-900 text-white border border-slate-700 hover:border-accent shadow-lg hover:shadow-xl'
            : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
        }`}
        aria-label="Toggle design mode"
      >
        {isRefinedMode ? '✦ Refined' : '◇ Classic'}
      </button>

      {isRefinedMode ? <RefinedLanding posts={posts} /> : <MinimalLanding posts={posts} />}
    </>
  )
}

// Original minimal design
function MinimalLanding({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="min-h-screen">
      <section className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Hi, I&apos;m Akash Tandon
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
          Founder, builder, and writer. I write about startups, AI, and technology.
        </p>
        <SocialLinks />
      </section>

      {posts.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Recent Posts</h2>
            <Link href="/blog/" className="text-accent hover:text-accent-hover font-medium">
              View all →
            </Link>
          </div>
          <div className="space-y-8">
            {posts.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

// New refined design
function RefinedLanding({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-16">
        <div className="relative">
          {/* Decorative element */}
          <div className="absolute -left-3 top-0 w-1 h-24 bg-gradient-to-b from-accent to-transparent opacity-60"></div>

          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-sm uppercase tracking-[0.2em] text-gray-500 font-medium">
                Welcome
              </span>
            </div>

            <h1
              className="text-5xl md:text-7xl font-bold leading-tight tracking-tight"
              style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
            >
              <span className="block text-gray-900">Hi, I'm</span>
              <span className="block bg-gradient-to-r from-gray-900 via-slate-800 to-gray-700 bg-clip-text text-transparent">
                Akash Tandon
              </span>
            </h1>

            <div className="max-w-2xl">
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                Founder, builder, and writer exploring the intersection of{' '}
                <span className="text-gray-900 font-medium">startups</span>,{' '}
                <span className="text-gray-900 font-medium">AI</span>, and{' '}
                <span className="text-gray-900 font-medium">technology</span>.
              </p>
            </div>

            <div className="pt-4">
              <SocialLinks refined />
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      {posts.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="mb-12">
            <div className="flex items-center justify-between mb-3">
              <h2
                className="text-4xl md:text-5xl font-bold text-gray-900"
                style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
              >
                Recent Writing
              </h2>
              <Link
                href="/blog/"
                className="group inline-flex items-center gap-2 text-accent hover:text-accent-hover font-medium transition-colors"
              >
                <span>View all</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="w-16 h-1 bg-gradient-to-r from-accent to-transparent"></div>
          </div>

          <div className="space-y-6">
            {posts.map((post, index) => (
              <RefinedBlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-16 mt-16 border-t border-gray-200">
        <p className="text-sm text-gray-500 text-center">
          © 2025 Akash Tandon · Crafted with care
        </p>
      </footer>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

function RefinedBlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <Link
      href={`/blog/${post.slug}/`}
      className="group block"
      style={{
        animation: 'fadeIn 0.6s ease-out forwards',
        animationDelay: `${index * 0.1}s`,
        opacity: 0
      }}
    >
      <article className="relative bg-white border border-gray-200 rounded-xl p-8 transition-all duration-300 hover:shadow-xl hover:border-accent/30 hover:-translate-y-1">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent/5 to-transparent rounded-bl-full transition-opacity group-hover:opacity-100 opacity-0"></div>

        <div className="relative">
          {/* Category badge */}
          <div className="inline-block mb-3">
            <span className="text-xs uppercase tracking-wider text-accent font-semibold px-3 py-1 bg-accent/10 rounded-full">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-accent transition-colors leading-snug"
            style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>

          {/* Read more indicator */}
          <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2 text-accent text-sm font-medium">
              <span>Read article</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
