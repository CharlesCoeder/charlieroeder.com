import type { RequiredDataFromCollectionSlug } from 'payload'

// Used for pre-seeded content so that the homepage is not empty
export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',
  hero: {
    type: 'homeHero',
    greetingText: "hello! I'm Charlie, welcome to my website!",
    currentProjectLabel: "right now, I'm working on",
    projectName: 'River Journal',
    bioParagraph1:
      "on the day to day, I'm assistant general manager at a large-scale NYC housing property.",
    bioParagraph2:
      "under the hood, I'm a mega nerd who loves coding and creating cool things using technology.",
    bioParagraph3:
      'this website is a collection of my thoughts and growth, please flow around and enjoy!',
  },
  meta: {
    description: 'Welcome to my website! A collection of my thoughts and growth.',
    title: 'Charlie Roeder - Welcome',
  },
  title: 'Home',
  layout: [
    {
      blockType: 'recentPosts',
      title: 'Posts',
      limit: 3,
    },
  ],
}
