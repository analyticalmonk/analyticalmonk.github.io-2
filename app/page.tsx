import { getAllPosts } from '@/lib/blog'
import SocialLinks from '@/components/SocialLinks'
import BlogCard from '@/components/BlogCard'
import Link from 'next/link'

export default async function Home() {
  const posts = await getAllPosts()
  const recentPosts = posts.slice(0, 5)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Hi, I&apos;m Akash Tandon
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
          Founder, builder, and writer. I write about startups, AI, and technology.
        </p>
        <SocialLinks />
      </section>

      {/* Recent Posts Section */}
      {recentPosts.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Recent Posts</h2>
            <Link href="/blog/" className="text-accent hover:text-accent-hover font-medium">
              View all →
            </Link>
          </div>
          <div className="space-y-8">
            {recentPosts.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
