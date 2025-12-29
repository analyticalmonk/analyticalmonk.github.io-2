import Link from 'next/link'
import { format } from 'date-fns'
import { BlogPost } from '@/types/blog'

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="border-b border-gray-200 pb-6 last:border-0">
      <Link href={`/blog/${post.slug}/`}>
        <h3 className="text-2xl font-bold mb-2 hover:text-accent transition-colors">
          {post.title}
        </h3>
      </Link>
      <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
        <time>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
        <span>•</span>
        <span>{post.readingTime}</span>
        <span>•</span>
        <Link href={`/blog/category/${post.category.toLowerCase()}/`} className="text-accent hover:text-accent-hover">
          {post.category}
        </Link>
      </div>
      <p className="text-gray-700 mb-3">{post.excerpt}</p>
      <Link href={`/blog/${post.slug}/`} className="text-accent hover:text-accent-hover font-medium">
        Read more →
      </Link>
    </article>
  )
}
