import { BlockquoteIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

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

export const ctaBannerType = defineType({
  name: 'ctaBanner',
  title: 'CTA Banner',
  type: 'object',
  icon: BlockquoteIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'theme',
      title: 'Colour Theme',
      type: 'string',
      options: {
        list: [
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
        ],
      },
      initialValue: 'surface',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'primaryButton',
      title: 'Primary Button',
      type: 'object',
      fields: buttonFields,
    }),
    defineField({
      name: 'secondaryButton',
      title: 'Secondary Button',
      type: 'object',
      fields: buttonFields,
    }),
    defineField({
      name: 'animation',
      title: 'Animation',
      type: 'animationConfig',
      description: 'Optional animation for this banner.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      theme: 'theme',
    },
    prepare({ title, theme }) {
      return {
        title: title ?? 'CTA Banner',
        subtitle: theme ? `Theme: ${theme}` : 'CTA Banner',
      }
    },
  },
})
