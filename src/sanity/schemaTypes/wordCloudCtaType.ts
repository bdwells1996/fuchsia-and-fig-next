import { SparklesIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

const themeOptions = [
  { title: 'White', value: 'surface' },
  { title: 'Light Gray', value: 'surface-sunken' },
  { title: 'Bloom Pink Gradient', value: 'gradient-bloom' },
  { title: 'Sage Green Gradient', value: 'gradient-sage' },
  { title: 'Fig Green Gradient', value: 'gradient-fig' },
  { title: 'Violet Purple Gradient', value: 'gradient-violet' },
]

export const wordCloudCtaType = defineType({
  name: 'wordCloudCta',
  title: 'Word Cloud CTA',
  type: 'object',
  icon: SparklesIcon,
  fields: [
    // --- Content ---
    defineField({
      name: 'words',
      title: 'Words',
      type: 'array',
      description: 'The words that scroll across the section. Add as many as you like — more words create a richer cloud.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'word',
              title: 'Word',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'word' },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'title',
      title: 'Heading',
      type: 'string',
      description: 'The fixed heading shown beneath the scrolling words.',
      initialValue: 'Ready to work with me?',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Button Label',
      type: 'string',
      description: 'Text shown on the call-to-action button.',
      initialValue: 'Get in touch',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaHref',
      title: 'Button URL',
      type: 'string',
      description: 'Use a relative path for internal links (e.g. /contact) or a full URL for external links.',
      initialValue: '/contact',
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value) return 'URL is required'
          const isRelative = value.startsWith('/')
          const isAbsolute = /^(https?|mailto|tel):/.test(value)
          if (!isRelative && !isAbsolute) {
            return 'Must be a relative path (e.g. /contact) or a full URL (e.g. https://example.com)'
          }
          return true
        }),
    }),

    // --- Appearance ---
    defineField({
      name: 'theme',
      title: 'Colour Theme',
      type: 'string',
      description: 'Background colour applied to the entire section.',
      options: { list: themeOptions },
      initialValue: 'surface',
    }),
    defineField({
      name: 'speed',
      title: 'Scroll Speed',
      type: 'string',
      description: 'How fast the words scroll. Medium is a good default. Fine to leave as default if unsure.',
      options: {
        list: [
          { title: 'Slow', value: 'slow' },
          { title: 'Medium', value: 'medium' },
          { title: 'Fast', value: 'fast' },
        ],
        layout: 'radio',
      },
      initialValue: 'slow',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      theme: 'theme',
    },
    prepare({ title, theme }) {
      return {
        title: title ?? 'Word Cloud CTA',
        subtitle: theme ?? '',
      }
    },
  },
})
