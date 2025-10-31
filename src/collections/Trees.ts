import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'

export const Trees: CollectionConfig = {
  slug: 'trees',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Tree Name',
      admin: {
        description: 'Display name for the tree (e.g., "Coding", "Meditation")',
      },
    },
    slugField({
      position: undefined,
    }),
    {
      name: 'description',
      type: 'textarea',
      required: false,
      label: 'Tree Description',
      admin: {
        description: 'Brief description of this growth area',
      },
    },
    {
      name: 'icon',
      type: 'text',
      required: false,
      label: 'Icon',
      admin: {
        description: 'Icon identifier (emoji like 💻 or icon name)',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: false,
      defaultValue: 0,
      label: 'Display Order',
      admin: {
        description: 'Display order on growth page (lower numbers first)',
      },
    },
  ],
}
