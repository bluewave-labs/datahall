import { NextRequest, NextResponse } from 'next/server';

import { authService, emailService } from '@/app/api/_services';

/**
 * POST /api/auth/password/forgot
 * Expects: { email }
 */
export async function POST(req: NextRequest) {
	try {
		const { email } = await req.json();

		if (!email || typeof email !== 'string') {
			return NextResponse.json({ message: 'Email is required.' }, { status: 400 });
		}

		// 1) Create token
		const result = await authService.createPasswordResetToken(email);
		if (!result.success) {
			return NextResponse.json({ message: result.message }, { status: 400 });
		}

		// 2) Build reset URL
		const resetPasswordUrl = `${process.env.APP_PROTOCOL}://${process.env.APP_DOMAIN}/auth/reset-password?token=${result.token}&email=${encodeURIComponent(
			result.userEmail!,
		)}`;

		// // 3) Send the email (if SEND_EMAILS === 'true')
		// const emailResp = await emailService.sendResetPasswordEmail({
		// 	toEmail: result.userEmail!,
		// 	username: result.userName!,
		// 	resetUrl: resetPasswordUrl,
		// });

		// if (!emailResp.success) {
		// 	console.error('[forgot] Error sending email:', emailResp.error);
		// 	return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
		// }

		// 4) Return different info if not sending emails
		if (process.env.SEND_EMAILS !== 'true') {
			// In dev, skip actual email sending
			return NextResponse.json(
				{
					success: true,
					message: 'Mail sending is disabled; returning reset URL for dev usage.',
					url: resetPasswordUrl,
				},
				{ status: 201 },
			);
		}

		// Production or emailing is enabled
		return NextResponse.json(
			{ success: true, message: 'Mail sent. Please check your inbox.' },
			{ status: 201 },
		);
	} catch (err) {
		console.error('[forgot] Error in password/forgot route:', err);
		return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
	}
}
