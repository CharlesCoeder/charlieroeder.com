import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Post } from '../../../payload-types'

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/posts/${doc.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)

      revalidatePath(path)
      revalidateTag('posts-sitemap')
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/posts/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('posts-sitemap')
    }

    // Revalidate pages that contain RecentPosts or RecentContentGrid blocks
    // These blocks dynamically fetch posts, so they need to be updated when posts change
    // Fire-and-forget: don't block the save operation, but handle errors in background
    revalidatePagesWithPostBlocks(payload).catch((error) => {
      payload.logger.error(`Background revalidation error: ${error}`)
    })

    // Also revalidate the /posts archive page
    payload.logger.info('Revalidating /posts archive page')
    revalidatePath('/posts')
  }
  return doc
}

async function revalidatePagesWithPostBlocks(payload: any) {
  try {
    // Find all published pages that contain RecentPosts, RecentContentGrid, or Archive blocks
    const pages = await payload.find({
      collection: 'pages',
      where: {
        _status: {
          equals: 'published',
        },
        or: [
          {
            'layout.blockType': {
              equals: 'recentPosts',
            },
          },
          {
            'layout.blockType': {
              equals: 'recentContentGrid',
            },
          },
          {
            'layout.blockType': {
              equals: 'archive',
            },
          },
        ],
      },
      limit: 1000, // Adjust if you have more pages
    })

    if (pages.docs && pages.docs.length > 0) {
      payload.logger.info(`Found ${pages.docs.length} page(s) with post blocks to revalidate`)

      for (const page of pages.docs) {
        const pagePath = page.slug === 'home' ? '/' : `/${page.slug}`
        payload.logger.info(`Revalidating page with post blocks: ${pagePath}`)
        revalidatePath(pagePath)
      }
    }
  } catch (error) {
    payload.logger.error(`Error revalidating pages with post blocks: ${error}`)
  }
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/posts/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('posts-sitemap')

    // Also revalidate pages with post blocks when a post is deleted
    // Fire-and-forget: don't block the delete operation
    revalidatePagesWithPostBlocks(payload).catch((error) => {
      payload.logger.error(`Background revalidation error: ${error}`)
    })

    // Revalidate the /posts archive page
    payload.logger.info('Revalidating /posts archive page')
    revalidatePath('/posts')
  }

  return doc
}
