import { defineField, defineType } from 'sanity'

export const animationConfigType = defineType({
  name: 'animationConfig',
  title: 'Animation',
  type: 'object',
  fields: [
    defineField({
      name: 'preset',
      title: 'Animation Preset',
      type: 'string',
      options: {
        list: [
          { title: 'Fade In', value: 'fade-in' },
          { title: 'Fade Up', value: 'fade-up' },
          { title: 'Fade Down', value: 'fade-down' },
          { title: 'Fade Left', value: 'fade-left' },
          { title: 'Fade Right', value: 'fade-right' },
          { title: 'Scale In', value: 'scale-in' },
          { title: 'Slide Up', value: 'slide-up' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'duration',
      title: 'Duration (ms)',
      type: 'number',
      initialValue: 400,
      description: 'How long the animation takes in milliseconds.',
    }),
    defineField({
      name: 'delay',
      title: 'Delay (ms)',
      type: 'number',
      initialValue: 0,
      description: 'Static delay before the animation starts.',
    }),
    defineField({
      name: 'easing',
      title: 'Easing',
      type: 'string',
      initialValue: 'ease-out',
      options: {
        list: [
          { title: 'Ease Out (default)', value: 'ease-out' },
          { title: 'Ease In', value: 'ease-in' },
          { title: 'Ease In/Out', value: 'ease-in-out' },
          { title: 'Spring', value: 'spring' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'threshold',
      title: 'Viewport Threshold',
      type: 'number',
      initialValue: 0.15,
      description: 'How much of the element must be visible (0–1) before the animation fires.',
      validation: (rule) => rule.min(0).max(1),
    }),
    defineField({
      name: 'stagger',
      title: 'Stagger Children',
      type: 'boolean',
      initialValue: false,
      description: 'When enabled, child items animate in one after another.',
    }),
    defineField({
      name: 'staggerDelay',
      title: 'Stagger Delay (ms)',
      type: 'number',
      initialValue: 100,
      description: 'Delay between each child animation.',
      hidden: ({ parent }) => !parent?.stagger,
    }),
  ],
})
