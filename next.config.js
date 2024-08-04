/** @type {import('next').NextConfig} */

const nextConfig = {
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
const withImages = require('next-images')
module.exports = withImages()

module.exports = nextConfig


module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*',  // 백엔드 API 주소
      },
    ];
  },
};
