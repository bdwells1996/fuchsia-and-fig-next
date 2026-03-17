import { sanityFetch } from '@/sanity/lib/live'
import { urlFor } from '@/sanity/lib/image'
import { BentoGrid, type BentoItem } from '@/components/ui/BentoGrid'

const HERO_QUERY = `*[_type == "heroSection"][0]{
  tagline,
  accentWord,
  gridItems[]{
    _key,
    image,
    alt,
    colSpan
  }
}`

function Tagline({ tagline, accentWord }: { tagline: string; accentWord: string }) {
  const idx = tagline.indexOf(accentWord)
  if (idx === -1) return <>{tagline}</>
  return (
    <>
      {tagline.slice(0, idx)}
      <span className="relative inline-block" style={{ color: 'var(--color-bloom-500)' }}>
        {accentWord}
        <svg
          aria-hidden="true"
          className="absolute left-0 w-full overflow-visible pointer-events-none"
          style={{ bottom: '-0.2em', height: '0.35em' }}
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
        >
          <path
            d="M 2,5 C 18,2 36,1 54,3 C 72,5 86,6 98,4 C 90,8 74,9 54,7 C 34,5 16,6 2,7 Z"
            fill="currentColor"
            opacity="0.85"
          />
        </svg>
      </span>
      {tagline.slice(idx + accentWord.length)}
    </>
  )
}

export async function HeroSection() {
  const { data } = await sanityFetch({ query: HERO_QUERY })
  if (!data) return null

  const items: BentoItem[] = (data.gridItems ?? []).map(
    (item: { _key: string; image: object; alt: string; colSpan: 1 | 2 | 3 }) => ({
      key: item._key,
      image: { url: urlFor(item.image).url() },
      alt: item.alt ?? '',
      colSpan: item.colSpan ?? 1,
    })
  )

  return (
    <section
      className="w-full px-4 py-16 lg:px-8"
      style={{
        background:
          'linear-gradient(to bottom, var(--color-sage-50), var(--color-sage-200))',
      }}
    >
      <div className="container-site mx-auto">
        <h1
          className="font-display text-4xl lg:text-6xl text-center mb-12"
          style={{ color: 'var(--color-fig-500)' }}
        >
          <Tagline tagline={data.tagline} accentWord={data.accentWord} />
        </h1>
        <BentoGrid items={items} />
      </div>
    </section>
  )
}
