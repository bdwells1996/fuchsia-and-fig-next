import type { SchemaTypeDefinition } from 'sanity'
import { collectionType } from './collectionType'
import { ctaBannerType } from './ctaBannerType'
import { heroSectionType } from './heroSectionType'
import { pageType } from './pageType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pageType, collectionType, heroSectionType, ctaBannerType],
}
