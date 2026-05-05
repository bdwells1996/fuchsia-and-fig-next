"use client";

import Image from "next/image";
import type { Product } from "@/lib/zettle";
import { formatPrice } from "@/lib/zettle";
import { useCart } from "@/components/Cart/useCart";
import QuantityControl from "@/components/Cart/QuantityControl";
import { ViewTransition, useTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Select } from "@/components/Select/Select";

interface ProductCardProps {
	product: Product;
}

const SKELETON_DELAY_MS = 600;

export default function ProductCard({ product }: ProductCardProps) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [showSkeleton, setShowSkeleton] = useState(false);
	const { addItem, increment, decrement, getQuantity } = useCart();
	const isOutOfStock = false; // Zettle free tier doesn't expose stock; placeholder for future

	const firstVariant = product.variants[0] ?? null;
	const hasMultipleVariants = product.variants.length > 1;
	const [selectedVariantId, setSelectedVariantId] = useState(
		firstVariant?.id ?? "",
	);

	const selectedVariant =
		product.variants.find((v) => v.id === selectedVariantId) ?? firstVariant;

	const displayPrice =
		selectedVariant?.price != null
			? formatPrice(selectedVariant.price, selectedVariant.currency)
			: null;

	const quantity = getQuantity(product.id, selectedVariantId);
	const inCart = quantity > 0;

	useEffect(() => {
		if (!isPending) {
			setShowSkeleton(false);
			return;
		}
		const timer = setTimeout(() => setShowSkeleton(true), SKELETON_DELAY_MS);
		return () => clearTimeout(timer);
	}, [isPending]);

	function handleNavigate() {
		startTransition(() => {
			router.push(`/shop/${product.id}`);
		});
	}

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: card acts as a link; focusable children handle keyboard
		// biome-ignore lint/a11y/noStaticElementInteractions: same
		<div onClick={handleNavigate} className="cursor-pointer">
			<article className="card card-hover flex flex-col h-full relative">
				{/* Image */}
				<div className="relative aspect-square overflow-hidden rounded-t-card">
					{product.imageUrl ? (
						<ViewTransition name={`product-image-${product.id}`}>
							<Image
								src={product.imageUrl}
								alt={product.name}
								fill
								className="object-cover"
								sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
							/>
						</ViewTransition>
					) : (
						<ViewTransition name={`product-image-${product.id}`}>
							<div className="w-full h-full surface-sunken flex items-center justify-center">
								<span className="text-4xl opacity-30">🛍</span>
							</div>
						</ViewTransition>
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

					{/* biome-ignore lint/a11y/useKeyWithClickEvents: stops card navigation from bubbling through cart controls */}
					{/* biome-ignore lint/a11y/noStaticElementInteractions: same */}
					<div
						onClick={(e) => e.stopPropagation()}
						className="flex flex-col gap-2 mt-auto pt-2"
					>
						{hasMultipleVariants && (
							<Select
								size="sm"
								value={selectedVariantId}
								onValueChange={setSelectedVariantId}
								aria-label="Select variant"
								className="mb-2"
								options={product.variants.map((v) => ({
									value: v.id,
									label: v.name ?? v.id,
								}))}
							/>
						)}

						<div className="flex items-center justify-between gap-3">
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
									onIncrement={() => increment(product.id, selectedVariantId)}
									onDecrement={() => decrement(product.id, selectedVariantId)}
								/>
							) : (
								<button
									type="button"
									onClick={() => addItem(product.id, selectedVariantId)}
									className="btn btn-primary btn-sm"
									disabled={isOutOfStock}
								>
									Add to cart
								</button>
							)}
						</div>
					</div>
				</div>

				{/* Skeleton overlay — shown after a short delay if navigation is still pending */}
				{showSkeleton && (
					<div className="absolute inset-0 rounded-card overflow-hidden animate-fade-in bg-surface">
						<div className="skeleton-fuchsia w-full aspect-square" />
						<div className="card-body flex flex-col gap-3">
							<div className="skeleton-fuchsia h-4 w-3/4 rounded" />
							<div className="skeleton-fuchsia h-3 w-full rounded" />
							<div className="skeleton-fuchsia h-3 w-5/6 rounded" />
						</div>
					</div>
				)}
			</article>
		</div>
	);
}
