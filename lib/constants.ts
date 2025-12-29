export const SITE_NAME = "Akash Tandon"
export const SITE_URL = process.env.NODE_ENV === 'production'
  ? "https://akashtandon.in"
  : "http://localhost:3000"
export const SITE_DESCRIPTION = "Founder, builder, and writer. I write about startups, AI, and technology."

export const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    url: 'https://github.com/analyticalmonk',
    icon: 'github'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/analyticalmonk',
    icon: 'twitter'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/akashtandon',
    icon: 'linkedin'
  },
  {
    name: 'Hacker News',
    url: 'https://news.ycombinator.com/user?id=analyticalmonk',
    icon: 'hackernews'
  },
  {
    name: 'Stack Overflow',
    url: 'https://stackoverflow.com/users/analyticalmonk',
    icon: 'stackoverflow'
  },
]
