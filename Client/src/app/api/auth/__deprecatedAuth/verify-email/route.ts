import { NextRequest, NextResponse } from 'next/server';
import prisma from '@lib/prisma';

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const token = searchParams.get('token');
		const userId = searchParams.get('userId');

		if (!token && !userId) {
			return NextResponse.json(
				{ message: 'Verification token or userId missing' },
				{ status: 400 },
			);
		}

		// 1) If we have a token, verify by token
		if (token) {
			const user = await prisma.user.findFirst({
				where: { verification_token: token },
			});
			if (!user) {
				return NextResponse.json({ message: 'Invalid token' }, { status: 400 });
			}
			if (user.token_expires_at < new Date()) {
				return NextResponse.json({ message: 'Expired token' }, { status: 400 });
			}
			if (user.status === 'ACTIVE') {
				return NextResponse.json({ message: 'User is already verified' }, { status: 200 });
			}

			// Mark user verified
			await prisma.user.update({
				where: { email: user.email },
				data: {
					status: 'ACTIVE',
					verification_token: undefined,
					token_expires_at: undefined,
				},
			});

			return NextResponse.json({ message: 'Email verified successfully!' }, { status: 200 });
		}

		// 2) If we have userId, verify by userId
		if (userId) {
			const user = await prisma.user.findUnique({
				where: { user_id: userId },
			});
			if (!user) {
				return NextResponse.json({ message: 'User not found' }, { status: 404 });
			}
			if (user.status === 'ACTIVE') {
				return NextResponse.json({ message: 'User is already verified' }, { status: 200 });
			}
			// Not verified yet
			return NextResponse.json(
				{ message: 'User is not verified', status: user.status },
				{ status: 400 },
			);
		}

		// If something unexpected happens
		return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
	} catch (err) {
		console.error('Error verifying email:', err);
		return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
	}
}
