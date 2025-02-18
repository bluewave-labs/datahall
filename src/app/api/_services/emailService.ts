import { Resend } from 'resend';
import BlueWaveWelcomeEmail from '@/app/auth/components/WelcomeEmail';
import { BluewaveResetPasswordEmail } from '@/app/auth/components/ForgotPasswordEmail';

const resendClient = new Resend(process.env.RESEND_API_KEY);

/**
 * Utilities for sending emails.
 * Uses the SEND_EMAILS environment variable to enable/disable sending.
 */
export const emailService = {
	/**
	 * Send a verification email if SEND_EMAILS === 'true'.
	 * Returns { success, error? }.
	 */
	async sendVerificationEmail({
		toEmail,
		username,
		verificationLink,
	}: {
		toEmail: string;
		username: string;
		verificationLink: string;
	}): Promise<{ success: boolean; error?: unknown }> {
		// Check if emailing is enabled
		if (process.env.SEND_EMAILS !== 'true') {
			console.log(`[emailService] Skipping verification email (SEND_EMAILS != 'true').`);
			return { success: true };
		}

		try {
			const fromAddress = process.env.EMAIL_FROM || 'Acme <onboarding@resend.dev>';
			const { error } = await resendClient.emails.send({
				from: fromAddress,
				to: [toEmail],
				subject: 'Verify Your Email',
				react: BlueWaveWelcomeEmail({ username, verificationLink }),
			});
			if (error) {
				return { success: false, error };
			}
			return { success: true };
		} catch (err) {
			return { success: false, error: err };
		}
	},

	/**
	 * Sends a password reset email if SEND_EMAILS === 'true'.
	 * Returns { success, error? }.
	 */
	async sendResetPasswordEmail({
		toEmail,
		username,
		resetUrl,
	}: {
		toEmail: string;
		username: string;
		resetUrl: string;
	}): Promise<{ success: boolean; error?: unknown }> {
		// Check if emailing is enabled
		if (process.env.SEND_EMAILS !== 'true') {
			console.log(`[emailService] Skipping reset password email (SEND_EMAILS != 'true').`);
			return { success: true };
		}

		try {
			const fromAddress = process.env.EMAIL_FROM || 'Acme <onboarding@resend.dev>';
			const { error } = await resendClient.emails.send({
				from: fromAddress,
				to: [toEmail],
				subject: 'Password Reset Request',
				react: BluewaveResetPasswordEmail({ username, resetUrl }),
			});
			if (error) {
				return { success: false, error };
			}
			return { success: true };
		} catch (err) {
			return { success: false, error: err };
		}
	},
};
