import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/app/api/_services/authService';

/**
 * GET /api/auth/verify?token=... or userId=...
 */
export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const token = searchParams.get('token') || undefined;
		const userId = searchParams.get('userId') || undefined;

		const result = await authService.verifyUser(token, userId);

		return NextResponse.json({ message: result.message }, { status: result.statusCode });
	} catch (err) {
		console.error('[verify] Error verifying email:', err);
		return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
	}
}
