import { NextRequest, NextResponse } from 'next/server';

import { authService } from '@/services';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
	try {
		// Authenticate the user
		const userId = await authService.authenticate();

		// Get the user’s info from the database
		const user = await prisma.user.findUnique({
			where: { user_id: userId },
			select: {
				email: true,
				first_name: true,
				last_name: true,
			},
		});

		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		// Return the user’s info
		return NextResponse.json(
			{
				email: user.email,
				firstName: user.first_name,
				lastName: user.last_name,
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error('Error fetching user info:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
