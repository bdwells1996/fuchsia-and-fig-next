import Image from "next/image";

const sizes = {
	sm: { width: 129, height: 32 },
	md: { width: 161, height: 40 },
	lg: { width: 194, height: 48 },
};

interface LogoProps {
	size?: keyof typeof sizes;
	className?: string;
}

export default function Logo({ size = "md", className }: LogoProps) {
	const { width, height } = sizes[size];

	return (
		<Image
			src="/logo.svg"
			alt="Fuchsia & Fig"
			width={width}
			height={height}
			className={className}
			priority
		/>
	);
}
