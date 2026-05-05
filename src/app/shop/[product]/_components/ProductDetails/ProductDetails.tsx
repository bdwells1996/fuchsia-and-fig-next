"use client";

import { ViewTransition } from "react";
import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/zettle";
import { formatPrice } from "@/lib/zettle";
import { useCart } from "@/components/Cart/useCart";
import QuantityControl from "@/components/Cart/QuantityControl";
import { Select } from "@/components/Select/Select";

export function ProductDetails({ product }: { product: Product }) {
	const { addItem, increment, decrement, getQuantity } = useCart();
	const isOutOfStock = false;

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

	return (
		<div className="flex flex-col relative mb-14 gap-y-8 md:flex-row md:gap-x-8 md:mb-0 lg:gap-x-12 xl:gap-x-16">
			{product.imageUrl ? (
				<ViewTransition name={`product-image-${product.id}`}>
					<Image
						src={product.imageUrl}
						alt={product.name}
						width={800}
						height={800}
						className="object-cover w-full h-auto aspect-square md:rounded-2xl md:w-100 md:h-100 lg:w-150 lg:h-150"
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
					/>
				</ViewTransition>
			) : (
				<ViewTransition name={`product-image-${product.id}`}>
					<div className="aspect-square surface-sunken flex items-center justify-center">
						<span className="text-4xl opacity-30">🛍</span>
					</div>
				</ViewTransition>
			)}
			<div className="px-4 flex-1 flex flex-col md:my-4 md:px-0 animate-fade-in">
				<h1 className="text-3xl font-display md:text-4xl lg:text-5xl">
					{product.name}
				</h1>
				<p className="mt-4 overflow-y-auto prose-brand max-h-80 md:max-h-65 md:mb-4 lg:max-h-120">
					{product.description ||
						"No description available. Please check back soon!"}
				</p>
				<div className="fixed bottom-0 left-0 right-0 bg-background h-auto shadow-bottom-drawer flex flex-col justify-center gap-2 px-6 py-3 md:relative md:shadow-none md:px-0 md:mt-auto md:gap-3 md:py-0">
					{hasMultipleVariants && (
						<div className="w-full md:max-w-xs">
							<Select
								size="sm"
								value={selectedVariantId}
								onValueChange={setSelectedVariantId}
								aria-label="Select variant"
								options={product.variants.map((v) => ({
									value: v.id,
									label: v.name ?? v.id,
								}))}
							/>
						</div>
					)}
					<div className="flex items-center gap-4 md:max-w-xs">
						{displayPrice ? (
							<p className="my-2 font-medium md:text-lg">{displayPrice}</p>
						) : null}
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
		</div>
	);
}
