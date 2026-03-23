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

export function WordCloudCta({
  words,
  theme,
  title = "Ready to work with me?",
  ctaLabel = "Get in touch",
  ctaHref = "/contact",
  speed = "slow",
}: WordCloudCtaProps) {
  const ctaStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.5rem",
    padding: "3rem 2rem 4rem",
    textAlign: "center",
  };

  const titleStyle: CSSProperties = {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(1.75rem, 4vw, 3rem)",
    color: "var(--text-primary)",
    lineHeight: 1.15,
    margin: 0,
  };

  return (
    <div className={theme}>
      <InfiniteScrollWordCloud words={words} variant="headline" speed={speed} />
      <div style={ctaStyle}>
        <h2 style={titleStyle}>{title}</h2>
        <Button href={ctaHref} variant="primary" size="md">
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}
