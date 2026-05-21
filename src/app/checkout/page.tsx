"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
	const [paying, setPaying] = useState(false);
	const [payError, setPayError] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		fetch("/api/products")
			.then((r) => r.json())
			.then((data) => setProducts(Array.isArray(data) ? data : []))
			.catch(() => {})
			.finally(() => setLoading(false));
	}, []);

	const lineItems = items.map((item) => {
		const product = products.find((p) => p.id === item.productId) ?? null;
		const variant =
			product?.variants.find((v) => v.id === item.variantId) ??
			product?.variants[0] ??
			null;
		return { ...item, product, variant };
	});

	async function handlePay() {
		setPayError(null);
		setPaying(true);
		try {
			const itemsPayload = lineItems.map((li) => ({
				productId: li.productId,
				variantId: li.variantId,
				name: li.product?.name ?? "Item",
				variantName: li.variant?.name ?? null,
				price: li.variant?.price ?? 0,
				quantity: li.quantity,
				imageUrl: li.product?.imageUrl ?? null,
			}));

			const res = await fetch("/api/checkout/create-session", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ items: itemsPayload }),
			});

			const data = await res.json();
			if (!res.ok || !data.url) {
				setPayError(data.error ?? "Something went wrong. Please try again.");
				return;
			}
			router.push(data.url);
		} catch {
			setPayError("Something went wrong. Please try again.");
		} finally {
			setPaying(false);
		}
	}

	const currency =
		lineItems.find((li) => li.variant?.currency)?.variant?.currency ?? "GBP";

	const subtotal = lineItems.reduce((sum, li) => {
		const price = li.variant?.price ?? 0;
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
										key={`${li.productId}-${li.variantId}`}
										className="card flex gap-4 p-4 items-start"
									>
										{/* Thumbnail */}
										<div className="relative w-20 h-20 shrink-0 rounded overflow-hidden surface-sunken">
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
											{li.variant?.name && (
												<p
													className="font-sans text-sm mt-0.5"
													style={{ color: "var(--text-secondary)" }}
												>
													{li.variant.name}
												</p>
											)}
											{li.variant?.price != null && (
												<p
													className="font-sans text-sm mt-1"
													style={{ color: "var(--text-secondary)" }}
												>
													{formatPrice(li.variant.price, li.variant.currency)}{" "}
													each
												</p>
											)}
											<div className="mt-3">
												<QuantityControl
													quantity={li.quantity}
													onIncrement={() =>
														increment(li.productId, li.variantId)
													}
													onDecrement={() =>
														decrement(li.productId, li.variantId)
													}
													onRemove={() => remove(li.productId, li.variantId)}
												/>
											</div>
										</div>

										{/* Line total */}
										{li.variant?.price != null && (
											<p
												className="font-sans font-bold text-base shrink-0"
												style={{ color: "var(--text-primary)" }}
											>
												{formatPrice(
													li.variant.price * li.quantity,
													li.variant.currency,
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

								{payError && (
									<p
										className="text-sm font-sans"
										style={{ color: "var(--color-error, #dc2626)" }}
									>
										{payError}
									</p>
								)}

								<button
									type="button"
									className="btn btn-primary btn-md btn-full"
									onClick={handlePay}
									disabled={paying || loading}
								>
									{paying ? "Redirecting to payment…" : "Pay with Stripe"}
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
