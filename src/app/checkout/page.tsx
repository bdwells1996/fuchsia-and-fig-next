"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import { useCart } from "@/components/Cart/useCart";
import QuantityControl from "@/components/Cart/QuantityControl";
import type { Product } from "@/lib/zettle";
import { formatPrice } from "@/lib/zettle";

export default function CheckoutPage() {
	const { items, hydrated, totalItems, increment, decrement, remove } =
		useCart();
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("/api/products")
			.then((r) => r.json())
			.then((data) => setProducts(Array.isArray(data) ? data : []))
			.catch(() => {})
			.finally(() => setLoading(false));
	}, []);

	const lineItems = items.map((item) => ({
		...item,
		product: products.find((p) => p.id === item.productId) ?? null,
	}));

	const currency =
		lineItems.find((li) => li.product?.variants[0]?.currency)?.product
			?.variants[0]?.currency ?? "GBP";

	const subtotal = lineItems.reduce((sum, li) => {
		const price = li.product?.variants[0]?.price ?? 0;
		return sum + price * li.quantity;
	}, 0);

	// Wait for cart hydration before deciding if it's empty
	const isEmpty = hydrated && totalItems === 0;

	return (
		<div className="min-h-screen bg-background">
			<Nav />

			<section
				className="surface-sunken border-b"
				style={{ borderColor: "var(--border)" }}
			>
				<div className="container-site py-12 md:py-16">
					<h1
						className="font-display text-4xl md:text-5xl"
						style={{ color: "var(--text-primary)" }}
					>
						Checkout
					</h1>
					<p className="mt-3 text-base font-sans max-w-xl text-text-secondary">
						Review your order before completing your purchase.
					</p>
				</div>
			</section>

			<div className="container-site py-12">
				{!hydrated || loading ? (
					<p
						className="text-sm font-sans"
						style={{ color: "var(--text-secondary)" }}
					>
						Loading your cart…
					</p>
				) : isEmpty ? (
					<div className="text-center py-16">
						<p
							className="text-lg font-sans mb-6"
							style={{ color: "var(--text-secondary)" }}
						>
							<Link href="/shop" className="text-bloom-500 font-semibold">
								shop!
							</Link>
						</p>
						<Link href="/shop" className="btn btn-primary btn-md">
							Browse the shop
						</Link>
					</div>
				) : (
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
						{/* Line items */}
						<div className="lg:col-span-2">
							<ul className="space-y-4">
								{lineItems.map((li) => (
									<li
										key={li.productId}
										className="card flex gap-4 p-4 items-start"
									>
										{/* Thumbnail */}
										<div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden surface-sunken">
											{li.product?.imageUrl ? (
												<Image
													src={li.product.imageUrl}
													alt={li.product?.name ?? "Product"}
													fill
													className="object-cover"
													sizes="80px"
												/>
											) : (
												<span className="flex items-center justify-center w-full h-full text-2xl opacity-30">
													🛍
												</span>
											)}
										</div>

										{/* Details */}
										<div className="flex-1 min-w-0">
											<p
												className="font-sans font-semibold text-base leading-snug"
												style={{ color: "var(--text-primary)" }}
											>
												{li.product?.name ?? "Unknown product"}
											</p>
											{li.product?.variants[0]?.price != null && (
												<p
													className="font-sans text-sm mt-1"
													style={{ color: "var(--text-secondary)" }}
												>
													{formatPrice(
														li.product.variants[0].price,
														li.product.variants[0].currency,
													)}{" "}
													each
												</p>
											)}
											<div className="mt-3">
												<QuantityControl
													quantity={li.quantity}
													onIncrement={() => increment(li.productId)}
													onDecrement={() => decrement(li.productId)}
													onRemove={() => remove(li.productId)}
												/>
											</div>
										</div>

										{/* Line total */}
										{li.product?.variants[0]?.price != null && (
											<p
												className="font-sans font-bold text-base flex-shrink-0"
												style={{ color: "var(--text-primary)" }}
											>
												{formatPrice(
													li.product.variants[0].price * li.quantity,
													li.product.variants[0].currency,
												)}
											</p>
										)}
									</li>
								))}
							</ul>
						</div>

						{/* Order summary */}
						<div className="lg:col-span-1">
							<div className="card card-body space-y-4 sticky top-24">
								<h2
									className="font-sans font-semibold text-base"
									style={{ color: "var(--text-primary)" }}
								>
									Order summary
								</h2>

								<div
									className="flex justify-between text-sm font-sans border-t pt-4"
									style={{
										borderColor: "var(--border-subtle)",
										color: "var(--text-secondary)",
									}}
								>
									<span>Subtotal</span>
									<span
										className="font-bold"
										style={{ color: "var(--text-primary)" }}
									>
										{formatPrice(subtotal, currency)}
									</span>
								</div>

								<p
									className="text-xs font-sans"
									style={{ color: "var(--text-secondary)" }}
								>
									Shipping and taxes calculated at payment.
								</p>

								<button
									type="button"
									className="btn btn-primary btn-md btn-full"
									disabled
								>
									Pay now — coming soon
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
