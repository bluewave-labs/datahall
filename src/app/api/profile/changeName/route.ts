import { NextResponse, NextRequest } from 'next/server';
import prisma from '@lib/prisma';

export async function POST(req: NextRequest) {
	try {
		const { email, firstName, lastName } = await req.json();

		// Check if the user exists
		const user = await prisma.user.findUnique({ where: { email } });

		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		const updateData: { first_name?: string; last_name?: string } = {};
		if (firstName) {
			updateData.first_name = firstName;
			updateData.last_name = lastName;
		}

		if (Object.keys(updateData).length > 0) {
			await prisma.user.update({
				where: { email },
				data: { first_name: firstName, last_name: lastName },
			});
		}

		return NextResponse.json({ message: 'Name changed successfully' }, { status: 200 });
	} catch (error) {
		console.error('Error updating name', error);
		return NextResponse.json(
			{ error: 'An error occurred while updating the name' },
			{ status: 500 },
		);
	}
}
