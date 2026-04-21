"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./useCart";
import QuantityControl from "./QuantityControl";
import type { Product } from "@/lib/zettle";
import { formatPrice } from "@/lib/zettle";

interface CartPreviewProps {
	isOpen: boolean;
	onClose: () => void;
	triggerRef?: React.RefObject<HTMLElement | null>;
}

export default function CartPreview({
	isOpen,
	onClose,
	triggerRef,
}: CartPreviewProps) {
	const { items, totalItems, increment, decrement, remove } = useCart();
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(false);
	const panelRef = useRef<HTMLDivElement>(null);

	// Fetch product catalogue when the preview opens for the first time
	useEffect(() => {
		if (!isOpen || products.length > 0) return;
		setLoading(true);
		fetch("/api/products")
			.then((r) => r.json())
			.then((data) => setProducts(Array.isArray(data) ? data : []))
			.catch(() => {})
			.finally(() => setLoading(false));
	}, [isOpen, products.length]);

	// Lock body scroll on mobile when open
	useEffect(() => {
		if (typeof window === "undefined") return;
		const isMobile = window.matchMedia("(max-width: 767px)").matches;
		if (!isMobile) return;
		if (isOpen) {
			document.body.style.overflow = "hidden";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	// Close on Escape
	useEffect(() => {
		if (!isOpen) return;
		const handler = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", handler);
		return () => document.removeEventListener("keydown", handler);
	}, [isOpen, onClose]);

	// Close on outside click (deferred so the opening click doesn't immediately close)
	useEffect(() => {
		if (!isOpen) return;
		const handler = (e: MouseEvent) => {
			const target = e.target as Node;
			if (
				panelRef.current &&
				!panelRef.current.contains(target) &&
				!triggerRef?.current?.contains(target)
			) {
				onClose();
			}
		};
		const id = setTimeout(
			() => document.addEventListener("mousedown", handler),
			0,
		);
		return () => {
			clearTimeout(id);
			document.removeEventListener("mousedown", handler);
		};
	}, [isOpen, onClose, triggerRef]);

	if (!isOpen) return null;

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

	return (
		<div
			ref={panelRef}
			className="animate-cart-preview-in fixed right-0 top-16 sm:top-13.5 border-border w-full surface-raised border shadow-lg z-50 flex flex-col h-[calc(100dvh-4rem)] sm:h-auto sm:max-h-100 sm:w-96 sm:rounded-xl md:absolute"
		>
			{/* Header */}
			<div
				className="flex items-center px-4 py-3 border-b"
				style={{ borderColor: "var(--border)" }}
			>
				<span className="font-sans font-semibold text-text-primary text-sm">
					Your basket{totalItems > 0 ? ` (${totalItems})` : ""}
				</span>
			</div>

			{/* Body */}
			<div className="flex-1 overflow-y-auto">
				{items.length === 0 ? (
					<p className="px-4 py-8 text-left text-text-secondary text-sm font-sans">
						Your cart is empty, add some items from the{" "}
						<Link href="/shop" className="text-bloom-500 font-semibold">
							shop!
						</Link>
					</p>
				) : loading ? (
					<p
						className="px-4 py-8 text-center text-sm font-sans"
						style={{ color: "var(--text-secondary)" }}
					>
						Loading…
					</p>
				) : (
					<ul className="divide-y divide-border-subtle">
						{lineItems.map((li) => (
							<li key={li.productId} className="flex gap-4 px-4 py-3">
								{/* Thumbnail */}
								<div className="relative w-20 shrink rounded overflow-hidden surface-sunken">
									{li.product?.imageUrl ? (
										<Image
											src={li.product.imageUrl}
											alt={li.product.name}
											fill
											className="object-cover"
											sizes="56px"
										/>
									) : (
										<span className="flex items-center justify-center w-full h-full text-xl opacity-30">
											🛍
										</span>
									)}
								</div>

								{/* Details */}
								<div className="flex-1 min-w-0">
									<p
										className="font-sans text-sm font-medium leading-snug truncate"
										style={{ color: "var(--text-primary)" }}
									>
										{li.product?.name ?? "Unknown product"}
									</p>
									{li.product?.variants[0]?.price != null && (
										<p
											className="font-sans text-sm mt-0.5 sm:text-xs"
											style={{ color: "var(--text-secondary)" }}
										>
											{formatPrice(
												li.product.variants[0].price,
												li.product.variants[0].currency,
											)}
										</p>
									)}
									<div className="mt-2">
										<QuantityControl
											quantity={li.quantity}
											onIncrement={() => increment(li.productId)}
											onDecrement={() => decrement(li.productId)}
											onRemove={() => remove(li.productId)}
										/>
									</div>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>

			{/* Footer */}
			{items.length > 0 && (
				<div
					className="px-4 py-3 border-t space-y-3"
					style={{ borderColor: "var(--border)" }}
				>
					<div className="flex items-center justify-between">
						<span
							className="font-sans text-sm"
							style={{ color: "var(--text-secondary)" }}
						>
							Subtotal
						</span>
						<span
							className="font-sans font-bold text-sm"
							style={{ color: "var(--text-primary)" }}
						>
							{formatPrice(subtotal, currency)}
						</span>
					</div>
					<Link
						href="/checkout"
						onClick={onClose}
						className="btn btn-primary btn-sm btn-full"
					>
						Checkout
					</Link>
				</div>
			)}
		</div>
	);
}
