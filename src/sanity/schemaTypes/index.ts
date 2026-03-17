import type { SchemaTypeDefinition } from 'sanity'
import { collectionType } from './collectionType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [collectionType],
}
