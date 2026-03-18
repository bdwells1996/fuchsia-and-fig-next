import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      resolve: {
        mainDocuments: [
          {
            route: '/',
            filter: `_type == "page" && slug.current == "home"`,
          },
          {
            route: '/:slug',
            filter: `_type == "page" && slug.current == $slug`,
          },
        ],
      },
      previewUrl: {
        origin: process.env.SANITY_STUDIO_PREVIEW_URL ?? 'http://localhost:3000',
        draftMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
