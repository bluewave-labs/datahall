import { authService, createErrorResponse, LinkService } from '@/app/api/_services';
import { NextRequest, NextResponse } from 'next/server';

/**
 * DELETE /api/documents/[documentId]/links/[linkId]
 * Removes a link if the user owns it.
 */
export async function DELETE(req: NextRequest, { params }: { params: { linkId: string } }) {
	try {
		const userId = await authService.authenticate(req);
		const deleted = await LinkService.deleteLink(userId, params.linkId);
		if (!deleted) {
			return createErrorResponse('Link not found or access denied.', 404);
		}

		return NextResponse.json({ message: 'Link deleted successfully.' }, { status: 200 });
	} catch (error) {
		return createErrorResponse('Server error while deleting link.', 500, error);
	}
}
