import { ImagesIcon } from '@sanity/icons'
import type { StructureResolver } from 'sanity/structure'

// Singleton document types — excluded from generic list to avoid duplicates.
// Add singleton type names here as new page sections are created.
const SINGLETONS: string[] = []

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Collections (galleries, carousels)
      S.listItem()
        .title('Collections')
        .icon(ImagesIcon)
        .child(S.documentTypeList('collection').title('Collections')),

      S.divider(),

      // Page sections will appear here as the site is built out.
      // Example pattern for a singleton:
      //
      // S.listItem()
      //   .title('Home Page')
      //   .icon(HomeIcon)
      //   .child(S.document().schemaType('homePage').documentId('homePage')),

      // All remaining non-singleton types
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETONS.includes(item.getId() as string) && item.getId() !== 'collection',
      ),
    ])
