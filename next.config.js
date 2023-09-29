/** @type {import('next').NextConfig} */
const nextConfig = {
	// reactStrictMode: true,
};

// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-var-requires
const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
