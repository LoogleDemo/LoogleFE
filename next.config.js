/** @type {import('next').NextConfig} */

const withImages = require('next-images')

const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin({
	locales: ['en', 'ko'],
	defaultLocale: 'en',
})

const nextConfig = {
	output: 'standalone',
	reactStrictMode: true,
	transpilePackages: ['three'],
	sassOptions: {
		additionalData: `@use '/src/scss/abstracts/index' as *;`,
	},
	async rewrites() {
		return [
			{
				source: '/:path*',
				destination: process.env.NEXT_PUBLIC_LOOGLE_BASE + '/:path*',
			},
		]
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
}

module.exports = withNextIntl(withImages(nextConfig))
