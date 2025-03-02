/** @type {import('next').NextConfig} */
const nextConfig = {
	// Ensures these server-only packages are included in the server bundle.
	serverExternalPackages: ['@prisma/client', 'bcrypt'],
	// Enables additional checks and warnings in development mode.
	reactStrictMode: false,

	webpack: (config) => {
		// Prevents Webpack from resolving the 'canvas' module.
		// This is useful when deploying to platforms like Vercel
		config.resolve.alias.canvas = false;

		return config;
	},

	typescript: {
		// Ensures the build fails if there are TypeScript errors.
		ignoreBuildErrors: false,
	},
	// Prepares the Next.js app for production with a self-contained output.
	// Useful for Docker deployments or when running the app outside of Vercel.
	// It bundles all necessary dependencies into a 'standalone' folder.
	output: 'standalone',
};

export default nextConfig;
