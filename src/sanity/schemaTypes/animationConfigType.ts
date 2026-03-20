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
      description:
        'Choose how this element enters the page. Leave unset to skip animation entirely.',
      options: {
        list: [
          { title: 'Fade In — element fades in from transparent', value: 'fade-in' },
          { title: 'Fade Up — rises up while fading in (recommended for text)', value: 'fade-up' },
          { title: 'Fade Down — drops down while fading in', value: 'fade-down' },
          { title: 'Fade Left — slides in from the right', value: 'fade-left' },
          { title: 'Fade Right — slides in from the left', value: 'fade-right' },
          { title: 'Scale In — grows from a smaller size while fading in', value: 'scale-in' },
          { title: 'Slide Up — slides up from below with no fade', value: 'slide-up' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'duration',
      title: 'Duration (ms)',
      type: 'number',
      initialValue: 400,
      description:
        'How long the animation takes to complete, in milliseconds. 400ms is a good default — lower values feel snappier, higher values feel more dramatic. Fine to leave as default if unsure.',
    }),
    defineField({
      name: 'delay',
      title: 'Delay (ms)',
      type: 'number',
      initialValue: 0,
      description:
        'How long to wait before the animation starts, in milliseconds. Useful for sequencing elements that appear together. Leave at 0 if unsure.',
    }),
    defineField({
      name: 'easing',
      title: 'Easing',
      type: 'string',
      initialValue: 'ease-out',
      description:
        'Controls the acceleration curve of the animation. Ease Out is the most natural-feeling default and works well in most cases — fine to leave as default if unsure.',
      options: {
        list: [
          { title: 'Ease Out — starts fast, decelerates (default, recommended)', value: 'ease-out' },
          { title: 'Ease In — starts slow, accelerates (good for exits)', value: 'ease-in' },
          { title: 'Ease In/Out — slow start and end, fast middle', value: 'ease-in-out' },
          { title: 'Spring — bouncy, physical feel', value: 'spring' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'threshold',
      title: 'Viewport Threshold',
      type: 'number',
      initialValue: 0.15,
      description:
        'How much of the element must be visible in the viewport before the animation triggers — expressed as a value between 0 and 1 (e.g. 0.15 = 15% visible). The default of 0.15 works well in most cases. Fine to leave as default if unsure.',
      validation: (rule) => rule.min(0).max(1),
    }),
    defineField({
      name: 'stagger',
      title: 'Stagger Children',
      type: 'boolean',
      initialValue: false,
      description:
        'When enabled, child elements (e.g. grid items or list cards) animate in one after another rather than all at once. Creates a cascading effect. Leave off if unsure.',
    }),
    defineField({
      name: 'staggerDelay',
      title: 'Stagger Delay (ms)',
      type: 'number',
      initialValue: 100,
      description:
        'The gap between each child element\'s animation when stagger is on, in milliseconds. 100ms gives a subtle cascade — increase for a more pronounced effect.',
      hidden: ({ parent }) => !parent?.stagger,
    }),
  ],
})
