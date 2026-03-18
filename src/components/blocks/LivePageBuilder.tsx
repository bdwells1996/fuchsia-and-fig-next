'use client'

import { PAGE_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { createClient } from 'next-sanity'
import { useEffect, useState, useTransition } from 'react'
import { BlockRenderer } from './BlockRenderer'

interface Section {
  _type: string
  _key: string
  [key: string]: unknown
}

interface PageData {
  sections?: Section[]
}

interface Props {
  initialData: PageData | null
  slug: string
  projectId: string
  dataset: string
  apiVersion: string
  token: string
}

export function LivePageBuilder({
  initialData,
  slug,
  projectId,
  dataset,
  apiVersion,
  token,
}: Props) {
  const [data, setData] = useState(initialData)
  const [, startTransition] = useTransition()

  useEffect(() => {
    const previewClient = createClient({
      projectId,
      dataset,
      apiVersion,
      token,
      useCdn: false,
      perspective: 'previewDrafts',
    })

    const subscription = previewClient.live
      .events({ includeDrafts: true })
      .subscribe((event) => {
        if (event.type === 'message' || event.type === 'restart') {
          startTransition(async () => {
            const updated = await previewClient.fetch<PageData>(
              PAGE_BY_SLUG_QUERY,
              { slug },
            )
            setData(updated)
          })
        }
      })

    return () => subscription.unsubscribe()
  }, [slug, projectId, dataset, apiVersion, token])

  return (
    <>
      {data?.sections?.map((block) => (
        <BlockRenderer key={block._key} block={block} />
      ))}
    </>
  )
}
