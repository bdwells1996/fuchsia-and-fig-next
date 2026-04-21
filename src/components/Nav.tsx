"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import clsx from "clsx";
import { ShoppingBasket, X } from "lucide-react";
import { navLinks } from "@/config/nav-links";
import Logo from "@/components/Logo";
import { useCart } from "@/components/Cart/useCart";
import CartPreview from "@/components/Cart/CartPreview";

export default function Nav() {
	const pathname = usePathname();
	const { totalItems } = useCart();
	const [cartOpen, setCartOpen] = useState(false);
	const cartButtonRef = useRef<HTMLButtonElement>(null);

	return (
		<nav className="border-b border-border-subtle bg-surface/80 backdrop-blur-sm sticky top-0 z-30">
			<div className="container-site flex items-center justify-between h-16">
				<Link href="/" aria-label="Go to homepage">
					<Logo size="md" />
				</Link>

				<div className="flex items-center gap-4">
					<div className="hidden sm:flex items-center gap-8">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className={clsx("nav-link", pathname === link.href && "active")}
							>
								{link.label}
							</Link>
						))}
					</div>

					{/* Cart button */}
					<div className="relative">
						<button
							ref={cartButtonRef}
							type="button"
							onClick={() => setCartOpen((o) => !o)}
							className="btn btn-ghost btn-icon-md relative"
							aria-label={
								cartOpen
									? "Close cart"
									: `Open cart${totalItems > 0 ? `, ${totalItems} items` : ""}`
							}
						>
							{/* Cart icon — scales out when open */}
							<span
								className="block absolute transition-all duration-150"
								style={{
									transform: cartOpen ? "scale(0.5)" : "scale(1)",
									opacity: cartOpen ? 0 : 1,
								}}
								aria-hidden
							>
								<ShoppingBasket width={20} height={20} />
							</span>

							{/* Close icon — scales in when open */}
							<span
								className="block transition-all duration-150"
								style={{
									transform: cartOpen ? "scale(1)" : "scale(0.5)",
									opacity: cartOpen ? 1 : 0,
								}}
								aria-hidden
							>
								<X width={20} height={20} />
							</span>

							{totalItems > 0 && !cartOpen && (
								<span
									className="absolute -top-1 -right-1 min-w-[1.1rem] h-[1.1rem] rounded-full flex items-center justify-center font-sans font-bold text-white leading-none"
									style={{
										fontSize: "0.6rem",
										backgroundColor: "var(--brand-primary)",
										padding: "0 0.25rem",
									}}
									aria-hidden
								>
									{totalItems > 99 ? "99+" : totalItems}
								</span>
							)}
						</button>

						<CartPreview
							isOpen={cartOpen}
							onClose={() => setCartOpen(false)}
							triggerRef={cartButtonRef}
						/>
					</div>
				</div>
			</div>
		</nav>
	);
}
