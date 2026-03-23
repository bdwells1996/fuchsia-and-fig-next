"use client";

import type { CSSProperties } from "react";
import Button from "@/components/Button";
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
			<div className="pt-12">
				<InfiniteScrollWordCloud words={words} speed={speed} />
			</div>
			<div className="flex flex-col items-center gap-6 px-8 py-10 text-center md:py-12 md:gap-10">
				<h2
					className="font-display text-primary leading-[1.15] m-0"
					style={titleStyle}
				>
					{title}
				</h2>
				<Button href={ctaHref} variant="primary" size="md">
					{ctaLabel}
				</Button>
			</div>
		</div>
	);
}
