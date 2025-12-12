import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type { RecentContentGridBlock as RecentContentGridBlockType } from '@/payload-types'

export const RecentContentGridBlock: React.FC<RecentContentGridBlockType> = async ({
  postsTitle,
  streamsTitle,
  postsLimit,
  streamsLimit,
}) => {
  const payload = await getPayload({ config: configPromise })

  // Fetch posts
  const posts = await payload.find({
    collection: 'posts',
    limit: postsLimit || 3,
    sort: '-publishedAt',
    where: {
      _status: {
        equals: 'published',
      },
      postType: {
        equals: 'post',
      },
    },
  })

  // Fetch streams
  const streams = await payload.find({
    collection: 'posts',
    limit: streamsLimit || 8,
    sort: '-publishedAt',
    where: {
      _status: {
        equals: 'published',
      },
      postType: {
        equals: 'stream',
      },
    },
  })

  return (
    <div className="max-w-[1200px] mx-auto mb-24 px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Posts Box */}
        <div className="border border-foreground/28 rounded-[48px] p-12 bg-background/30 min-h-[300px]">
          <div className="mb-6">
            <div>
              <div className="inline-block">
                <h2 className="font-lora text-[32px] text-foreground">{postsTitle || 'Posts'}</h2>
                <div className="h-[2px] bg-foreground/80 mt-2" />
              </div>
              <span className="font-lora text-base text-foreground/40 ml-1">
                - the effortful ones...
              </span>
            </div>
          </div>

          {posts.docs && posts.docs.length > 0 ? (
            <div className="space-y-6">
              {posts.docs.map((post) => (
                <div key={post.id} className="border-b border-foreground/10 pb-4 last:border-b-0">
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
            <p className="font-lora text-[18px] text-foreground/60">
              No posts yet. Check back soon!
            </p>
          )}
        </div>

        {/* Streams Box */}
        <div className="border border-foreground/28 rounded-[48px] p-12 bg-background/30 min-h-[300px]">
          <div className="mb-6">
            <div>
              <div className="inline-block">
                <h2 className="font-lora text-[32px] text-foreground">
                  {streamsTitle || 'Streams'}
                </h2>
                <div className="h-[2px] bg-foreground/80 mt-2" />
              </div>
              <span className="font-lora text-base text-foreground/40 ml-1">- of thought!</span>
            </div>
          </div>

          {streams.docs && streams.docs.length > 0 ? (
            <div className="space-y-6">
              {streams.docs.map((stream) => (
                <div key={stream.id} className="border-b border-foreground/10 pb-4 last:border-b-0">
                  <Link
                    href={`/posts/${stream.slug}`}
                    className="font-lora text-[20px] text-foreground hover:text-foreground/70 transition-colors"
                  >
                    {stream.title}
                  </Link>
                  {stream.meta?.description && (
                    <p className="font-lora text-[16px] text-foreground/60 mt-2">
                      {stream.meta.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="font-lora text-[18px] text-foreground/60">
              No streams yet. Check back soon!
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
