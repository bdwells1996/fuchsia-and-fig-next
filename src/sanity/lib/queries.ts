const animationFields = `
  preset,
  duration,
  delay,
  easing,
  threshold,
  stagger,
  staggerDelay
`

export const PAGE_BY_SLUG_QUERY = `*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  sections[]{
    _type,
    _key,
    // ctaBanner fields
    title,
    description,
    theme,
    primaryButton,
    secondaryButton,
    animation{ ${animationFields} },
    // heroSection fields
    tagline,
    accentWord,
    titleAnimation{ ${animationFields} },
    gridAnimation{ ${animationFields} },
    gridItems[]{
      _key,
      image,
      alt,
      colSpan
    },
    // featuredItems fields
    itemAnimation{ ${animationFields} },
    items[]{
      _key,
      image,
      alt,
      title,
      body,
      button,
      alignment
    },
    // artistBioSpotlight fields
    image,
    excerpt,
    ctaButton,
    imagePosition,
    alignment,
    imageAnimation{ ${animationFields} },
    textAnimation{ ${animationFields} }
  }
}`
