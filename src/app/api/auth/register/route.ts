import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/app/api/_services/authService';
// import { emailService } from '../../_services/emailService';

export async function POST(req: NextRequest) {
	try {
		const { email, password, firstName, lastName, role } = await req.json();

		const result = await authService.registerUser({
			email,
			password,
			firstName,
			lastName,
			role,
		});

		if (!result.success) {
			return NextResponse.json({ message: result.message }, { status: 409 });
		}

		// Attempt to send verification email
		const verificationLink = `${process.env.APP_PROTOCOL}://${process.env.APP_DOMAIN}/auth/account-created/?token=${result.verificationToken}`;

		// const emailResp = await emailService.sendVerificationEmail({
		// 	toEmail: email,
		// 	username: firstName,
		// 	verificationLink,
		// });

		// if (!emailResp.success) {
		// 	// Partial success: user was created but email sending failed
		// 	console.error('[register] Email sending failed:', emailResp.error);
		// 	return NextResponse.json(
		// 		{
		// 			success: true,
		// 			emailFail: true,
		// 			userId: result.userId,
		// 			message: 'User created, but verification email failed. Please contact admin.',
		// 		},
		// 		{ status: 200 },
		// 	);
		// }

		// Full success
		return NextResponse.json(
			{
				success: true,
				message: 'Verification email sent. Please check your inbox.',
				token: result.verificationToken,
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error('[register] Error creating user:', error);
		return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
	}
}
