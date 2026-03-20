'use client'

import type { CSSProperties } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { buildVariants } from '@/lib/animations/variants'
import type { AnimationConfig } from '@/lib/animations/types'

type MotionTag = 'div' | 'section' | 'article' | 'header' | 'footer' | 'main' | 'aside'

interface Props {
  animation?: AnimationConfig
  children: React.ReactNode
  className?: string
  style?: CSSProperties
  as?: MotionTag
}

export function AnimatedBlock({ animation, children, className, style, as = 'div' }: Props) {
  const shouldReduceMotion = useReducedMotion()

  if (!animation?.preset && !animation?.stagger) {
    const Tag = as
    return <Tag className={className} style={style}>{children}</Tag>
  }

  if (shouldReduceMotion) {
    const Tag = as
    return <Tag className={className} style={style}>{children}</Tag>
  }

  const MotionTag = motion[as]
  const variants = buildVariants(animation)
  const threshold = animation.threshold ?? 0.15

  return (
    <MotionTag
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
    >
      {children}
    </MotionTag>
  )
}
