"use client";

import { Trash } from "lucide-react";

interface QuantityControlProps {
	quantity: number;
	onIncrement: () => void;
	onDecrement: () => void;
	onRemove?: () => void;
}

export default function QuantityControl({
	quantity,
	onIncrement,
	onDecrement,
	onRemove,
}: QuantityControlProps) {
	return (
		<div className="flex items-center gap-1">
			<button
				type="button"
				onClick={onDecrement}
				className="btn btn-outline btn-icon-sm"
				aria-label="Decrease quantity"
			>
				<span aria-hidden>−</span>
			</button>

			<span
				className="w-7 text-center font-sans text-sm font-semibold tabular-nums"
				style={{ color: "var(--text-primary)" }}
			>
				{quantity}
			</span>

			<button
				type="button"
				onClick={onIncrement}
				className="btn btn-outline btn-icon-sm"
				aria-label="Increase quantity"
			>
				<span aria-hidden>+</span>
			</button>

			{onRemove && (
				<button
					type="button"
					onClick={onRemove}
					className="btn btn-ghost btn-icon-sm ml-1"
					aria-label="Remove item"
					style={{ color: "var(--text-secondary)" }}
				>
					<Trash
						size={16}
						className="text-text-secondary hover:text-violet-500 transition-colors"
					/>
				</button>
			)}
		</div>
	);
}
