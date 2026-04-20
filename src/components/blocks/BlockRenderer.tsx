import { ArtistBioSpotlight, type ArtistBioSpotlightProps } from '@/components/ArtistBioSpotlight/ArtistBioSpotlight'
import { WordCloudCta, type WordCloudCtaProps } from '@/components/InfiniteScrollWordCloud/WordCloudCta'
import { CtaBanner, type CtaBannerProps } from './CtaBanner'
import { FeaturedItems, type FeaturedItemsProps } from './FeaturedItems'
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
    case 'featuredItems':
      return <FeaturedItems {...(block as unknown as FeaturedItemsProps)} />
    case 'artistBioSpotlight':
      return <ArtistBioSpotlight {...(block as unknown as ArtistBioSpotlightProps)} />
    case 'wordCloudCta':
      return <WordCloudCta {...(block as unknown as WordCloudCtaProps)} />
    default:
      return null
  }
}
