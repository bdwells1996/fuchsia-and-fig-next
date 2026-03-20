export interface AnimationConfig {
  preset?: 'fade-in' | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale-in' | 'slide-up'
  duration?: number
  delay?: number
  easing?: 'ease-out' | 'ease-in' | 'ease-in-out' | 'spring'
  threshold?: number
  stagger?: boolean
  staggerDelay?: number
}
