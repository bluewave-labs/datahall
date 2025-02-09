import prisma from '@lib/prisma';
import bcryptjs from 'bcryptjs';
import NextAuth, { type NextAuthOptions, User as NextAuthUser } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

interface ExtendedUser extends NextAuthUser {
	id: string;
	userId: string;
	role: string;
	name: string;
	remember?: boolean;
}

/**
 * NextAuth configuration for credential-based sign-in.
 */
export const authOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt',
		maxAge: 24 * 60 * 60, // 1 day
	},
	providers: [
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

				// 1) Find user in DB
				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				});
				if (!user) {
					throw new Error('No user found with the provided email');
				}
				if (user.status === 'UNVERIFIED') {
					throw new Error('Please verify your email to sign in.');
				}

				// 2) Validate password
				const isPasswordValid = await bcryptjs.compare(credentials.password, user.password);
				if (!isPasswordValid) {
					throw new Error('Invalid password');
				}

				// 3) Return user object; also carry "remember" as boolean
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
	],
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
			// If token exists, attach user info to session
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
