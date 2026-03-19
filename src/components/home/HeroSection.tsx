import { BentoGrid, type BentoItem } from "@/components/ui/BentoGrid";
import { AnimatedBlock } from "@/components/motion/AnimatedBlock";
import { urlFor } from "@/sanity/lib/image";
import type { AnimationConfig } from "@/lib/animations/types";

interface GridItem {
	_key: string;
	image: object;
	alt: string;
	colSpan: 1 | 2 | 3;
}

export interface HeroSectionProps {
	tagline: string;
	accentWord: string;
	gridItems?: GridItem[];
	titleAnimation?: AnimationConfig;
	gridAnimation?: AnimationConfig;
}

function Tagline({
	tagline,
	accentWord,
}: {
	tagline: string;
	accentWord: string;
}) {
	const idx = tagline.indexOf(accentWord);
	if (idx === -1) return <>{tagline}</>;
	return (
		<>
			{tagline.slice(0, idx)}
			<span
				className="relative inline-block"
				style={{ color: "var(--color-bloom-500)" }}
			>
				{accentWord}
				<svg
					aria-hidden="true"
					className="absolute left-0 w-full overflow-visible pointer-events-none"
					style={{ bottom: "-0.2em", height: "0.35em" }}
					viewBox="0 0 100 10"
					preserveAspectRatio="none"
				></svg>
			</span>
			{tagline.slice(idx + accentWord.length)}
		</>
	);
}

export function HeroSection({
	tagline,
	accentWord,
	gridItems = [],
	titleAnimation,
	gridAnimation,
}: HeroSectionProps) {
	const items: BentoItem[] =
		gridItems?.map((item) => ({
			key: item._key,
			image: { url: urlFor(item.image)?.url() || "" },
			alt: item.alt ?? "",
			colSpan: item.colSpan ?? 1,
		})) || [];

	return (
		<section
			className="w-full px-4 py-16 lg:px-8"
			style={{
				background:
					"linear-gradient(to bottom, var(--color-sage-50), var(--color-sage-200))",
			}}
		>
			<div className="container-site mx-auto">
				<AnimatedBlock animation={titleAnimation}>
					<h1
						className="font-display text-4xl lg:text-6xl text-center mb-12"
						style={{ color: "var(--color-fig-500)" }}
					>
						<Tagline tagline={tagline} accentWord={accentWord} />
					</h1>
				</AnimatedBlock>
				{items.length > 0 && <BentoGrid items={items} animation={gridAnimation} />}
			</div>
		</section>
	);
}
