import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'Home Hero',
          value: 'homeHero',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
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
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
    // Home Hero specific fields
    {
      name: 'greetingText',
      type: 'text',
      label: 'Greeting Text',
      admin: {
        condition: (_, { type } = {}) => type === 'homeHero',
        description: 'Main greeting ("hello! I\'m Charlie, welcome to my website!")',
      },
    },
    {
      name: 'currentProjectLabel',
      type: 'text',
      label: 'Current Project Label',
      admin: {
        condition: (_, { type } = {}) => type === 'homeHero',
        description: 'preceding text ("right now, I\'m working on")',
      },
    },
    {
      name: 'projectName',
      type: 'text',
      label: 'Project Name',
      admin: {
        condition: (_, { type } = {}) => type === 'homeHero',
        description: 'what you are currently working on!',
      },
    },
    {
      name: 'bioParagraph1',
      type: 'textarea',
      label: 'Bio Paragraph 1',
      admin: {
        condition: (_, { type } = {}) => type === 'homeHero',
      },
    },
    {
      name: 'bioParagraph2',
      type: 'textarea',
      label: 'Bio Paragraph 2',
      admin: {
        condition: (_, { type } = {}) => type === 'homeHero',
      },
    },
    {
      name: 'bioParagraph3',
      type: 'textarea',
      label: 'Bio Paragraph 3',
      admin: {
        condition: (_, { type } = {}) => type === 'homeHero',
      },
    },
  ],
  label: false,
}
