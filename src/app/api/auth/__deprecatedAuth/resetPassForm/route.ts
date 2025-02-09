import { NextRequest, NextResponse } from 'next/server';
import prisma from '@lib/prisma';
import { hash } from 'bcryptjs';

export async function POST(req: NextRequest) {
	try {
		const { token, password } = await req.json();

		if (!token || !password) {
			return NextResponse.json(
				{ message: 'Token and new password are required.' },
				{ status: 400 },
			);
		}

		// 1) Check if the token is valid, not used, and not older than X hours
		//    We'll assume a 4-hour validity for example:
		const fourHoursAgo = new Date(Date.now() - 4 * 60 * 60 * 1000);

		// The token table might track created_at, reset_at, etc.
		const passToken = await prisma.passwordResetToken.findFirst({
			where: {
				token,
				reset_at: null, // not used yet
				created_at: { gte: fourHoursAgo }, // created within last 4h
			},
		});

		if (!passToken) {
			return NextResponse.json({ message: 'Token not valid or expired.' }, { status: 400 });
		}

		// 2) Encrypt the new password
		const encrypted = await hash(password, 10);

		// 3) Update the user's password + mark token as used
		//    We'll do a transaction for atomicity.
		const updateUser = prisma.user.update({
			where: { user_id: passToken.user_id },
			data: { password: encrypted },
		});

		const updateToken = prisma.passwordResetToken.update({
			where: { id: passToken.id },
			data: { reset_at: new Date() },
		});

		await prisma.$transaction([updateUser, updateToken]);

		return NextResponse.json({ message: 'Password updated successfully.' }, { status: 200 });
	} catch (error) {
		console.error('Error updating password:', error);
		return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
	}
}
