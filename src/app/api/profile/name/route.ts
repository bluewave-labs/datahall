import { NextRequest, NextResponse } from 'next/server';
import { ChangeNameSchema } from '@/shared/validation/profileSchemas';
import { authService } from '@/services';

export async function PATCH(req: NextRequest) {
	try {
		const userId = await authService.authenticate();
		const body = await req.json();
		const parse = ChangeNameSchema.safeParse(body);

		if (!parse.success) {
			return NextResponse.json(
				{ message: 'Invalid input', errors: parse.error.format() },
				{ status: 400 },
			);
		}

		const { firstName, lastName } = parse.data;

		const result = await authService.changeName({ userId, payload: { firstName, lastName } });

		console.log('🚀 ~ PATCH ~ result:', result);

		return NextResponse.json({ message: result.message }, { status: result.success ? 200 : 400 });
	} catch (err) {
		console.error('[PATCH /api/profile/name]', err);
		return NextResponse.json({ message: 'Server error' }, { status: 500 });
	}
}
