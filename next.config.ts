import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
			},
			{
				protocol: "https",
				hostname: "image.izettle.com",
			},
		],
	},
	experimental: {
		viewTransition: true,
	},
};

export default nextConfig;
