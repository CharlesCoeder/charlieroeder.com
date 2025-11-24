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
      {/* Decorative AI SLOP plant illustration - to remove very shortly :D */}
      <div className="absolute left-0 top-[-100px] w-[400px] h-[400px] opacity-80 pointer-events-none">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          {/* Stylized leaf branches - simplified botanical illustration */}
          <g stroke="currentColor" fill="none" strokeWidth="2" className="text-foreground/70">
            {/* Main stems */}
            <path d="M50,400 Q80,350 100,300 T120,200 T130,100 T135,50" strokeWidth="3" />
            <path d="M50,400 Q70,360 85,320 T95,240 T100,160" strokeWidth="2.5" />

            {/* Left branch leaves */}
            <ellipse cx="70" cy="100" rx="35" ry="15" transform="rotate(-45 70 100)" />
            <ellipse cx="55" cy="140" rx="30" ry="12" transform="rotate(-60 55 140)" />
            <ellipse cx="60" cy="180" rx="32" ry="14" transform="rotate(-50 60 180)" />
            <ellipse cx="50" cy="220" rx="28" ry="11" transform="rotate(-55 50 220)" />
            <ellipse cx="55" cy="260" rx="30" ry="13" transform="rotate(-45 55 260)" />

            {/* Right branch leaves */}
            <ellipse cx="150" cy="80" rx="35" ry="15" transform="rotate(45 150 80)" />
            <ellipse cx="145" cy="120" rx="32" ry="14" transform="rotate(40 145 120)" />
            <ellipse cx="140" cy="160" rx="30" ry="13" transform="rotate(50 140 160)" />
            <ellipse cx="130" cy="200" rx="28" ry="12" transform="rotate(45 130 200)" />
            <ellipse cx="120" cy="240" rx="30" ry="13" transform="rotate(40 120 240)" />

            {/* Additional detail leaves */}
            <ellipse cx="100" cy="140" rx="25" ry="10" transform="rotate(10 100 140)" />
            <ellipse cx="110" cy="180" rx="27" ry="11" transform="rotate(-10 110 180)" />
            <ellipse cx="95" cy="220" rx="26" ry="10" transform="rotate(15 95 220)" />
          </g>
        </svg>
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
