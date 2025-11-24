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
      <div className="absolute left-[-94px] top-[-250px] w-[655px] h-[717px] flex items-center justify-center opacity-80 pointer-events-none">
        <div className="flex-none rotate-[4.511deg]">
          <div className="relative w-[604px] h-[672px]">
            <img src="/leaves.svg" alt="" className="w-full h-full object-cover object-center" />
          </div>
        </div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-8 pt-16">
        {/* Hero section */}
        <div className="text-center mb-8">
          <h1 className="font-lora text-[28px] text-foreground mb-6">
            {greetingText || "hello! I'm Charlie, welcome to my website!"}
          </h1>

          {/* Current project callout */}
          {(currentProjectLabel || projectName) && (
            <div className="inline-block">
              <div className="relative px-4 py-2 border-2 border-black/80 bg-white/50">
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
