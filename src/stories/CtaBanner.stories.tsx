import type { Meta, StoryObj } from '@storybook/react'
import { CtaBanner, type CtaBannerProps } from '@/components/blocks/CtaBanner'

const meta: Meta<typeof CtaBanner> = {
  title: 'Blocks/CtaBanner',
  component: CtaBanner,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof CtaBanner>

const baseArgs: CtaBannerProps = {
  title: 'Ready to start something beautiful?',
  description: 'Work with Fuchsia & Fig to create art that tells your story.',
  primaryButton: { label: 'Get in touch', url: '#', variant: 'primary' },
  secondaryButton: { label: 'View our work', url: '#', variant: 'outline' },
}

export const White: Story = {
  args: { ...baseArgs, theme: 'surface' },
}

export const LightGray: Story = {
  args: { ...baseArgs, theme: 'surface-sunken' },
}

export const BloomPinkGradient: Story = {
  args: { ...baseArgs, theme: 'gradient-bloom' },
}

export const SageGreenGradient: Story = {
  args: { ...baseArgs, theme: 'gradient-sage' },
}

export const FigGreenGradient: Story = {
  args: { ...baseArgs, theme: 'gradient-fig' },
}

export const VioletPurpleGradient: Story = {
  args: { ...baseArgs, theme: 'gradient-violet' },
}

export const SageLight: Story = {
  args: { ...baseArgs, theme: 'sage-50' },
}

export const SageMid: Story = {
  args: { ...baseArgs, theme: 'sage-500' },
}

export const FigDark: Story = {
  args: {
    ...baseArgs,
    theme: 'fig-500',
    primaryButton: { label: 'Get in touch', url: '#', variant: 'secondary' },
    secondaryButton: { label: 'View our work', url: '#', variant: 'outline' },
  },
}

export const VioletLight: Story = {
  args: { ...baseArgs, theme: 'violet-50' },
}

export const VioletMid: Story = {
  args: {
    ...baseArgs,
    theme: 'violet-500',
    primaryButton: { label: 'Get in touch', url: '#', variant: 'secondary' },
    secondaryButton: { label: 'View our work', url: '#', variant: 'outline' },
  },
}

export const BloomLight: Story = {
  args: { ...baseArgs, theme: 'bloom-50' },
}

export const BloomVivid: Story = {
  args: {
    ...baseArgs,
    theme: 'bloom-500',
    primaryButton: { label: 'Get in touch', url: '#', variant: 'primary' },
    secondaryButton: { label: 'View our work', url: '#', variant: 'outline' },
  },
}

export const TitleOnly: Story = {
  args: {
    title: 'Join our mailing list',
    theme: 'gradient-bloom',
    primaryButton: { label: 'Subscribe', url: '#', variant: 'primary' },
  },
}

export const SingleButton: Story = {
  args: {
    title: 'Explore the collection',
    description: 'Browse our latest works available for purchase.',
    theme: 'gradient-sage',
    primaryButton: { label: 'Shop now', url: '#', variant: 'primary' },
  },
}

export const NewTabLinks: Story = {
  args: {
    ...baseArgs,
    theme: 'surface-sunken',
    primaryButton: {
      label: 'Open Instagram',
      url: 'https://instagram.com',
      variant: 'primary',
      openInNewTab: true,
    },
    secondaryButton: {
      label: 'Open Pinterest',
      url: 'https://pinterest.com',
      variant: 'outline',
      openInNewTab: true,
    },
  },
}
