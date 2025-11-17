import type { Block } from 'payload'

export const RecentPosts: Block = {
  slug: 'recentPosts',
  interfaceName: 'RecentPostsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'Posts',
      required: true,
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Number of Posts to Display',
      defaultValue: 5,
      min: 1,
      max: 15,
      required: true,
    },
  ],
  labels: {
    singular: 'Recent Posts Block',
    plural: 'Recent Posts Blocks',
  },
}
