import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type { RecentPostsBlock as RecentPostsBlockType } from '@/payload-types'

export const RecentPostsBlock: React.FC<RecentPostsBlockType> = async ({ title, limit }) => {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    limit: limit || 3,
    sort: '-publishedAt',
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  return (
    //
    <div className="max-w-[853px] mx-auto mb-24 px-8">
      <div className="border border-black/28 rounded-[48px] p-12 bg-white/30 min-h-[449px]">
        <div className="mb-6">
          <h2 className="font-lora text-[32px] text-[#424242] inline-block">{title || 'Posts'}</h2>
          <div className="h-[2px] w-[77px] bg-black/80 mt-2" />
        </div>

        {/* Posts list */}
        {posts.docs && posts.docs.length > 0 ? (
          <div className="space-y-6">
            {posts.docs.map((post) => (
              <div key={post.id} className="border-b border-black/10 pb-4 last:border-b-0">
                <Link
                  href={`/posts/${post.slug}`}
                  className="font-lora text-[20px] text-foreground hover:text-foreground/70 transition-colors"
                >
                  {post.title}
                </Link>
                {post.meta?.description && (
                  <p className="font-lora text-[16px] text-foreground/60 mt-2">
                    {post.meta.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="font-lora text-[18px] text-foreground/60">No posts yet. Check back soon!</p>
        )}
      </div>
    </div>
  )
}
