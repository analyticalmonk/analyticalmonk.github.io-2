export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  category: string
  tags: string[]
  content: string
  readingTime: string
  published?: boolean
}

export interface BlogPostMetadata {
  title: string
  date: string
  excerpt: string
  category: string
  tags: string[]
  published?: boolean
}
