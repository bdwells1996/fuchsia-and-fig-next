import type { CSSProperties } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'

interface ButtonConfig {
  label: string
  url: string
  variant: ButtonVariant
  openInNewTab?: boolean
}

export interface CtaBannerProps {
  title: string
  description?: string
  theme?: string
  primaryButton?: ButtonConfig
  secondaryButton?: ButtonConfig
}

type ThemeConfig = {
  className?: string
  style?: CSSProperties
  isDark: boolean
}

const themes: Record<string, ThemeConfig> = {
  'surface':          { style: { background: 'var(--surface)' }, isDark: false },
  'surface-sunken':   { style: { background: 'var(--surface-sunken)' }, isDark: false },
  'gradient-bloom':   { className: 'gradient-bloom', isDark: false },
  'gradient-sage':    { className: 'gradient-sage', isDark: false },
  'gradient-fig':     { className: 'gradient-fig', isDark: false },
  'gradient-violet':  { className: 'gradient-violet', isDark: false },
  'sage-50':          { style: { background: 'var(--color-sage-50)' }, isDark: false },
  'sage-500':         { style: { background: 'var(--color-sage-500)' }, isDark: false },
  'fig-500':          { style: { background: 'var(--color-fig-500)' }, isDark: true },
  'violet-50':        { style: { background: 'var(--color-violet-50)' }, isDark: false },
  'violet-500':       { style: { background: 'var(--color-violet-500)' }, isDark: true },
  'bloom-50':         { style: { background: 'var(--color-bloom-50)' }, isDark: false },
  'bloom-500':        { style: { background: 'var(--color-bloom-500)' }, isDark: true },
}

function CtaButton({ config, isDark }: { config: ButtonConfig; isDark: boolean }) {
  const target = config.openInNewTab ? '_blank' : undefined
  const rel = config.openInNewTab ? 'noopener noreferrer' : undefined

  // On dark backgrounds, outline/ghost buttons need a white border/text treatment
  const variantClass =
    isDark && config.variant === 'outline'
      ? 'btn btn-md btn-outline'
      : `btn btn-md btn-${config.variant}`

  const darkOutlineStyle: CSSProperties =
    isDark && config.variant === 'outline'
      ? { borderColor: 'rgba(255,255,255,0.6)', color: 'inherit' }
      : {}

  return (
    <a
      href={config.url}
      target={target}
      rel={rel}
      className={variantClass}
      style={darkOutlineStyle}
    >
      {config.label}
    </a>
  )
}

export function CtaBanner({
  title,
  description,
  theme = 'surface',
  primaryButton,
  secondaryButton,
}: CtaBannerProps) {
  const config = themes[theme] ?? themes['surface']
  const { className, style, isDark } = config

  const textColor: CSSProperties = isDark ? { color: '#ffffff' } : {}

  return (
    <section
      className={`w-full py-20 px-4${className ? ` ${className}` : ''}`}
      style={{ ...style, ...textColor }}
    >
      <div className="container-narrow mx-auto text-center">
        <h2
          className="font-display text-4xl lg:text-5xl mb-4"
          style={isDark ? { color: '#ffffff' } : { color: 'var(--color-fig-500)' }}
        >
          {title}
        </h2>
        {description && (
          <p
            className="body-lg mb-8 max-w-prose mx-auto"
            style={isDark ? { color: 'rgba(255,255,255,0.85)' } : { color: 'var(--text-secondary)' }}
          >
            {description}
          </p>
        )}
        {(primaryButton || secondaryButton) && (
          <div className="flex flex-wrap justify-center gap-3">
            {primaryButton && <CtaButton config={primaryButton} isDark={isDark} />}
            {secondaryButton && <CtaButton config={secondaryButton} isDark={isDark} />}
          </div>
        )}
      </div>
    </section>
  )
}
