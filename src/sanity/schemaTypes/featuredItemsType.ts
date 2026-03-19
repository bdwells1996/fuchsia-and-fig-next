import { ImagesIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

const themeOptions = [
  { title: 'White', value: 'surface' },
  { title: 'Light Gray', value: 'surface-sunken' },
  { title: 'Bloom Pink Gradient', value: 'gradient-bloom' },
  { title: 'Sage Green Gradient', value: 'gradient-sage' },
  { title: 'Fig Green Gradient', value: 'gradient-fig' },
  { title: 'Violet Purple Gradient', value: 'gradient-violet' },
  { title: 'Sage (light)', value: 'sage-50' },
  { title: 'Sage (mid)', value: 'sage-500' },
  { title: 'Fig (dark forest green)', value: 'fig-500' },
  { title: 'Violet (light)', value: 'violet-50' },
  { title: 'Violet (mid)', value: 'violet-500' },
  { title: 'Bloom (light pink)', value: 'bloom-50' },
  { title: 'Bloom (vivid pink)', value: 'bloom-500' },
]

const buttonVariants = [
  { title: 'Primary', value: 'primary' },
  { title: 'Secondary', value: 'secondary' },
  { title: 'Outline', value: 'outline' },
  { title: 'Ghost', value: 'ghost' },
  { title: 'Link', value: 'link' },
]

const buttonFields = [
  defineField({
    name: 'label',
    title: 'Label',
    type: 'string',
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: 'url',
    title: 'URL',
    type: 'string',
    description: 'Use a relative path for internal links (e.g. /about) or a full URL for external links.',
    validation: (rule) =>
      rule.required().custom((value) => {
        if (!value) return 'URL is required'
        const isRelative = value.startsWith('/')
        const isAbsolute = /^(https?|mailto|tel):/.test(value)
        if (!isRelative && !isAbsolute) {
          return 'Must be a relative path (e.g. /about) or a full URL (e.g. https://example.com)'
        }
        return true
      }),
  }),
  defineField({
    name: 'variant',
    title: 'Button Style',
    type: 'string',
    options: { list: buttonVariants, layout: 'radio' },
    initialValue: 'primary',
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: 'openInNewTab',
    title: 'Open in new tab',
    type: 'boolean',
    initialValue: false,
  }),
]

export const featuredItemsType = defineType({
  name: 'featuredItems',
  title: 'Featured Items',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Optional heading displayed above all items to give the section context.',
    }),
    defineField({
      name: 'accentWord',
      title: 'Accent Word',
      type: 'string',
      description: 'A word from the title to highlight in bloom pink. Must match exactly.',
    }),
    defineField({
      name: 'theme',
      title: 'Colour Theme',
      type: 'string',
      options: { list: themeOptions },
      initialValue: 'surface',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
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
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'body',
              title: 'Body Text',
              type: 'text',
              rows: 4,
            }),
            defineField({
              name: 'button',
              title: 'CTA Button',
              type: 'array',
              description: 'Optional. Add a single button to this item.',
              validation: (rule) => rule.max(1),
              of: [defineArrayMember({ type: 'object', fields: buttonFields })],
            }),
            defineField({
              name: 'alignment',
              title: 'Alignment',
              type: 'string',
              description: 'Left: image on the left, text on the right. Right: text on the left, image on the right.',
              options: {
                list: [
                  { title: 'Left (image → text)', value: 'left' },
                  { title: 'Right (text → image)', value: 'right' },
                ],
                layout: 'radio',
              },
              initialValue: 'left',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
              alignment: 'alignment',
            },
            prepare({ title, media, alignment }) {
              return {
                title: title ?? 'Featured Item',
                subtitle: alignment === 'right' ? 'Right aligned' : 'Left aligned',
                media,
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      theme: 'theme',
      item0: 'items.0.title',
    },
    prepare({ title, theme, item0 }) {
      return {
        title: title ?? 'Featured Items',
        subtitle: item0 ? `First: "${item0}" · Theme: ${theme}` : `Theme: ${theme}`,
      }
    },
  },
})
