"use client";

import { motion } from "motion/react";
import type { AnimationConfig } from "@/lib/animations/types";
import { buildItemVariants } from "@/lib/animations/variants";

interface Props {
	animation?: AnimationConfig;
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
	/** When false, renders children as-is with no motion wrapper. Defaults to true. */
	enabled?: boolean;
}

export function AnimatedItem({ animation, children, className, style, enabled = true }: Props) {
	if (!enabled || !animation) {
		return <>{children}</>;
	}

	const variants = buildItemVariants(animation);

	return (
		<motion.div className={className} style={style} variants={variants}>
			{children}
		</motion.div>
	);
}
