import bcryptjs from 'bcryptjs';
import { NextAuthOptions } from 'next-auth';
import { jwtDecode } from 'jwt-decode';

import CredentialsProvider from 'next-auth/providers/credentials';

import prisma from '@/lib/prisma';
import { unifyUserByEmail } from '@/services/auth/authService';

const providers = [];

if (process.env.AUTH_METHOD?.toLowerCase() === 'credentials') {
	// --- Local Credentials Approach ---
	providers.push(
		CredentialsProvider({
			name: 'Local Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
				remember: { label: 'Remember', type: 'checkbox' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) {
					throw new Error('Email and password are required');
				}

				// 1) Find user by email
				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				});
				if (!user) {
					throw new Error('No user found with the provided email');
				}
				if (user.status !== 'ACTIVE') {
					throw new Error('Please verify your email to sign in.');
				}

				// 2) Check password
				const isPasswordValid = await bcryptjs.compare(credentials.password, user.password!);
				if (!isPasswordValid) {
					throw new Error('Invalid password');
				}

				// Return user fields for the JWT/session
				return {
					id: user.id.toString(),
					userId: user.user_id,
					email: user.email,
					role: user.role,
					firstName: user.first_name,
					lastName: user.last_name,
					authProvider: user.auth_provider,
					avatarUrl: user.avatar_url ?? undefined,
					status: user.status,
					remember: credentials.remember === 'true',
				};
			},
		}),
	);
} else if (process.env.AUTH_METHOD?.toLowerCase() === 'auth0') {
	// --- Auth0 ROPG Approach ---
	providers.push(
		CredentialsProvider({
			name: 'Auth0 ROPG',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) {
					throw new Error('Email and password are required');
				}

				// 1) Call Auth0's /oauth/token with grant_type=password
				const resp = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						grant_type: 'password',
						username: credentials.email,
						password: credentials.password,
						client_id: process.env.AUTH0_CLIENT_ID,
						client_secret: process.env.AUTH0_CLIENT_SECRET,
						realm: process.env.AUTH0_DB_CONNECTION,
					}),
				});
				const auth0Data = await resp.json();

				if (auth0Data.error) {
					throw new Error(auth0Data.error_description || 'Invalid credentials');
				}
				if (!auth0Data.id_token) {
					throw new Error('No id_token returned from Auth0');
				}

				// We could parse id_token to get user claims; for now, unify by email:
				const finalUser = await unifyUserByEmail(credentials.email, {
					// If you want to parse name from id_token, do so. For brevity, skip it here
					fullName: '',
					picture: undefined,
				});

				const claims = jwtDecode<{ email_verified?: boolean }>(auth0Data.id_token);
				if (!claims.email_verified) throw new Error('Please verify your email …');

				if (claims.email_verified && finalUser.status !== 'ACTIVE') {
					await prisma.user.update({
						where: { user_id: finalUser.user_id },
						data: { status: 'ACTIVE' },
					});
					finalUser.status = 'ACTIVE';
				}

				return {
					id: finalUser.id.toString(),
					userId: finalUser.user_id,
					email: finalUser.email,
					role: finalUser.role,
					firstName: finalUser.first_name,
					lastName: finalUser.last_name,
					authProvider: finalUser.auth_provider,
					avatarUrl: finalUser.avatar_url ?? undefined,
					status: finalUser.status,
				};
			},
		}),
	);
}

export const authOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt',
		maxAge: 24 * 60 * 60,
	},
	providers,
	pages: {
		signIn: '/auth/sign-in',
	},
	callbacks: {
		// signIn callback might not be necessary if using ROPG,
		// but kept it if we do something else (like unify social logins).
		async signIn({ user }) {
			return true;
		},
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.userId = user.userId;
				token.role = user.role;
				token.firstName = user.firstName;
				token.lastName = user.lastName;
				token.authProvider = user.authProvider;
				token.avatarUrl = user.avatarUrl;
				token.status = user.status;
				token.email = user.email;
				token.remember30d = (user as any).remember ?? false;

				if (token.remember30d) {
					token.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30; // 30 days
				}
			}

			return token;
		},
		async session({ session, token }) {
			session.user = {
				id: token.id as string,
				userId: token.userId as string,
				role: token.role as string,
				firstName: token.firstName as string,
				lastName: token.lastName as string,
				email: token.email as string,
				authProvider: token.authProvider as 'CREDENTIALS' | 'AUTH0' | 'GOOGLE',
				avatarUrl: token.avatarUrl as string | undefined,
				status: token.status as 'ACTIVE' | 'ARCHIVED' | 'UNVERIFIED',
			};
			return session;
		},
		async redirect({ url, baseUrl }) {
			return url.startsWith(baseUrl) ? url : baseUrl;
		},
	},
};
