import { getAllPosts } from '@/lib/blog'
import HomeClient from '@/components/HomeClient'

export default async function Home() {
  const posts = await getAllPosts()
  const recentPosts = posts.slice(0, 5)

  return <HomeClient posts={recentPosts} />
}
