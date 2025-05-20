import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { authService } from '@/services';
import { ChangePasswordSchema } from '@/shared/validation/profileSchemas';

export async function PATCH(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.email) {
			return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
		}

		const body = await req.json();
		const parse = ChangePasswordSchema.safeParse(body);

		if (!parse.success) {
			return NextResponse.json(
				{ message: 'Invalid input', errors: parse.error.format() },
				{ status: 400 },
			);
		}

		const { currentPassword, newPassword } = parse.data;
		const result = await authService.changePassword({
			email: session.user.email,
			currentPassword,
			newPassword,
		});

		if (!result.success) {
			return NextResponse.json({ message: result.message }, { status: 400 });
		}

		return NextResponse.json({ message: result.message }, { status: 200 });
	} catch (err) {
		console.error('[PATCH /api/profile/password]', err);
		return NextResponse.json({ message: 'Server error' }, { status: 500 });
	}
}
