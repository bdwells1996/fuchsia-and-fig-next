import type { Metadata, Viewport } from 'next'
import StudioLoader from './StudioLoader'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  robots: 'noindex',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function StudioPage() {
  return <StudioLoader />
}
