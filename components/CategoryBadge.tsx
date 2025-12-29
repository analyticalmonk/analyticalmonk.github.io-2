import Link from 'next/link'

export default function CategoryBadge({ category }: { category: string }) {
  return (
    <Link
      href={`/blog/category/${category.toLowerCase()}/`}
      className="px-3 py-1 bg-gray-100 hover:bg-accent hover:text-white rounded-full text-sm transition-colors"
    >
      {category}
    </Link>
  )
}
