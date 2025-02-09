import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';

export async function authenticate(req: NextRequest) {
	const session = await getServerSession(authOptions);
	if (!session || !session.user?.userId) {
		throw new Error('Unauthorized: User must be signed in.');
	}
	return session.user.userId;
}
