import Image from 'next/image'

export interface BentoItem {
  key: string
  image: { url: string }
  alt: string
  colSpan: 1 | 2 | 3
}

const colSpanClass: Record<1 | 2 | 3, string> = {
  1: 'lg:col-span-1',
  2: 'lg:col-span-2',
  3: 'lg:col-span-3',
}

// Padding-bottom spacer percentages define each item's natural aspect ratio.
// Using a spacer (not aspect-ratio on the grid item itself) means CSS Grid can
// still stretch the item to match a taller neighbour in the same row, while
// solo items remain at their natural proportions.
// Portrait 3:4 → 133.33%   Landscape 3:2 → 66.67%
const spacerPadding: Record<1 | 2 | 3, string> = {
  1: '133.33%',
  2: '66.67%',
  3: '66.67%',
}

const imageSizes: Record<1 | 2 | 3, string> = {
  1: '(max-width: 450px) 100vw, (max-width: 1024px) 50vw, 33vw',
  2: '(max-width: 450px) 100vw, (max-width: 1024px) 50vw, 66vw',
  3: '100vw',
}

interface BentoGridProps {
  items: BentoItem[]
}

export function BentoGrid({ items }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 min-[450px]:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
      {items.map((item) => (
        <div
          key={item.key}
          className={`relative overflow-hidden col-span-1 ${colSpanClass[item.colSpan]}`}
          style={{ borderRadius: 'var(--radius-card)' }}
        >
          <div style={{ paddingBottom: spacerPadding[item.colSpan] }} />
          <Image
            src={item.image.url}
            alt={item.alt}
            fill
            className="object-cover"
            sizes={imageSizes[item.colSpan]}
          />
        </div>
      ))}
    </div>
  )
}
