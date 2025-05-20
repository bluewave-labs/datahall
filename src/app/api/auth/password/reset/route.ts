import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/services';
import { ResetPasswordSchema } from '@/shared/validation/authSchemas';

/** POST /api/auth/password/reset  { token, newPassword } */
export async function POST(req: NextRequest) {
	if (!authService.resetPassword) {
		return NextResponse.json({ message: 'Not found' }, { status: 404 });
	}

	try {
		const body = await req.json();
		const parsed = ResetPasswordSchema.parse(body);

		const { token, newPassword } = parsed;

		const result = await authService.resetPassword({ token, newPassword });

		if (!result.success) {
			return NextResponse.json({ message: result.message }, { status: 400 });
		}

		return NextResponse.json({ message: result.message }, { status: 200 });
	} catch (err: any) {
		/* ZodError → 422 (Unprocessable Entity) ------- */
		if (err?.issues) {
			return NextResponse.json(
				{ message: err.issues[0]?.message ?? 'Invalid payload' },
				{ status: 422 },
			);
		}

		console.error('[reset]', err);
		return NextResponse.json({ message: 'Server error' }, { status: 500 });
	}
}
