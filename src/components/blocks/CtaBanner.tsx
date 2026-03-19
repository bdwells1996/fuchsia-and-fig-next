import type { CSSProperties } from "react";
import Button, { type ButtonVariant } from "@/components/Button";
import { AnimatedBlock } from "@/components/motion/AnimatedBlock";
import { AnimatedItem } from "@/components/motion/AnimatedItem";
import type { AnimationConfig } from "@/lib/animations/types";

interface ButtonConfig {
	label: string;
	url: string;
	variant: ButtonVariant;
	openInNewTab?: boolean;
}

export interface CtaBannerProps {
	title: string;
	description?: string;
	theme?: string;
	primaryButton?: ButtonConfig;
	secondaryButton?: ButtonConfig;
	animation?: AnimationConfig;
}

type ThemeConfig = {
	className?: string;
	style?: CSSProperties;
	isDark: boolean;
	outlineVariant: "outline-dark" | "outline-white" | "outline-sage";
};

const themes: Record<string, ThemeConfig> = {
	surface: {
		style: { background: "var(--surface)" },
		isDark: false,
		outlineVariant: "outline-dark",
	},
	"surface-sunken": {
		style: { background: "var(--surface-sunken)" },
		isDark: false,
		outlineVariant: "outline-dark",
	},
	"gradient-bloom": {
		className: "gradient-bloom",
		isDark: false,
		outlineVariant: "outline-dark",
	},
	"gradient-sage": {
		className: "gradient-sage",
		isDark: false,
		outlineVariant: "outline-dark",
	},
	"gradient-fig": {
		className: "gradient-fig",
		isDark: false,
		outlineVariant: "outline-dark",
	},
	"gradient-violet": {
		className: "gradient-violet",
		isDark: false,
		outlineVariant: "outline-dark",
	},
	"sage-50": {
		style: { background: "var(--color-sage-50)" },
		isDark: false,
		outlineVariant: "outline-dark",
	},
	"sage-500": {
		style: { background: "var(--color-sage-500)" },
		isDark: false,
		outlineVariant: "outline-sage",
	},
	"fig-500": {
		style: { background: "var(--color-fig-500)" },
		isDark: true,
		outlineVariant: "outline-white",
	},
	"violet-50": {
		style: { background: "var(--color-violet-50)" },
		isDark: false,
		outlineVariant: "outline-dark",
	},
	"violet-500": {
		style: { background: "var(--color-violet-500)" },
		isDark: true,
		outlineVariant: "outline-white",
	},
	"bloom-50": {
		style: { background: "var(--color-bloom-50)" },
		isDark: false,
		outlineVariant: "outline-dark",
	},
	"bloom-500": {
		style: { background: "var(--color-bloom-500)" },
		isDark: true,
		outlineVariant: "outline-white",
	},
};

function CtaButton({
	config,
	outlineVariant,
}: {
	config: ButtonConfig;
	outlineVariant: ThemeConfig["outlineVariant"];
}) {
	const resolvedVariant =
		config.variant === "outline" ? outlineVariant : config.variant;

	return (
		<Button
			href={config.url}
			variant={resolvedVariant}
			size="md"
			target={config.openInNewTab ? "_blank" : undefined}
			rel={config.openInNewTab ? "noopener noreferrer" : undefined}
		>
			{config.label}
		</Button>
	);
}

export function CtaBanner({
	title,
	description,
	theme = "surface",
	primaryButton,
	secondaryButton,
	animation,
}: CtaBannerProps) {
	const config = themes[theme] ?? themes["surface"];
	const { className, style, isDark, outlineVariant } = config;

	const textColor: CSSProperties = isDark ? { color: "#ffffff" } : {};

	const isStagger = animation?.stagger

	return (
		<section
			className={`w-full py-14 px-4 lg:py-20${className ? ` ${className}` : ""}`}
			style={{ ...style, ...textColor }}
		>
		<AnimatedBlock animation={animation} as="div">
			<div className="container-narrow mx-auto text-center">
				<AnimatedItem animation={animation} enabled={isStagger}>
					<h2
						className="font-display text-5xl mb-4"
						style={
							isDark ? { color: "#ffffff" } : { color: "var(--color-fig-500)" }
						}
					>
						{title}
					</h2>
				</AnimatedItem>
				{description && (
					<AnimatedItem animation={animation} enabled={isStagger}>
						<p
							className="body-lg mb-6 max-w-prose mx-auto lg:mb-8"
							style={
								isDark
									? { color: "rgba(255,255,255,0.85)" }
									: { color: "var(--text-secondary)" }
							}
						>
							{description}
						</p>
					</AnimatedItem>
				)}
				{(primaryButton || secondaryButton) && (
					<AnimatedItem animation={animation} enabled={isStagger}>
						<div className="flex flex-wrap justify-center gap-3">
							{primaryButton && (
								<CtaButton
									config={primaryButton}
									outlineVariant={outlineVariant}
								/>
							)}
							{secondaryButton && (
								<CtaButton
									config={secondaryButton}
									outlineVariant={outlineVariant}
								/>
							)}
						</div>
					</AnimatedItem>
				)}
			</div>
		</AnimatedBlock>
		</section>
	);
}
