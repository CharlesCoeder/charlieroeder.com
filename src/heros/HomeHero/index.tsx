import React from 'react'
import type { Page } from '@/payload-types'

export const HomeHero: React.FC<Page['hero']> = ({
  greetingText,
  currentProjectLabel,
  projectName,
  bioParagraph1,
  bioParagraph2,
  bioParagraph3,
}) => {
  return (
    <div className="relative">
      {/* Decorative leaves illustration */}
      <div className="hidden sm:flex absolute left-[-4vw] top-[-12vw] w-[35vw] max-w-[650px] min-w-[220px] h-auto items-center justify-center opacity-80 pointer-events-none max-[800px]:top-[calc(-204px+13.5vw)] max-[800px]:left-[calc(-68px+4.5vw)]">
        <div className="flex-none rotate-[4.511deg] w-full">
          <div className="relative w-full aspect-[300/330]">
            <img
              src="/leaves.svg"
              alt=""
              className="w-full h-full object-cover object-center svg-foreground-mask"
            />
          </div>
        </div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-8 sm:pt-16">
        {/* Hero section */}
        <div className="text-center mb-8">
          <h1 className="font-lora text-[28px] text-foreground mb-6">
            {greetingText || "hello! I'm Charlie, welcome to my website!"}
          </h1>

          {/* Current project callout */}
          {(currentProjectLabel || projectName) && (
            <div className="inline-block">
              <div className="relative px-4 py-2 border-2 border-foreground/80 bg-background/50">
                <p className="font-lora text-[20px] text-foreground">
                  {currentProjectLabel || "right now, I'm working on"}{' '}
                  <span className="font-bold">{projectName || 'River Journal'}</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bio paragraphs */}
        <div className="max-w-[856px] mx-auto text-center mb-32">
          {bioParagraph1 && (
            <p className="font-lora text-[20px] text-foreground mb-4">{bioParagraph1}</p>
          )}
          {bioParagraph2 && (
            <p className="font-lora text-[20px] text-foreground mb-4">{bioParagraph2}</p>
          )}
          {bioParagraph3 && (
            <p className="font-lora text-[20px] text-foreground mt-8">{bioParagraph3}</p>
          )}
        </div>
      </div>
    </div>
  )
}
