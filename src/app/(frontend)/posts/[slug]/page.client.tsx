'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

interface PageClientProps {
  useDarkHeader?: boolean
}

const PageClient: React.FC<PageClientProps> = ({ useDarkHeader = false }) => {
  /* Force the header to be dark mode while we have an image behind it */
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    if (useDarkHeader) {
      setHeaderTheme('dark')
    }
  }, [setHeaderTheme, useDarkHeader])
  return <React.Fragment />
}

export default PageClient
