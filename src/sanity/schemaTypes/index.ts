import type { SchemaTypeDefinition } from 'sanity'
import { collectionType } from './collectionType'
import { heroSectionType } from './heroSectionType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [collectionType, heroSectionType],
}
