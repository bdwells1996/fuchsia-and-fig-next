import { DocumentIcon, ImagesIcon } from '@sanity/icons'
import type { StructureResolver } from 'sanity/structure'

// Singleton document types — excluded from generic list to avoid duplicates.
// Add singleton type names here as new page sections are created.
const SINGLETONS: string[] = []

const CUSTOM_LIST_ITEMS = ['page', 'collection']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Pages (page builder)
      S.listItem()
        .title('Pages')
        .icon(DocumentIcon)
        .child(S.documentTypeList('page').title('Pages')),

      S.divider(),

      // Collections (galleries, carousels)
      S.listItem()
        .title('Collections')
        .icon(ImagesIcon)
        .child(S.documentTypeList('collection').title('Collections')),

      S.divider(),

      // All remaining non-singleton types
      ...S.documentTypeListItems().filter(
        (item) =>
          !SINGLETONS.includes(item.getId() as string) &&
          !CUSTOM_LIST_ITEMS.includes(item.getId() as string),
      ),
    ])
