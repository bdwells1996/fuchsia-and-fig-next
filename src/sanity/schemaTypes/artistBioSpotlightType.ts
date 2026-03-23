import { UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

const buttonVariants = [
  { title: 'Primary', value: 'primary' },
  { title: 'Secondary', value: 'secondary' },
  { title: 'Outline', value: 'outline' },
  { title: 'Ghost', value: 'ghost' },
  { title: 'Link', value: 'link' },
]

export const artistBioSpotlightType = defineType({
  name: 'artistBioSpotlight',
  title: 'Artist Bio Spotlight',
  type: 'object',
  icon: UserIcon,
  fields: [
    // --- Content ---
    defineField({
      name: 'image',
      title: 'Portrait Image',
      type: 'image',
      description: 'A portrait of the artist. Hotspot and crop are supported.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'excerpt',
      title: 'Bio Excerpt',
      type: 'array',
      description: 'A short introduction to the artist. Keep it to 2–4 sentences.',
      of: [{ type: 'block', styles: [{ title: 'Normal', value: 'normal' }], lists: [] }],
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'object',
      description: 'A button linking visitors to the full About page or another destination.',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
          initialValue: 'Learn More',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'string',
          description:
            'Use a relative path for internal links (e.g. /about) or a full URL for external links.',
          initialValue: '/about',
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
      ],
    }),

    // --- Appearance ---
    defineField({
      name: 'theme',
      title: 'Colour Theme',
      type: 'string',
      description: 'Background colour for the section.',
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
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      description:
        'Which side the portrait sits on at desktop width. On mobile the image is always stacked above the text.',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'alignment',
      title: 'Vertical Alignment',
      type: 'string',
      description:
        'How the image and text columns line up vertically when they sit side by side at desktop width.',
      options: {
        list: [
          { title: 'Top', value: 'start' },
          { title: 'Centre', value: 'center' },
          { title: 'Bottom', value: 'end' },
        ],
        layout: 'radio',
      },
      initialValue: 'center',
    }),

    // --- Animation ---
    defineField({
      name: 'imageAnimation',
      title: 'Image Animation',
      type: 'animationConfig',
      description:
        'Optional entrance animation for the portrait image. Leave unset for no animation.',
    }),
    defineField({
      name: 'textAnimation',
      title: 'Text Animation',
      type: 'animationConfig',
      description:
        'Optional entrance animation for the bio excerpt text block. Leave unset for no animation.',
    }),
    defineField({
      name: 'animation',
      title: 'CTA Animation',
      type: 'animationConfig',
      description:
        'Optional entrance animation for the CTA button. Leave unset for no animation.',
    }),
  ],
  preview: {
    select: {
      theme: 'theme',
      imagePosition: 'imagePosition',
      media: 'image',
    },
    prepare({ theme, imagePosition, media }) {
      return {
        title: 'Artist Bio Spotlight',
        subtitle: [imagePosition, theme].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
