/** @type {import('next').NextConfig} */

const withImages = require('next-images');

const nextConfig = {
	output: 'standalone',
	reactStrictMode: true,
	transpilePackages: ['three'],
	sassOptions: {
		additionalData: `@use '/src/scss/abstracts/index' as *;`,
	},

	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'img1.shopcider.com',
				port: '',
				pathname: '/**',
			},
		],
	},

// nextConfig를 withImages로 래핑합니다.
module.exports = withImages(nextConfig);
