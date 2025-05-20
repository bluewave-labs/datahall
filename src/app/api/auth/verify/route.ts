import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/services';

/** GET /api/auth/verify?token=abc */
export async function GET(req: NextRequest) {
	if (!authService.verifyUser) {
		/* Auth0 mode: this endpoint is unused */
		return NextResponse.json({ message: 'Not found' }, { status: 404 });
	}

	const token = new URL(req.url).searchParams.get('token') ?? undefined;
	const result = await authService.verifyUser({ token });

	const redirectUrl = new URL(`${process.env.NEXT_PUBLIC_APP_URL}/auth/sign-in`);

	if (result.success) {
		redirectUrl.searchParams.set('verified', 'true');
	} else {
		redirectUrl.searchParams.set('error', result.message);
	}

	return NextResponse.redirect(redirectUrl, 302);
}
