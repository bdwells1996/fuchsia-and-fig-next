"use client";

import type { CSSProperties } from "react";

export type WordEntry = {
	word: string;
};

export type InfiniteScrollWordCloudProps = {
	words: WordEntry[];
	theme?: string;
	speed?: "slow" | "medium" | "fast";
	rows?: number;
};

const speedMap: Record<
	NonNullable<InfiniteScrollWordCloudProps["speed"]>,
	number
> = {
	slow: 60,
	medium: 35,
	fast: 18,
};

type SizeToken = "sm" | "md" | "lg" | "xl" | "2xl";
type WeightToken = "light" | "regular" | "bold";

const sizeValues: Record<SizeToken, string> = {
	sm: "0.75rem",
	md: "1.1rem",
	lg: "1.6rem",
	xl: "2.25rem",
	"2xl": "3.25rem",
};

const weightValues: Record<WeightToken, number> = {
	light: 300,
	regular: 400,
	bold: 700,
};

const config = {
	rows: 2,
	sizes: ["xl", "2xl", "xl", "2xl"] as SizeToken[],
	weights: ["light", "regular"] as WeightToken[],
	rowGap: "1rem",
	wordGap: "3rem",
};

// Deterministic pseudo-random from word + index so sizes are stable on SSR
function seededRand(word: string, index: number): number {
	let h = index * 2654435761;
	for (let i = 0; i < word.length; i++) {
		h ^= word.charCodeAt(i);
		h = Math.imul(h, 0x9e3779b9);
	}
	return Math.abs(h) / 0xffffffff;
}

type EnrichedWord = { word: string; size: SizeToken; weight: WeightToken };

function enrichWords(words: WordEntry[]): EnrichedWord[] {
	return words.map((entry, i) => {
		const r = seededRand(entry.word, i);
		return {
			word: entry.word,
			size: config.sizes[Math.floor(r * config.sizes.length)],
			weight: config.weights[Math.floor(r * config.weights.length)],
		};
	});
}

// Give each row the full word list, rotated by a per-row offset so rows feel distinct
function distributeToRows(
	words: EnrichedWord[],
	numRows: number,
): EnrichedWord[][] {
	return Array.from({ length: numRows }, (_, rowIndex) => {
		const offset = Math.floor((rowIndex * words.length) / numRows);
		return [...words.slice(offset), ...words.slice(0, offset)];
	});
}

const keyframesCSS = `
@keyframes wc-scroll-left {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@media (prefers-reduced-motion: reduce) {
  .wc-row { animation: none !important; }
}
`;

export function InfiniteScrollWordCloud({
	words,
	theme,
	speed = "medium",
	rows: rowsProp,
}: InfiniteScrollWordCloudProps) {
	if (!words || words.length === 0) return null;

	const numRows = rowsProp ?? config.rows;
	const baseDuration = speedMap[speed];
	const enriched = enrichWords(words);
	const rows = distributeToRows(enriched, numRows);

	const sectionStyle: CSSProperties = {
		padding: `${config.rowGap} 0`,
		gap: config.rowGap,
		WebkitMaskImage:
			"linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
		maskImage:
			"linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
	};

	return (
		<>
			<style>{keyframesCSS}</style>
			<section
				className={`relative overflow-hidden w-full flex flex-col${theme ? ` ${theme}` : ""}`}
				style={sectionStyle}
			>
				{rows.map((rowWords, rowIndex) => {
					// Alternate direction per row, and vary speed slightly
					const reverse = rowIndex % 2 === 1;
					const multiplier =
						1 + (rowIndex % 3 === 0 ? 0.1 : rowIndex % 3 === 1 ? -0.08 : 0.04);
					// Repeat words enough times so one set is always wider than any viewport,
					// then duplicate that set — the -50% translation lands exactly at the seam.
					const REPEATS = 6;
					const repeated = Array.from(
						{ length: REPEATS },
						() => rowWords,
					).flat();
					const duped = [...repeated, ...repeated];
					const duration = baseDuration * REPEATS * multiplier;
					// Negative delay so rows start offset (not all bunched at left on load)
					const delay = -(rowIndex * ((baseDuration * REPEATS) / numRows));

					const rowStyle: CSSProperties = {
						gap: config.wordGap,
						animationName: "wc-scroll-left",
						animationDuration: `${duration}s`,
						animationTimingFunction: "linear",
						animationIterationCount: "infinite",
						animationDelay: `${delay}s`,
						animationDirection: reverse ? "reverse" : "normal",
					};

					return (
						<section
							key={rowIndex}
							className="wc-row flex flex-row w-max will-change-transform"
							style={rowStyle}
						>
							{duped.map((entry, wordIndex) => (
								<span
									key={wordIndex}
									className="leading-[1.3] whitespace-nowrap select-none text-[var(--text-body)]"
									style={{
										fontSize: sizeValues[entry.size],
										fontWeight: weightValues[entry.weight],
									}}
								>
									{entry.word}
								</span>
							))}
						</section>
					);
				})}
			</section>
		</>
	);
}
