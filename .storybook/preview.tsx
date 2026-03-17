import type { Preview, Decorator } from '@storybook/react'
import '../src/app/globals.css'

const withFonts: Decorator = (Story) => (
  <div
    className="antialiased"
    style={{
      '--font-quicksand': '"Quicksand"',
      '--font-geist-mono': '"Geist Mono"',
      '--font-abril': '"Abril Fatface"',
    } as React.CSSProperties}
  >
    <Story />
  </div>
)

const preview: Preview = {
  decorators: [withFonts],
  parameters: {
    backgrounds: { disable: true },
  },
}

export default preview
