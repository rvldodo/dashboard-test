import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	async headers() {
		return [
			{
				source: "/api/proxy/:path*",
				headers: [
					{
						key: "X-Frame-Options",
						value: "ALLOWALL",
					},
					{
						key: "Content-Security-Policy",
						value: "frame-ancestors *;",
					},
				],
			},
			{
				source: "/api/proxy-dynamic/:path*",
				headers: [
					{
						key: "X-Frame-Options",
						value: "ALLOWALL",
					},
					{
						key: "Content-Security-Policy",
						value: "frame-ancestors *;",
					},
				],
			},
		];
	},
	// Enable experimental features if needed
	experimental: {
		serverActions: {
			allowedOrigins: ["dashboard.waterhub.co.id"],
		},
	},
};

export default nextConfig;
