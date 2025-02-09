import { NextResponse, NextRequest } from 'next/server';
import prisma from '@lib/prisma';
import bcryptjs from 'bcryptjs';

export async function POST(req: NextResponse) {
	try {
		const { email, currentPassword, newPassword } = await req.json();
		const user = await prisma.user.findUnique({
			where: { email },
		});

		// Check if the user exists
		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		const isPasswordValid = await bcryptjs.compare(currentPassword, user.password);
		if (!isPasswordValid) {
			return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 });
		}
		const hashedPassword = await bcryptjs.hash(newPassword, 10);

		await prisma.user.update({
			where: { email },
			data: { password: hashedPassword },
		});

		return NextResponse.json({ message: 'Password updated successfully' }, { status: 200 });
	} catch (error) {
		console.error('Error updating password:', error);
		return NextResponse.json(
			{ error: 'An error occurred while updating the password' },
			{ status: 500 },
		);
	}
}
