import type { Variants, Transition } from 'motion/react'
import type { AnimationConfig } from './types'

const easingMap: Record<string, Transition['ease'] | undefined> = {
  'ease-out': [0, 0, 0.2, 1],
  'ease-in': [0.4, 0, 1, 1],
  'ease-in-out': [0.4, 0, 0.2, 1],
}

type VariantValues = {
  hidden: Record<string, number>
  visible: Record<string, number>
}

const presetVariants: Record<string, VariantValues> = {
  'fade-in': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  'fade-up': {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-down': {
    hidden: { opacity: 0, y: -24 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-left': {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0 },
  },
  'fade-right': {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0 },
  },
  'scale-in': {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  'slide-up': {
    hidden: { y: 48 },
    visible: { y: 0 },
  },
}

export function buildVariants(config: AnimationConfig): Variants {
  const preset = config.preset ?? 'fade-in'
  const base = presetVariants[preset] ?? presetVariants['fade-in']
  const duration = (config.duration ?? 400) / 1000
  const delay = (config.delay ?? 0) / 1000

  const isSpring = config.easing === 'spring'
  const transition: Transition = isSpring
    ? { type: 'spring', stiffness: 300, damping: 30, delay }
    : { duration, ease: easingMap[config.easing ?? 'ease-out'], delay }

  if (config.stagger) {
    const staggerDelay = (config.staggerDelay ?? 100) / 1000
    return {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: staggerDelay },
      },
    }
  }

  return {
    hidden: base.hidden,
    visible: {
      ...base.visible,
      transition,
    },
  }
}

export function buildItemVariants(config: AnimationConfig): Variants {
  const preset = config.preset ?? 'fade-in'
  const base = presetVariants[preset] ?? presetVariants['fade-in']
  const duration = (config.duration ?? 400) / 1000
  const isSpring = config.easing === 'spring'
  const transition: Transition = isSpring
    ? { type: 'spring', stiffness: 300, damping: 30 }
    : { duration, ease: easingMap[config.easing ?? 'ease-out'] }

  return {
    hidden: base.hidden,
    visible: { ...base.visible, transition },
  }
}
