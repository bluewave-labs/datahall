import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import prisma from '@/lib/prisma';
import type {
	ChangePasswordRequest,
	ChangePasswordResponse,
	ForgotPasswordRequest,
	ForgotPasswordResponse,
	ResetPasswordRequest,
	ResetPasswordResponse,
	SignUpRequest,
	SignUpResponse,
	VerifyUserRequest,
	VerifyUserResponse,
} from '@/shared/models';
import type { IAuth } from './IAuth';
import { emailService } from '../email/emailService';
import { ChangeNameRequest } from '@/shared/models/authModels';

export class LocalAuthAdapter implements IAuth {
	async signUp(request: SignUpRequest): Promise<SignUpResponse> {
		const { email, password, firstName, lastName } = request;

		const exists = await prisma.user.findUnique({ where: { email } });
		if (exists) return { success: false, message: 'Email already exists' };

		const hashed = await bcrypt.hash(password, 10);
		const verificationToken = randomUUID();

		const user = await prisma.user.create({
			data: {
				user_id: randomUUID().replace(/-/g, ''),
				email,
				password: hashed,
				first_name: firstName,
				last_name: lastName,
				auth_provider: 'CREDENTIALS',
				status: 'UNVERIFIED',
				role: 'ADMIN',
				verification_token: verificationToken,
				token_expires_at: new Date(Date.now() + 86_400_000), // 24h
			},
		});

		await emailService.sendVerificationEmail(user.email, verificationToken, firstName);

		return {
			success: true,
			message: 'User registered; verification e‑mail sent.',
			userId: user.user_id,
		};
	}

	async forgotPassword(request: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
		const { email } = request;
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) return { success: false, message: 'Email not registered' };

		const resetToken = randomUUID();
		await prisma.passwordResetToken.create({
			data: {
				token: resetToken,
				User: { connect: { user_id: user.user_id } },
			},
		});

		await emailService.sendResetPasswordEmail(email, resetToken);

		// Remove resetToken in production
		return {
			success: true,
			message: 'Reset token generated',
			resetToken,
		};
	}

	async resetPassword(request: ResetPasswordRequest): Promise<ResetPasswordResponse> {
		const { token, newPassword } = request;
		const fourHoursAgo = new Date(Date.now() - 14_400_000);

		const rec = await prisma.passwordResetToken.findFirst({
			where: {
				token,
				reset_at: null,
				created_at: { gte: fourHoursAgo },
			},
		});
		if (!rec) return { success: false, message: 'Token invalid or expired' };

		const hashed = await bcrypt.hash(newPassword, 10);

		await prisma.$transaction([
			prisma.user.update({
				where: { user_id: rec.user_id },
				data: { password: hashed },
			}),
			prisma.passwordResetToken.update({
				where: { id: rec.id },
				data: { reset_at: new Date() },
			}),
		]);

		return { success: true, message: 'Password reset successful' };
	}

	async changePassword(request: ChangePasswordRequest): Promise<ChangePasswordResponse> {
		const { email, currentPassword: oldPassword, newPassword } = request;
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user?.password) {
			return { success: false, message: 'User not found locally' };
		}

		const valid = await bcrypt.compare(oldPassword, user.password);
		if (!valid) return { success: false, message: 'Old password incorrect' };

		const hashed = await bcrypt.hash(newPassword, 10);
		await prisma.user.update({
			where: { email },
			data: { password: hashed },
		});

		return { success: true, message: 'Password changed locally' };
	}

	/* ---------- local‑only utilities ---------- */

	async verifyUser(request: VerifyUserRequest): Promise<VerifyUserResponse> {
		const { token } = request;

		// verify via token
		if (!token) {
			return { success: false, message: 'Token required', statusCode: 400 };
		}

		const user = await prisma.user.findFirst({ where: { verification_token: token } });
		if (!user) {
			return { success: false, message: 'Invalid token', statusCode: 400 };
		}

		if (user.status === 'ACTIVE') {
			return { success: true, message: 'Already verified', statusCode: 200 };
		}

		if (user.token_expires_at && user.token_expires_at < new Date()) {
			return { success: false, message: 'Token expired', statusCode: 400 };
		}

		await prisma.user.update({
			where: { user_id: user.user_id },
			data: {
				status: 'ACTIVE',
				verification_token: null,
				token_expires_at: null,
			},
		});

		return { success: true, message: 'Email verified', statusCode: 200 };
	}
	async changeName(request: ChangeNameRequest): Promise<ChangePasswordResponse> {
		const { userId, payload } = request;
		const { firstName, lastName } = payload;
		if (!firstName && !lastName) return { success: false, message: 'Nothing to update' };

		await prisma.user.update({
			where: { user_id: userId },
			data: {
				...(firstName && { first_name: firstName }),
				...(lastName && { last_name: lastName }),
			},
		});

		return { success: true, message: 'Name updated locally' };
	}
}
