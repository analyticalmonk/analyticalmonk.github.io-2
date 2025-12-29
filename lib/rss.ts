import { Feed } from 'feed'
import { getAllPosts } from './blog'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from './constants'

export async function generateRSSFeed() {
  const posts = await getAllPosts()

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

  return feed.rss2()
}
