"use client";

import type { CSSProperties } from "react";
import Button from "@/components/Button";
import { AnimatedBlock } from "@/components/motion/AnimatedBlock";
import { AnimatedItem } from "@/components/motion/AnimatedItem";
import {
	InfiniteScrollWordCloud,
	type WordEntry,
	type InfiniteScrollWordCloudProps,
} from "./InfiniteScrollWordCloud";

export type WordCloudCtaProps = {
	words: WordEntry[];
	theme?: string;
	title?: string;
	ctaLabel?: string;
	ctaHref?: string;
	speed?: InfiniteScrollWordCloudProps["speed"];
};

const titleStyle: CSSProperties = {
	fontSize: "clamp(1.75rem, 4vw, 3rem)",
};

const cascadeAnimation = {
	preset: "fade-up" as const,
	stagger: true,
	staggerDelay: 200,
	duration: 600,
	threshold: 0.4,
};

export function WordCloudCta({
	words,
	theme,
	title = "Ready to work with me?",
	ctaLabel = "Get in touch",
	ctaHref = "/contact",
	speed = "slow",
}: WordCloudCtaProps) {
	return (
		<div className={theme}>
			<AnimatedBlock animation={cascadeAnimation}>
				<AnimatedItem animation={cascadeAnimation} className="pt-12">
					<InfiniteScrollWordCloud words={words} speed={speed} />
				</AnimatedItem>
				<AnimatedItem
					animation={cascadeAnimation}
					className="flex flex-col items-center gap-6 px-8 py-10 text-center md:py-12 md:gap-10"
				>
					<h2
						className="font-display text-primary leading-[1.15] m-0"
						style={titleStyle}
					>
						{title}
					</h2>
					<Button href={ctaHref} variant="primary" size="md">
						{ctaLabel}
					</Button>
				</AnimatedItem>
			</AnimatedBlock>
		</div>
	);
}
