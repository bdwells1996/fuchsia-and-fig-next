import { HomeIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const heroSectionType = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'accentWord',
      title: 'Accent Word',
      description: 'One word from the tagline to highlight in bloom pink. Must match exactly.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gridItems',
      title: 'Grid Items',
      type: 'array',
      description: 'Up to 9 images for the bento grid. Use column span to create feature slots.',
      validation: (rule) => rule.max(9),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (rule) =>
                rule.required().warning('Alt text is important for accessibility'),
            }),
            defineField({
              name: 'colSpan',
              title: 'Column Span',
              description: 'How many columns this item spans at desktop (3-column) size',
              type: 'number',
              options: {
                list: [
                  { title: 'Standard (1 column)', value: 1 },
                  { title: 'Wide (2 columns)', value: 2 },
                  { title: 'Full width (3 columns)', value: 3 },
                ],
                layout: 'radio',
              },
              initialValue: 1,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'alt',
              media: 'image',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'tagline',
    },
  },
})
