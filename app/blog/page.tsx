import { getAllPosts, getAllCategories } from '@/lib/blog'
import BlogCard from '@/components/BlogCard'
import CategoryBadge from '@/components/CategoryBadge'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles about startups, AI, and technology',
}

export default async function BlogPage() {
  const posts = await getAllPosts()
  const categories = await getAllCategories()

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>

      {/* Category filters */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <CategoryBadge key={category} category={category} />
          ))}
        </div>
      )}

      {/* Posts list */}
      {posts.length > 0 ? (
        <div className="space-y-8">
          {posts.map(post => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No blog posts yet. Check back soon!</p>
      )}
    </main>
  )
}
