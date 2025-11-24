import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { RenderHero } from '@/heros/RenderHero'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import { draftMode } from 'next/headers'
import { cache } from 'react'
import PageClient from './[slug]/page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode()
  const page = await queryPageBySlug({ slug: 'home' })

  if (!page) {
    return <PayloadRedirects url="/" />
  }

  const { hero, layout } = page

  return (
    <main className="min-h-screen bg-background">
      <PageClient />
      <PayloadRedirects disableNotFound url="/" />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />

      <RenderBlocks blocks={layout} />
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await queryPageBySlug({ slug: 'home' })
  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
