import { NextRequest, NextResponse } from 'next/server';
import { LinkService, createErrorResponse } from '@/app/api/_services';

/**
 * GET /api/public_links/[linkId]
 */
export async function GET(req: NextRequest, { params }: { params: { linkId: string } }) {
	try {
		const linkId = params.linkId;
		if (!linkId) {
			return createErrorResponse('Link ID is required.', 400);
		}

		const link = await LinkService.getPublicLink(linkId);
		console.log('🚀 ~ GET ~ link:', link);
		console.log('Link ID:', linkId);
		if (!link) {
			console.log(`Link not found: ${linkId}`);
			return NextResponse.json({ message: 'Link not found' }, { status: 404 });
		}

		// Check expiration
		if (link.expirationTime && new Date(link.expirationTime) <= new Date()) {
			return NextResponse.json({ message: 'Link is expired' }, { status: 410 });
		}

		// If link is public, we see if it requires user details or password
		const isPasswordProtected = !!link.password;
		const needsUserDetails = !!link.requiredUserDetailsOption;

		return NextResponse.json(
			{
				message: 'Link is valid',
				data: {
					isPasswordProtected,
					needsUserDetails,
				},
			},
			{ status: 200 },
		);
	} catch (error) {
		return createErrorResponse('Server error while fetching link.', 500, error);
	}
}
