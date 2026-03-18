import { CtaBanner, type CtaBannerProps } from './CtaBanner'
import { HeroSection, type HeroSectionProps } from '@/components/home/HeroSection'

interface Block {
  _type: string
  _key: string
  [key: string]: unknown
}

export function BlockRenderer({ block }: { block: Block }) {
  switch (block._type) {
    case 'heroSection':
      return <HeroSection {...(block as unknown as HeroSectionProps)} />
    case 'ctaBanner':
      return <CtaBanner {...(block as unknown as CtaBannerProps)} />
    default:
      return null
  }
}
