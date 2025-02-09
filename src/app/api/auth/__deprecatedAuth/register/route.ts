import prisma from '@lib/prisma';
import bcryptjs from 'bcryptjs';
import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import BlueWaveWelcomeEmail from '../../../auth/components/WelcomeEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
	try {
		const { email, password, firstName, lastName, role } = await req.json();

		// 1) Check if user exists
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});
		if (existingUser) {
			return NextResponse.json(
				{ message: 'User with this email already exists.' },
				{ status: 409 },
			);
		}

		// 2) Hash password, generate verification token
		const hashedPassword = await bcryptjs.hash(password, 10);
		const verificationToken = randomUUID();

		// 3) Create user with "UNVERIFIED" status
		const user = await prisma.user.create({
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

		// 4) Attempt to send verification email
		const { data, error } = await resend.emails.send({
			from: 'Acme <onboarding@resend.dev>',
			to: [user.email],
			subject: 'Verify Your Email',
			react: BlueWaveWelcomeEmail({
				username: user.first_name,
				verificationLink: `localhost:3000/auth/account-created/?token=${verificationToken}`,
			}),
		});

		if (error) {
			// Partial success: user is created, but email fails
			console.error('Email sending failed:', error);
			return NextResponse.json(
				{
					success: true,
					emailFail: true, // flag for partial success
					userId: user.user_id, // so we can poll by userId if needed
					message: 'User created, but verification email failed. Please contact admin.',
				},
				{ status: 200 },
			);
		}

		// 5) Full success
		return NextResponse.json(
			{
				success: true,
				message: 'Verification email sent. Please check your inbox.',
				token: verificationToken, // might as well return if you want to poll by token
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error('Error creating user:', error);
		return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
	}
}
