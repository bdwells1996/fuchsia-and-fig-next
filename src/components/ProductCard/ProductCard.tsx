import Image from "next/image";
import type { Product } from "@/lib/zettle";
import { formatPrice } from "@/lib/zettle";

interface ProductCardProps {
	product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
	const firstVariant = product.variants[0] ?? null;
	const isOutOfStock = false; // Zettle free tier doesn't expose stock; placeholder for future

	const displayPrice =
		firstVariant?.price != null
			? formatPrice(firstVariant.price, firstVariant.currency)
			: null;

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

				{displayPrice && (
					<p
						className="font-sans font-bold text-lg mt-auto pt-2"
						style={{ color: "var(--text-primary)" }}
					>
						{displayPrice}
					</p>
				)}
			</div>
		</article>
	);
}
