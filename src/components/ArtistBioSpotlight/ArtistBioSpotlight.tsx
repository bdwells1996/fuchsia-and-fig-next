import type { CSSProperties } from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import Button, { type ButtonVariant } from "@/components/Button";
import { AnimatedBlock } from "@/components/motion/AnimatedBlock";
import type { AnimationConfig } from "@/lib/animations/types";
import { urlFor } from "@/sanity/lib/image";

// ─── Theme system ─────────────────────────────────────────────────────────────

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

// ─── Types ────────────────────────────────────────────────────────────────────

interface CtaButton {
	label: string;
	url: string;
	variant: ButtonVariant;
	openInNewTab?: boolean;
}

export interface ArtistBioSpotlightProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	image?: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	excerpt?: any[];
	ctaButton?: CtaButton;
	theme?: string;
	imagePosition?: "left" | "right";
	alignment?: "start" | "center" | "end";
	imageAnimation?: AnimationConfig;
	textAnimation?: AnimationConfig;
	animation?: AnimationConfig;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ArtistBioSpotlight({
	image,
	excerpt,
	ctaButton,
	theme = "surface",
	imagePosition = "left",
	alignment = "center",
	imageAnimation,
	textAnimation,
	animation,
}: ArtistBioSpotlightProps) {
	const config = themes[theme] ?? themes["surface"];
	const { className, style, isDark, outlineVariant } = config;

	const imageUrl = image
		? urlFor(image).width(900).height(1100).fit("crop").url()
		: null;

	const isImageRight = imagePosition === "right";

	const resolvedVariant =
		ctaButton?.variant === "outline" ? outlineVariant : ctaButton?.variant;

	return (
		<section
			className={`w-full  container-site py-16 lg:py-20${className ? ` ${className}` : ""}`}
			style={style}
		>
			<div
				className={` mx-auto flex flex-col md:flex-row gap-10 lg:gap-16 items-${alignment}`}
			>
				{/* Portrait image */}
				{imageUrl && (
					<AnimatedBlock
						animation={imageAnimation}
						className={`w-full md:w-[42%] shrink-0${isImageRight ? " md:order-2" : ""}`}
					>
						<div
							className="relative w-full overflow-hidden rounded-2xl"
							style={{ aspectRatio: "3/4" }}
						>
							<Image
								src={imageUrl}
								alt="Artist portrait"
								fill
								className="object-cover"
								sizes="(max-width: 768px) 100vw, 42vw"
							/>
						</div>
					</AnimatedBlock>
				)}

				{/* Text column */}
				<div
					className={`flex flex-col justify-${alignment}${isImageRight ? " md:order-1" : ""}`}
				>
					<AnimatedBlock animation={textAnimation} className="mb-6">
						<h2
							className={`font-display text-4xl lg:text-5xl leading-tight${isDark ? " text-white" : ""}`}
						>
							Sasha Reid
						</h2>
						<p
							className={`mt-1 text-base font-medium tracking-wide ${isDark ? " text-white/70" : " text-text-muted"}`}
						>
							Pattern designer and illustrator
						</p>
					</AnimatedBlock>

					{excerpt && excerpt.length > 0 && (
						<AnimatedBlock animation={textAnimation}>
							<div className="prose-brand mb-8">
								<PortableText value={excerpt} />
							</div>
						</AnimatedBlock>
					)}

					{ctaButton && (
						<AnimatedBlock animation={animation}>
							<Button
								href={ctaButton.url}
								variant={resolvedVariant ?? "primary"}
								size="md"
								target={ctaButton.openInNewTab ? "_blank" : undefined}
								rel={ctaButton.openInNewTab ? "noopener noreferrer" : undefined}
								className="w-full md:w-auto"
							>
								{ctaButton.label}
							</Button>
						</AnimatedBlock>
					)}
				</div>
			</div>
		</section>
	);
}
