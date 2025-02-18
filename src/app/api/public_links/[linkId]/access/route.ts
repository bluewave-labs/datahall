import { NextRequest, NextResponse } from 'next/server';

import { createErrorResponse, LinkService } from '@/app/api/_services';

/**
 * POST /api/public_links/[linkId]/access
 */
export async function POST(req: NextRequest, { params }: { params: { linkId: string } }) {
	try {
		const { linkId } = params;
		const { first_name, last_name, email, password } = await req.json();

		// 1) Retrieve link
		const link = await LinkService.getPublicLink(linkId);
		if (!link) {
			return createErrorResponse('Link not found', 404);
		}

		// 2) Check expiration
		if (link.expirationTime && new Date(link.expirationTime) <= new Date()) {
			return createErrorResponse('Link is expired', 410);
		}

		// 3) If password is required, verify
		const passwordOk = await LinkService.verifyLinkPassword(link, password);
		if (!passwordOk) {
			return createErrorResponse('Invalid password', 401);
		}

		// 4) Log visitor.
		await LinkService.logVisitor(linkId, first_name, last_name, email);

		// 5) Get a signed URL for the doc
		try {
			const { fileName, signedUrl, size } = await LinkService.getSignedFileFromLink(linkId);
			return NextResponse.json({
				message: 'File access granted',
				data: { signedUrl, fileName, size },
			});
		} catch (err) {
			return createErrorResponse('Error retrieving file', 400, err);
		}
	} catch (error) {
		return createErrorResponse('Server error while accessing link', 500, error);
	}
}
