import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/services';

/** POST /api/auth/register */
export async function POST(req: NextRequest) {
	try {
		const body = (await req.json()) ?? {};
		const { email, password, firstName, lastName } = body;

		if (!email || !password || !firstName || !lastName) {
			return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
		}

		const result = await authService.signUp({ email, password, firstName, lastName });
		if (!result.success) {
			return NextResponse.json({ message: result.message }, { status: 409 });
		}

		return NextResponse.json({ message: result.message }, { status: 201 });
	} catch (err) {
		console.error('[register]', err);
		return NextResponse.json({ message: 'Server error' }, { status: 500 });
	}
}
