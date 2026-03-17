"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { navLinks } from "@/config/nav-links";
import Logo from "@/components/Logo";

export default function Nav() {
	const pathname = usePathname();

	return (
		<nav className="border-b border-border-subtle bg-surface/80 backdrop-blur-sm sticky top-0 z-30">
			<div className="container-site flex items-center justify-between h-16">
				<Link href="/" aria-label="Go to homepage">
					<Logo size="md" />
				</Link>
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
			</div>
		</nav>
	);
}
