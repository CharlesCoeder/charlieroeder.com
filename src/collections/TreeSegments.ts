import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'

export const TreeSegments: CollectionConfig = {
  slug: 'tree-segments',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Segment Title',
    },
    slugField({
      position: undefined,
    }),
    {
      name: 'tree',
      type: 'relationship',
      relationTo: 'trees',
      required: true,
      label: 'Parent Tree',
      admin: {
        description: 'Which growth tree this segment belongs to',
      },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'tree-segments',
      required: false,
      label: 'Parent Segment',
      admin: {
        description: 'Parent segment within the same tree. Leave empty for root-level segments.',
      },
      filterOptions: ({ data }) => {
        // Only show segments from the same tree as potential parents
        if (data?.tree) {
          return {
            tree: {
              equals: data.tree,
            },
          }
        }
        // Return false to show no options when tree is not selected
        return false
      },
    },
    {
      name: 'order',
      type: 'number',
      required: false,
      defaultValue: 0,
      label: 'Display Order',
      admin: {
        description: 'Sort order among siblings (lower numbers first)',
      },
    },
    {
      name: 'description',
      type: 'text',
      required: false,
      label: 'Segment Description',
      admin: {
        description: 'Brief description displayed in the tree visualization',
      },
    },
    {
      name: 'details',
      type: 'richText',
      label: 'Detailed Content',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      required: false,
      admin: {
        description: 'Full rich text content for this segment',
      },
    },
  ],
}
