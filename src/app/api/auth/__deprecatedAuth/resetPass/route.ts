import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { randomUUID } from 'crypto';
import prisma from '@lib/prisma';
import { BluewaveResetPasswordEmail } from '../../../auth/components/ForgotPasswordEmail';

const resend = new Resend(process.env.RESEND_API_KEY);
const DOMAIN = process.env.DOMAIN || 'localhost:3000';
const PROTOCOL = process.env.NODE_ENV === 'production' ? 'https' : 'http';

export async function POST(req: NextRequest) {
	try {
		const { email } = await req.json();

		if (!email || typeof email !== 'string') {
			return NextResponse.json({ message: 'Email is required.' }, { status: 400 });
		}

		// 1) Check if user exists
		const user = await prisma.user.findUnique({
			where: { email },
		});
		if (!user) {
			return NextResponse.json({ message: 'Email is not registered' }, { status: 400 });
		}

		// 2) Generate token and store in DB
		const generatedToken = randomUUID();
		await prisma.passwordResetToken.create({
			data: {
				token: generatedToken,
				User: { connect: { user_id: user.user_id } },
			},
		});

		// 3) Build the reset URL
		const resetPasswordUrl = `${PROTOCOL}://${DOMAIN}/auth/reset-password?token=${generatedToken}&email=${encodeURIComponent(
			user.email,
		)}`;

		// 4) In production, send an email. In dev, skip or console.log
		if (process.env.SEND_EMAILS === 'true') {
			const { error } = await resend.emails.send({
				from: 'Acme <onboarding@resend.dev>',
				to: [user.email],
				subject: 'Password Reset Request',
				react: BluewaveResetPasswordEmail({
					username: user.first_name,
					resetUrl: resetPasswordUrl,
				}),
			});

			if (error) {
				console.error('Error sending email:', error);
				return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
			}

			console.log(`Password reset email sent to ${user.email}`);
		} else {
			// In dev, skip actual email sending
			console.log(`Password reset email would be sent to ${user.email}, but emailing is disabled.`);
		}

		if (process.env.NODE_ENV === 'development' || process.env.SEND_EMAILS !== 'true') {
			// Return or log the reset URL for dev
			return NextResponse.json(
				{
					message: 'Mail sent (or link returned in development)',
					url: resetPasswordUrl,
				},
				{ status: 201 },
			);
		} else {
			// Production: do NOT expose the URL, just say “email sent”
			return NextResponse.json(
				{
					message: 'Mail sent. Please check your inbox.',
				},
				{ status: 201 },
			);
		}
	} catch (err) {
		console.error('Error in resetPass route:', err);
		return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
	}
}
