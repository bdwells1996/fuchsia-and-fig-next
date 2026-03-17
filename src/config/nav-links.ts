export interface NavLink {
	label: string;
	href: string;
}

export const navLinks: NavLink[] = [
	{ label: "Home", href: "/" },
	{ label: "About", href: "/about" },
	{ label: "Portfolio", href: "/portfolio" },
	{ label: "Contact", href: "/contact" },
];
