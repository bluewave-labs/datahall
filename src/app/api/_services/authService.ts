import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { randomUUID } from 'crypto';
import bcryptjs from 'bcryptjs';
import { RegisterPayload, RegisterResult } from '@/shared/models';

export const authService = {
	/**
	 * Authenticates the incoming request by checking the session from NextAuth.
	 * @returns The userId (string) if authenticated
	 * @throws An error ('Unauthorized') if no valid user session
	 */
	async authenticate(): Promise<string> {
		const session = await getServerSession(authOptions);
		if (!session || !session.user?.userId) {
			throw new Error('Unauthorized: User must be signed in.');
		}
		return session.user.userId;
	},

	/**
	 * Registers a new user with UNVERIFIED status.
	 * Returns success flag, message, and possibly a verification token.
	 */
	async registerUser(payload: RegisterPayload): Promise<RegisterResult> {
		const { email, password, firstName, lastName, role } = payload;

		// 1) Check if user already exists
		const existingUser = await prisma.user.findUnique({ where: { email } });
		if (existingUser) {
			return {
				success: false,
				message: 'User with this email already exists.',
			};
		}

		// 2) Hash password, generate verification token
		const hashedPassword = await bcryptjs.hash(password, 10);
		const verificationToken = randomUUID();

		// 3) Create user
		const newUser = await prisma.user.create({
			data: {
				user_id: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
				email,
				password: hashedPassword,
				first_name: firstName,
				last_name: lastName,
				role: role || 'ADMIN',
				status: 'UNVERIFIED',
				verification_token: verificationToken,
				token_expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
			},
		});

		return {
			success: true,
			message: 'User created successfully.',
			userId: newUser.user_id,
			verificationToken,
		};
	},

	/**
	 * Generates and stores a password reset token for a user.
	 * Returns the generated token.
	 */
	async createPasswordResetToken(email: string): Promise<{
		success: boolean;
		message: string;
		token?: string;
		userName?: string;
		userEmail?: string;
	}> {
		// 1) Check if user exists
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			return { success: false, message: 'Email is not registered' };
		}

		// 2) Create token record
		const generatedToken = randomUUID();
		await prisma.passwordResetToken.create({
			data: {
				token: generatedToken,
				User: { connect: { user_id: user.user_id } },
			},
		});

		return {
			success: true,
			message: 'Token generated successfully.',
			token: generatedToken,
			userName: user.first_name,
			userEmail: user.email,
		};
	},

	/**
	 * Completes the password reset for a valid token.
	 * Expects the token and a new password. Expires tokens after 4 hours by default.
	 */
	async resetUserPassword(
		token: string,
		newPassword: string,
	): Promise<{
		success: boolean;
		message: string;
	}> {
		const fourHoursAgo = new Date(Date.now() - 4 * 60 * 60 * 1000);

		// 1) Find a valid token record
		const passToken = await prisma.passwordResetToken.findFirst({
			where: {
				token,
				reset_at: null, // not used yet
				created_at: { gte: fourHoursAgo },
			},
		});

		if (!passToken) {
			return { success: false, message: 'Token not valid or expired.' };
		}

		// 2) Hash the new password
		const encrypted = await bcryptjs.hash(newPassword, 10);

		// 3) Update user password + mark token as used (transaction)
		const updateUser = prisma.user.update({
			where: { user_id: passToken.user_id },
			data: { password: encrypted },
		});

		const updateToken = prisma.passwordResetToken.update({
			where: { id: passToken.id },
			data: { reset_at: new Date() },
		});

		await prisma.$transaction([updateUser, updateToken]);

		return { success: true, message: 'Password updated successfully.' };
	},

	/**
	 * Verifies user by either token or userId.
	 * Returns a standardized success response or error.
	 */
	async verifyUser(
		token?: string,
		userId?: string,
	): Promise<{
		success: boolean;
		message: string;
		statusCode: number;
	}> {
		if (!token && !userId) {
			return {
				success: false,
				message: 'Verification token or userId missing.',
				statusCode: 400,
			};
		}

		if (token) {
			// 1) Find user by token
			const user = await prisma.user.findFirst({
				where: { verification_token: token },
			});
			if (!user) {
				return { success: false, message: 'Invalid token', statusCode: 400 };
			}
			if (user.token_expires_at < new Date()) {
				return { success: false, message: 'Expired token', statusCode: 400 };
			}
			if (user.status === 'ACTIVE') {
				return { success: true, message: 'User is already verified', statusCode: 200 };
			}

			// 2) Mark user verified
			await prisma.user.update({
				where: { email: user.email },
				data: {
					status: 'ACTIVE',
					verification_token: undefined,
					token_expires_at: undefined,
				},
			});
			return {
				success: true,
				message: 'Email verified successfully!',
				statusCode: 200,
			};
		}

		if (userId) {
			// 1) Find user by userId
			const user = await prisma.user.findUnique({ where: { user_id: userId } });
			if (!user) {
				return { success: false, message: 'User not found', statusCode: 404 };
			}
			if (user.status === 'ACTIVE') {
				return { success: true, message: 'User is already verified', statusCode: 200 };
			}
			return {
				success: false,
				message: 'User is not verified',
				statusCode: 400,
			};
		}

		return { success: false, message: 'Invalid request', statusCode: 400 };
	},
};
