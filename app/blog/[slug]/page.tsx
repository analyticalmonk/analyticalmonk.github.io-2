import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { renderMDX } from '@/lib/mdx'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import type { Metadata } from 'next'
import Link from 'next/link'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(post => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-gray-600">
          <time>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
          <span>•</span>
          <span>{post.readingTime}</span>
          <span>•</span>
          <Link href={`/blog/category/${post.category.toLowerCase()}/`} className="text-accent hover:text-accent-hover">
            {post.category}
          </Link>
        </div>
      </header>

      <div className="prose prose-lg max-w-none">
        {await renderMDX(post.content)}
      </div>

      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <Link
              key={tag}
              href={`/blog/tag/${tag.toLowerCase()}/`}
              className="px-3 py-1 bg-gray-100 hover:bg-accent hover:text-white rounded-full text-sm transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </footer>
    </article>
  )
}
