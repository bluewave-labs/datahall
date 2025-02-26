/** @type {import('next').NextConfig} */
const nextConfig = {
	// ---------------------------------------------
	// 🔗 Server-Side External Packages
	// ---------------------------------------------
	// Ensures these server-only packages are included in the server bundle.
	// This prevents issues with external dependencies like Prisma and bcrypt
	// that are required at runtime for server-side operations.
	serverExternalPackages: ['@prisma/client', 'bcrypt'],

	// ---------------------------------------------
	// 🛡️ React Strict Mode
	// ---------------------------------------------
	// Enables additional checks and warnings in development mode.
	// Helps identify potential issues (like unsafe lifecycles and side effects)
	// early in the development process without affecting production builds.
	reactStrictMode: true,

	// ---------------------------------------------
	// 🧩 Webpack Configuration
	// ---------------------------------------------
	webpack: (config) => {
		// Prevents Webpack from resolving the 'canvas' module.
		// Useful if some libraries attempt to use 'canvas' (a Node.js module)
		// but you don't need it, avoiding unnecessary bundle size and potential errors.
		config.resolve.alias.canvas = false;

		return config;
	},

	// ---------------------------------------------
	// 📝 TypeScript Build Validation
	// ---------------------------------------------
	typescript: {
		// Ensures the build fails if there are TypeScript errors.
		// This prevents shipping code with type issues to production,
		// improving overall code quality and stability.
		ignoreBuildErrors: false,
	},

	// ---------------------------------------------
	// 📦 Output Configuration
	// ---------------------------------------------
	// Prepares the Next.js app for production with a self-contained output.
	// Useful for Docker deployments or when running the app outside of Vercel.
	// It bundles all necessary dependencies into a 'standalone' folder.
	output: 'standalone',
};

export default nextConfig;
