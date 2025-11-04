import React from 'react'
import type { Tree, TreeSegment } from '@/payload-types'

type TreeWithSegments = Tree & {
  segments: TreeSegment[]
}

type SegmentNode = TreeSegment & {
  children: SegmentNode[]
}

export const GrowthTreesDebug: React.FC<{
  trees: TreeWithSegments[]
}> = ({ trees }) => {
  // Build hierarchical structure for each tree
  const buildHierarchy = (segments: TreeSegment[]): SegmentNode[] => {
    const segmentMap = new Map<number, SegmentNode>()
    const rootSegments: SegmentNode[] = []

    // Create nodes with children arrays
    segments.forEach((segment) => {
      segmentMap.set(segment.id, { ...segment, children: [] })
    })

    // Build parent-child relationships
    segments.forEach((segment) => {
      const node = segmentMap.get(segment.id)!
      if (segment.parent && typeof segment.parent === 'object') {
        const parentNode = segmentMap.get(segment.parent.id)
        if (parentNode) {
          parentNode.children.push(node)
        }
      } else if (!segment.parent) {
        rootSegments.push(node)
      }
    })

    // Sort siblings by order
    const sortByOrder = (nodes: SegmentNode[]) => {
      nodes.sort((a, b) => (a.order || 0) - (b.order || 0))
      nodes.forEach((node) => sortByOrder(node.children))
    }
    sortByOrder(rootSegments)

    return rootSegments
  }

  const renderSegment = (segment: SegmentNode, depth: number = 0): React.ReactNode => {
    const indent = depth * 24 // pixels

    return (
      <div key={segment.id} style={{ marginLeft: `${indent}px` }}>
        <div className="py-2 border-l-2 border-border pl-4 mb-1">
          <div className="font-medium text-lg">{segment.title}</div>
          <div className="text-sm text-muted-foreground">
            Slug: <code className="bg-muted px-1 rounded">{segment.slug}</code> | Order:{' '}
            {segment.order || 0}
          </div>
          {segment.description && (
            <div className="text-sm text-muted-foreground mt-1">{segment.description}</div>
          )}
        </div>
        {segment.children.length > 0 && (
          <div className="ml-4">
            {segment.children.map((child) => renderSegment(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  // Sort trees by order
  const sortedTrees = [...trees].sort((a, b) => (a.order || 0) - (b.order || 0))

  return (
    <div className="space-y-8">
      <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>Note:</strong> Simple visualization for data validation
        </p>
      </div>

      {sortedTrees.map((tree) => {
        const hierarchy = buildHierarchy(tree.segments)

        return (
          <div key={tree.id} className="border border-border rounded-lg p-6 bg-card shadow-sm">
            <div className="mb-4 pb-4 border-b border-border">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                {tree.icon && <span className="text-3xl">{tree.icon}</span>}
                {tree.name}
              </h2>
              <div className="text-sm text-muted-foreground mt-1">
                Slug: <code className="bg-muted px-1 rounded">{tree.slug}</code> | Display Order:{' '}
                {tree.order || 0}
              </div>
              {tree.description && (
                <p className="mt-2 italic text-muted-foreground">{tree.description}</p>
              )}
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-3">Segments:</h3>
              {hierarchy.length === 0 ? (
                <p className="text-muted-foreground italic">No segments in this tree yet</p>
              ) : (
                <div className="space-y-1">
                  {hierarchy.map((segment) => renderSegment(segment))}
                </div>
              )}
            </div>
          </div>
        )
      })}

      {sortedTrees.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-xl">No trees found</p>
          <p className="text-sm mt-2">Create trees and segments in the admin panel</p>
        </div>
      )}
    </div>
  )
}
