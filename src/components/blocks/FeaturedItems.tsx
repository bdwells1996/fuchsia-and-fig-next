import type { CSSProperties } from "react";
import Image from "next/image";
import Button, { type ButtonVariant } from "@/components/Button";
import { AnimatedBlock } from "@/components/motion/AnimatedBlock";
import { AnimatedItem } from "@/components/motion/AnimatedItem";
import type { AnimationConfig } from "@/lib/animations/types";
import { urlFor } from "@/sanity/lib/image";

// ─── Theme system (mirrors CtaBanner) ────────────────────────────────────────

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

interface ButtonConfig {
	label: string;
	url: string;
	variant: ButtonVariant;
	openInNewTab?: boolean;
}

export interface FeaturedItemData {
	_key: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	image: any;
	alt?: string;
	title: string;
	body?: string;
	button?: ButtonConfig[];
	alignment?: "left" | "right";
}

export interface FeaturedItemsProps {
	title?: string;
	accentWord?: string;
	theme?: string;
	items?: FeaturedItemData[];
	titleAnimation?: AnimationConfig;
	itemAnimation?: AnimationConfig;
}

// ─── Title ────────────────────────────────────────────────────────────────────

function SectionTitle({
	title,
	accentWord,
	isDark,
}: {
	title: string;
	accentWord?: string;
	isDark: boolean;
}) {
	const titleColor = isDark ? "#ffffff" : "var(--color-fig-500)";

	if (!accentWord) {
		return <span style={{ color: titleColor }}>{title}</span>;
	}

	const idx = title.indexOf(accentWord);
	if (idx === -1) {
		return <span style={{ color: titleColor }}>{title}</span>;
	}

	return (
		<span style={{ color: titleColor }}>
			{title.slice(0, idx)}
			<span style={{ color: "var(--color-bloom-500)" }}>{accentWord}</span>
			{title.slice(idx + accentWord.length)}
		</span>
	);
}

// ─── Item ─────────────────────────────────────────────────────────────────────

function FeaturedItem({
	item,
	isDark,
	outlineVariant,
}: {
	item: FeaturedItemData;
	isDark: boolean;
	outlineVariant: ThemeConfig["outlineVariant"];
}) {
	const isRight = item.alignment === "right";
	const btn = item.button?.[0];
	const resolvedVariant =
		btn?.variant === "outline" ? outlineVariant : btn?.variant;
	const imageUrl = item.image
		? urlFor(item.image).width(1200).height(900).fit("crop").url()
		: null;

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center lg:gap-16">
			{/* Image */}
			{imageUrl && (
				<div className={isRight ? "md:order-2" : ""}>
					<div
						className="relative w-full overflow-hidden rounded-2xl"
						style={{ aspectRatio: "4/3" }}
					>
						<Image
							src={imageUrl}
							alt={item.alt ?? item.title}
							fill
							className="object-cover"
							sizes="(max-width: 768px) 100vw, 50vw"
						/>
					</div>
				</div>
			)}

			{/* Content */}
			<div className={isRight ? "md:order-1" : ""}>
				<h3
					className="font-display text-4xl lg:text-5xl mb-4 leading-tight"
					style={
						isDark ? { color: "#ffffff" } : { color: "var(--color-fig-500)" }
					}
				>
					{item.title}
				</h3>
				{item.body && (
					<p
						className="body-lg mb-8"
						style={
							isDark
								? { color: "rgba(255,255,255,0.8)" }
								: { color: "var(--text-secondary)" }
						}
					>
						{item.body}
					</p>
				)}
				{btn && (
					<Button
						href={btn.url}
						variant={resolvedVariant ?? "primary"}
						size="md"
						target={btn.openInNewTab ? "_blank" : undefined}
						rel={btn.openInNewTab ? "noopener noreferrer" : undefined}
					>
						{btn.label}
					</Button>
				)}
			</div>
		</div>
	);
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function FeaturedItems({
	title,
	accentWord,
	theme = "surface",
	items = [],
	titleAnimation,
	itemAnimation,
}: FeaturedItemsProps) {
	if (items.length === 0) return null;

	const config = themes[theme] ?? themes["surface"];
	const { className, style, isDark, outlineVariant } = config;

	return (
		<section
			className={`w-full py-16 lg:py-20 ${className ? ` ${className}` : ""}`}
			style={style}
		>
			<div className="container-site mx-auto space-y-16 lg:space-y-18">
				{title && (
					<AnimatedBlock animation={titleAnimation}>
						<h2 className="font-display text-5xl text-center mb-12 lg:mb-16">
							<SectionTitle title={title} accentWord={accentWord} isDark={isDark} />
						</h2>
					</AnimatedBlock>
				)}
				<AnimatedBlock animation={itemAnimation}>
					{items.map((item) => {
						if (itemAnimation?.stagger) {
							return (
								<AnimatedItem key={item._key} animation={itemAnimation}>
									<FeaturedItem
										item={item}
										isDark={isDark}
										outlineVariant={outlineVariant}
									/>
								</AnimatedItem>
							)
						}
						return (
							<FeaturedItem
								key={item._key}
								item={item}
								isDark={isDark}
								outlineVariant={outlineVariant}
							/>
						)
					})}
				</AnimatedBlock>
			</div>
		</section>
	);
}
