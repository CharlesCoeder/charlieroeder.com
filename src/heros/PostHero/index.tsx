import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, heroStyle, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  const hasHeroImage = heroImage && typeof heroImage !== 'string'

  const isFeaturedStyle = heroStyle === 'featured' || (heroStyle !== 'minimal' && hasHeroImage)

  // Minimal hero style - simple inline header
  if (!isFeaturedStyle) {
    return (
      <div className="container pt-8 pb-6">
        <div className="lg:grid lg:grid-cols-[1fr_40rem_1fr]">
          <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
            <h1 className="mb-3 text-3xl md:text-4xl font-normal">{title}</h1>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-muted-foreground">
              {publishedAt && <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>}
              {hasAuthors && (
                <div className="flex items-center gap-1.5">
                  <span>by</span>
                  <span>{formatAuthors(populatedAuthors)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Featured hero style - full-bleed image with overlay
  return (
    <div className="relative -mt-[10.4rem] flex items-end">
      <div
        className={`container z-10 relative lg:grid lg:grid-cols-[1fr_40rem_1fr] ${hasHeroImage ? 'text-white' : 'text-foreground'} pb-8`}
      >
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          <div className="uppercase text-sm mb-6">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <React.Fragment key={index}>
                    {titleToUse}
                    {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                  </React.Fragment>
                )
              }
              return null
            })}
          </div>

          <div className="">
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{title}</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-16">
            {hasAuthors && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sm">Author</p>

                  <p>{formatAuthors(populatedAuthors)}</p>
                </div>
              </div>
            )}
            {publishedAt && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">Date Published</p>

                <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
              </div>
            )}
          </div>
        </div>
      </div>
      {hasHeroImage && (
        <div className="min-h-[80vh] select-none">
          <Media fill priority imgClassName="-z-10 object-cover" resource={heroImage} />
          <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
        </div>
      )}
    </div>
  )
}
