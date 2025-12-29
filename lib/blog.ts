import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { BlogPost, BlogPostMetadata } from '@/types/blog'

const POSTS_DIRECTORY = path.join(process.cwd(), 'content/blog')

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    return []
  }

  const files = fs.readdirSync(POSTS_DIRECTORY)

  const posts = files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const slug = file.replace(/\.mdx$/, '')
      const fullPath = path.join(POSTS_DIRECTORY, file)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const metadata = data as BlogPostMetadata

      return {
        slug,
        title: metadata.title,
        date: metadata.date,
        excerpt: metadata.excerpt,
        category: metadata.category,
        tags: metadata.tags || [],
        content,
        readingTime: readingTime(content).text,
        published: metadata.published !== false,
      }
    })
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts()
  return posts.find(post => post.slug === slug) || null
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  return posts.filter(post => post.category.toLowerCase() === category.toLowerCase())
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  return posts.filter(post =>
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts()
  const categories = [...new Set(posts.map(post => post.category))]
  return categories.sort()
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts()
  const tags = [...new Set(posts.flatMap(post => post.tags))]
  return tags.sort()
}
