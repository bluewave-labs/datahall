// src/app/api/auth/password/reset/route.ts
import { authService } from '@/app/api/_services/authService';
import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/auth/password/reset
 * Expects: { token, password }
 */
export async function POST(req: NextRequest) {
	try {
		const { token, password } = await req.json();
		if (!token || !password) {
			return NextResponse.json(
				{ message: 'Token and new password are required.' },
				{ status: 400 },
			);
		}

		const result = await authService.resetUserPassword(token, password);
		if (!result.success) {
			return NextResponse.json({ message: result.message }, { status: 400 });
		}

		return NextResponse.json({ message: result.message }, { status: 200 });
	} catch (error) {
		console.error('[reset] Error updating password:', error);
		return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
	}
}
