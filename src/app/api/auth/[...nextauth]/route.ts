import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs';
import NextAuth, { NextAuthOptions, User as NextAuthUser } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

interface ExtendedUser extends NextAuthUser {
	id: string;
	userId: string;
	role: string;
	name: string;
	remember?: boolean;
}

const providers = [];
if (process.env.AUTH_METHOD !== 'auth0') {
	providers.push(
		CredentialsProvider({
			name: 'Sign in',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
				remember: { label: 'Remember', type: 'checkbox' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) {
					throw new Error('Email and password are required');
				}

				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				});
				if (!user) {
					throw new Error('No user found with the provided email');
				}
				if (user.status === 'UNVERIFIED') {
					throw new Error('Please verify your email to sign in.');
				}

				const isPasswordValid = await bcryptjs.compare(credentials.password, user.password);
				if (!isPasswordValid) {
					throw new Error('Invalid password');
				}

				return {
					id: user.id.toString(),
					userId: user.user_id,
					email: user.email,
					firstName: user.first_name,
					lastName: user.last_name,
					role: user.role,
					remember: credentials.remember === 'true',
				} as ExtendedUser;
			},
		}),
	);
}
// Add Auth0 provider when AUTH_METHOD is 'auth0'
// if (process.env.AUTH_METHOD === 'auth0') {
//     providers.push(Auth0Provider({
//         clientId: process.env.AUTH0_CLIENT_ID!,
//         clientSecret: process.env.AUTH0_CLIENT_SECRET!,
//         issuer: process.env.AUTH0_ISSUER
//     }));
// }

export const authOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt',
		maxAge: 24 * 60 * 60, // 1 day
	},
	providers,

	pages: {
		signIn: '/auth/sign-in',
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.userId = user.userId;
				token.role = user.role;
				token.firstName = user.firstName;
				token.lastName = user.lastName;
				token.remember = (user as ExtendedUser).remember || false;
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user = {
					id: token.id as string,
					userId: token.userId as string,
					role: token.role as string,
					firstName: token.firstName as string,
					lastName: token.lastName as string,
					email: token.email as string,
				};
			}
			return session;
		},
		async signIn({ user, credentials }) {
			return true;
		},
		async redirect({ url, baseUrl }) {
			return url.startsWith(baseUrl) ? url : baseUrl;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
