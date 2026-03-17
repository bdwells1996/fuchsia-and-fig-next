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
    // heroSection fields
    tagline,
    accentWord,
    gridItems[]{
      _key,
      image,
      alt,
      colSpan
    }
  }
}`
