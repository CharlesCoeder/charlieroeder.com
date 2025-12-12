import type { Block } from 'payload'

export const RecentContentGrid: Block = {
  slug: 'recentContentGrid',
  interfaceName: 'RecentContentGridBlock',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'postsTitle',
          type: 'text',
          label: 'Posts Section Title',
          defaultValue: 'Posts',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'streamsTitle',
          type: 'text',
          label: 'Streams Section Title',
          defaultValue: 'Streams',
          required: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'postsLimit',
          type: 'number',
          label: 'Number of Posts',
          defaultValue: 5,
          min: 1,
          max: 10,
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'streamsLimit',
          type: 'number',
          label: 'Number of Streams',
          defaultValue: 5,
          min: 1,
          max: 20,
          required: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
  ],
  labels: {
    singular: 'Recent Content Grid',
    plural: 'Recent Content Grids',
  },
}
