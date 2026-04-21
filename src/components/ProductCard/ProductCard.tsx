"use client";

import Image from "next/image";
import type { Product } from "@/lib/zettle";
import { formatPrice } from "@/lib/zettle";
import { useCart } from "@/components/Cart/useCart";
import QuantityControl from "@/components/Cart/QuantityControl";

interface ProductCardProps {
	product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
	const { addItem, increment, decrement, getQuantity } = useCart();
	const firstVariant = product.variants[0] ?? null;
	const isOutOfStock = false; // Zettle free tier doesn't expose stock; placeholder for future

	const displayPrice =
		firstVariant?.price != null
			? formatPrice(firstVariant.price, firstVariant.currency)
			: null;

	const quantity = getQuantity(product.id);
	const inCart = quantity > 0;

	return (
		<article className="card card-hover flex flex-col h-full">
			{/* Image */}
			<div className="relative aspect-square overflow-hidden rounded-t-[var(--radius-card)]">
				{product.imageUrl ? (
					<Image
						src={product.imageUrl}
						alt={product.name}
						fill
						className="object-cover"
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
					/>
				) : (
					<div className="w-full h-full surface-sunken flex items-center justify-center">
						<span className="text-4xl opacity-30">🛍</span>
					</div>
				)}

				{isOutOfStock && (
					<span className="badge badge-neutral absolute top-3 left-3">
						Out of stock
					</span>
				)}
			</div>

			{/* Body */}
			<div className="card-body flex flex-col flex-1 gap-2">
				<h3
					className="font-sans font-semibold text-base leading-snug"
					style={{ color: "var(--text-primary)" }}
				>
					{product.name}
				</h3>

				{product.description && (
					<p
						className="text-sm leading-relaxed line-clamp-3 flex-1"
						style={{ color: "var(--text-secondary)" }}
					>
						{product.description}
					</p>
				)}

				<div className="flex items-center justify-between mt-auto pt-2 gap-3">
					{displayPrice && (
						<p
							className="font-sans font-bold text-lg"
							style={{ color: "var(--text-primary)" }}
						>
							{displayPrice}
						</p>
					)}

					{inCart ? (
						<QuantityControl
							quantity={quantity}
							onIncrement={() => increment(product.id)}
							onDecrement={() => decrement(product.id)}
						/>
					) : (
						<button
							type="button"
							onClick={() => addItem(product.id)}
							className="btn btn-primary btn-sm"
							disabled={isOutOfStock}
						>
							Add to cart
						</button>
					)}
				</div>
			</div>
		</article>
	);
}
