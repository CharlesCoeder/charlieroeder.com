import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Metadata } from 'next'
import { GrowthTreesDebug } from '@/components/GrowthTreesDebug'

export const revalidate = 0 // Don't cache this debug page

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  // Fetch all trees sorted by order
  const treesResult = await payload.find({
    collection: 'trees',
    depth: 0,
    limit: 100,
    sort: 'order',
  })

  // Fetch all tree segments with tree relationship populated
  const segmentsResult = await payload.find({
    collection: 'tree-segments',
    depth: 1, // Populate tree and parent relationships
    limit: 1000,
    sort: 'order',
  })

  // Group segments by tree
  const treesWithSegments = treesResult.docs.map((tree) => ({
    ...tree,
    segments: segmentsResult.docs.filter((segment) => {
      const segmentTree = segment.tree
      return typeof segmentTree === 'object' ? segmentTree.id === tree.id : segmentTree === tree.id
    }),
  }))

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-8">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Growth Trees Debug Visualization</h1>
          <p className="text-gray-600">
            Multi-tree structure validation page showing all trees with their hierarchical segments.
          </p>
        </div>
      </div>

      <div className="container">
        <GrowthTreesDebug trees={treesWithSegments} />
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Growth Trees Debug | Payload CMS',
    description: 'Debug visualization for growth trees and segments',
  }
}
