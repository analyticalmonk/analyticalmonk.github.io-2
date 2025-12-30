'use client'

import { useEffect, useState } from 'react'
import SocialLinks from '@/components/SocialLinks'
import BlogCard from '@/components/BlogCard'
import Link from 'next/link'
import { BlogPost } from '@/types/blog'

export default function HomeClient({ posts }: { posts: BlogPost[] }) {
  const [isRetroMode, setIsRetroMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('retro-mode')
    if (saved !== null) {
      setIsRetroMode(saved === 'true')
    }
  }, [])

  const toggleMode = () => {
    const newMode = !isRetroMode
    setIsRetroMode(newMode)
    localStorage.setItem('retro-mode', String(newMode))
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      {/* Mode Toggle */}
      <button
        onClick={toggleMode}
        className={`fixed top-4 left-4 md:top-6 md:left-6 z-50 px-4 py-3 rounded-lg font-medium transition-all duration-300 text-sm ${
          isRetroMode
            ? 'bg-yellow-400 text-black border-4 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
            : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-accent shadow-md hover:shadow-lg'
        }`}
        aria-label="Toggle time machine"
        style={isRetroMode ? { fontFamily: 'Courier New, monospace' } : {}}
      >
        <div className="flex flex-col items-start gap-0.5">
          <div className="flex items-center gap-2">
            <span className="text-lg">⏰</span>
            <span className="font-semibold">
              {isRetroMode ? '1995' : 'Time Machine'}
            </span>
          </div>
          {!isRetroMode && (
            <span className="text-xs text-gray-500">Travel to 1995</span>
          )}
          {isRetroMode && (
            <span className="text-xs opacity-75">Return to 2025 →</span>
          )}
        </div>
      </button>

      {isRetroMode ? <RetroLanding posts={posts} /> : <MinimalLanding posts={posts} />}
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

// 1990s GeoCities-style retro design
function RetroLanding({ posts }: { posts: BlogPost[] }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #00FFFF 0%, #FF00FF 50%, #FFFF00 100%)',
      fontFamily: '"Times New Roman", Times, serif',
      padding: '20px'
    }}>
      {/* Animated marquee banner */}
      <div style={{
        backgroundColor: '#FF0000',
        color: '#FFFF00',
        padding: '10px',
        border: '5px ridge #FFD700',
        marginBottom: '20px',
        fontFamily: '"Courier New", monospace',
        fontSize: '18px',
        fontWeight: 'bold',
        overflow: 'hidden'
      }}>
        <div style={{
          animation: 'marquee 20s linear infinite',
          whiteSpace: 'nowrap'
        }}>
          ✨ WELCOME TO AKASH&apos;S HOMEPAGE ✨ BEST VIEWED IN NETSCAPE NAVIGATOR ✨ LAST UPDATED: {new Date().toLocaleDateString()} ✨ WELCOME TO AKASH&apos;S HOMEPAGE ✨
        </div>
      </div>

      {/* Main content table */}
      <center>
        <table border={5} cellPadding={20} style={{
          backgroundColor: '#FFFFFF',
          maxWidth: '800px',
          borderColor: '#000000'
        }}>
          <tbody>
            <tr>
              <td>
                {/* Header with blinking text */}
                <center>
                  <h1 style={{
                    fontFamily: '"Comic Sans MS", cursive',
                    color: '#FF0000',
                    fontSize: '48px',
                    textShadow: '3px 3px #000000',
                    marginBottom: '10px'
                  }}>
                    <span style={{ animation: 'blink 1s infinite' }}>★</span>
                    {' '}AKASH TANDON{' '}
                    <span style={{ animation: 'blink 1s infinite' }}>★</span>
                  </h1>

                  <div style={{
                    width: '88px',
                    height: '31px',
                    background: 'linear-gradient(135deg, #ff0000 25%, #ffff00 25%, #ffff00 50%, #ff0000 50%, #ff0000 75%, #ffff00 75%)',
                    border: '2px solid #000',
                    margin: '10px auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: '"Arial Black", Arial, sans-serif',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    animation: 'blink 2s infinite'
                  }}>
                    UNDER CONSTRUCTION
                  </div>

                  <p style={{
                    fontFamily: '"Times New Roman", Times, serif',
                    fontSize: '20px',
                    lineHeight: '1.6',
                    color: '#000080'
                  }}>
                    <b>FOUNDER, BUILDER, AND WRITER</b>
                    <br />
                    I write about <span style={{ color: '#FF0000' }}>STARTUPS</span>, <span style={{ color: '#008000' }}>AI</span>, and <span style={{ color: '#0000FF' }}>TECHNOLOGY</span>
                  </p>

                  {/* Visitor counter */}
                  <div style={{
                    background: '#000',
                    color: '#0f0',
                    padding: '10px',
                    border: '3px ridge #666',
                    margin: '15px auto',
                    fontFamily: '"Courier New", monospace',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    letterSpacing: '3px',
                    display: 'inline-block'
                  }}>
                    {String(Math.floor(Math.random() * 999999)).padStart(6, '0')}
                  </div>
                  <br />
                  <span style={{ fontSize: '14px' }}>You are visitor number</span>
                </center>

                <hr style={{ height: '3px', backgroundColor: '#FF00FF', border: 'none', margin: '20px 0' }} />

                {/* Social Links - 90s style */}
                <center>
                  <p style={{ fontFamily: '"Courier New", monospace', fontSize: '14px' }}>
                    <b>*** FIND ME ON THE INFORMATION SUPERHIGHWAY ***</b>
                  </p>
                  <SocialLinks />
                </center>

                <hr style={{ height: '3px', backgroundColor: '#00FFFF', border: 'none', margin: '20px 0' }} />

                {/* Blog Posts */}
                {posts.length > 0 && (
                  <>
                    <h2 style={{
                      fontFamily: '"Arial Black", Arial, sans-serif',
                      color: '#0000FF',
                      textAlign: 'center',
                      fontSize: '32px',
                      textDecoration: 'underline'
                    }}>
                      <span style={{ animation: 'blink 1.5s infinite' }}>→</span>
                      {' '}LATEST WRITINGS{' '}
                      <span style={{ animation: 'blink 1.5s infinite' }}>←</span>
                    </h2>

                    {posts.map(post => (
                      <div key={post.slug} style={{
                        backgroundColor: '#FFFF99',
                        border: '3px dashed #FF0000',
                        padding: '15px',
                        marginBottom: '15px'
                      }}>
                        <Link href={`/blog/${post.slug}/`} style={{ textDecoration: 'none' }}>
                          <h3 style={{
                            fontFamily: '"Comic Sans MS", cursive',
                            color: '#FF00FF',
                            fontSize: '24px',
                            textDecoration: 'underline'
                          }}>
                            ★ {post.title}
                          </h3>
                        </Link>
                        <p style={{
                          fontFamily: '"Times New Roman", Times, serif',
                          fontSize: '16px',
                          color: '#000000'
                        }}>
                          {post.excerpt}
                        </p>
                        <p style={{
                          fontFamily: '"Courier New", monospace',
                          fontSize: '12px',
                          color: '#666666'
                        }}>
                          <b>POSTED:</b> {new Date(post.date).toLocaleDateString()} |
                          <b> CATEGORY:</b> {post.category} |
                          <b> TIME:</b> {post.readingTime}
                        </p>
                        <Link
                          href={`/blog/${post.slug}/`}
                          style={{
                            backgroundColor: '#00FF00',
                            color: '#000000',
                            padding: '5px 15px',
                            textDecoration: 'none',
                            border: '2px outset #00FF00',
                            fontFamily: '"Arial", sans-serif',
                            fontWeight: 'bold',
                            display: 'inline-block'
                          }}
                        >
                          [ READ MORE &gt;&gt; ]
                        </Link>
                      </div>
                    ))}

                    <center>
                      <Link
                        href="/blog/"
                        style={{
                          backgroundColor: '#FF0000',
                          color: '#FFFF00',
                          padding: '10px 20px',
                          textDecoration: 'none',
                          border: '4px outset #FF0000',
                          fontFamily: '"Arial Black", Arial, sans-serif',
                          fontSize: '18px',
                          display: 'inline-block',
                          margin: '20px 0'
                        }}
                      >
                        «« SEE ALL POSTS »»
                      </Link>
                    </center>
                  </>
                )}

                <hr style={{ height: '3px', backgroundColor: '#FF00FF', border: 'none', margin: '20px 0' }} />

                {/* Footer */}
                <center>
                  <p style={{
                    fontFamily: '"Courier New", monospace',
                    fontSize: '14px',
                    color: '#000000',
                    lineHeight: '1.8'
                  }}>
                    <b>This page is best viewed in:</b><br />
                    ★ Netscape Navigator 4.0+<br />
                    ★ 800x600 screen resolution<br />
                    ★ 256 colors<br />
                    <br />
                    <span style={{ fontSize: '10px' }}>© {new Date().getFullYear()} Akash Tandon. All rights reserved.<br />
                    Webmaster: akash@internet.com<br />
                    Last updated: {new Date().toLocaleDateString()}</span>
                  </p>
                </center>
              </td>
            </tr>
          </tbody>
        </table>
      </center>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
