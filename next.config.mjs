/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverComponentsExternalPackages: ['@prisma/client', 'bcrypt'],
	},
	webpack: (config) => {
		config.resolve.alias.canvas = false;

		return config;
	},
};

export default nextConfig;
