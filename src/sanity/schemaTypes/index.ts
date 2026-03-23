import type { SchemaTypeDefinition } from 'sanity'
import { animationConfigType } from './animationConfigType'
import { artistBioSpotlightType } from './artistBioSpotlightType'
import { collectionType } from './collectionType'
import { ctaBannerType } from './ctaBannerType'
import { featuredItemsType } from './featuredItemsType'
import { heroSectionType } from './heroSectionType'
import { pageType } from './pageType'
import { wordCloudCtaType } from './wordCloudCtaType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pageType, collectionType, heroSectionType, ctaBannerType, featuredItemsType, artistBioSpotlightType, animationConfigType, wordCloudCtaType],
}
