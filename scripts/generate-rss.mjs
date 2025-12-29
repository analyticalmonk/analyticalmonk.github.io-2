import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { Feed } from 'feed'
import matter from 'gray-matter'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SITE_NAME = "Akash Tandon"
const SITE_URL = "https://akashtandon.in"
const SITE_DESCRIPTION = "Founder, builder, and writer. I write about startups, AI, and technology."

async function generate() {
  try {
    const contentDir = path.join(__dirname, '..', 'content', 'blog')
    const publicDir = path.join(__dirname, '..', 'public')

    // Check if content directory exists
    if (!fs.existsSync(contentDir)) {
      console.log('⚠ No content directory found, skipping RSS generation')
      return
    }

    const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx'))

    if (files.length === 0) {
      console.log('⚠ No blog posts found, skipping RSS generation')
      return
    }

    const posts = files.map(file => {
      const slug = file.replace(/\.mdx$/, '')
      const fullPath = path.join(contentDir, file)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        category: data.category,
        published: data.published !== false,
      }
    })
      .filter(post => post.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    const feed = new Feed({
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      id: SITE_URL,
      link: SITE_URL,
      language: 'en',
      favicon: `${SITE_URL}/favicon.ico`,
      copyright: `All rights reserved ${new Date().getFullYear()}, ${SITE_NAME}`,
      author: {
        name: SITE_NAME,
        link: SITE_URL,
      },
    })

    posts.forEach(post => {
      feed.addItem({
        title: post.title,
        id: `${SITE_URL}/blog/${post.slug}`,
        link: `${SITE_URL}/blog/${post.slug}/`,
        description: post.excerpt,
        content: post.excerpt,
        date: new Date(post.date),
        category: [{ name: post.category }],
      })
    })

    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true })
    }

    fs.writeFileSync(path.join(publicDir, 'rss.xml'), feed.rss2())
    console.log('✓ RSS feed generated successfully')
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    // Don't fail the build if there are no posts yet
    if (error.code !== 'ENOENT') {
      console.log('⚠ RSS generation failed, continuing with build...')
    }
  }
}

generate()
