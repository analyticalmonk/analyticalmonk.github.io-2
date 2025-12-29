import { getAllPosts, getPostsByCategory } from '@/lib/blog'
import BlogCard from '@/components/BlogCard'
import type { Metadata } from 'next'
import Link from 'next/link'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  const categories = [...new Set(posts.map(p => p.category))]
  return categories.map(category => ({
    category: category.toLowerCase(),
  }))
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const category = params.category.charAt(0).toUpperCase() + params.category.slice(1)
  return {
    title: `${category} Posts`,
    description: `All blog posts in the ${category} category`,
  }
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const posts = await getPostsByCategory(params.category)
  const categoryName = params.category.charAt(0).toUpperCase() + params.category.slice(1)

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/blog/" className="text-accent hover:text-accent-hover mb-4 inline-block">
          ← Back to all posts
        </Link>
        <h1 className="text-4xl font-bold">{categoryName}</h1>
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
