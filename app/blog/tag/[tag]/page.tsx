import { getAllPosts, getPostsByTag } from '@/lib/blog'
import BlogCard from '@/components/BlogCard'
import type { Metadata } from 'next'
import Link from 'next/link'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  const tags = [...new Set(posts.flatMap(p => p.tags))]
  return tags.map(tag => ({
    tag: tag.toLowerCase(),
  }))
}

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
  return {
    title: `#${params.tag}`,
    description: `All blog posts tagged with ${params.tag}`,
  }
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  const posts = await getPostsByTag(params.tag)

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/blog/" className="text-accent hover:text-accent-hover mb-4 inline-block">
          ← Back to all posts
        </Link>
        <h1 className="text-4xl font-bold">#{params.tag}</h1>
        <p className="text-gray-600 mt-2">{posts.length} {posts.length === 1 ? 'post' : 'posts'}</p>
      </div>

      <div className="space-y-8">
        {posts.map(post => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </main>
  )
}
