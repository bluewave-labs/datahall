import { NextRequest, NextResponse } from 'next/server';

import { authService, createErrorResponse, LinkService } from '@/services';

/**
 * DELETE /api/documents/[documentId]/links/[documentLinkId]
 * Removes a link if the user owns it.
 */
export async function DELETE(
	req: NextRequest,
	props: { params: Promise<{ documentLinkId: string }> },
) {
	try {
		const userId = await authService.authenticate();
		const { documentLinkId } = await props.params;
		const deleted = await LinkService.deleteLink(userId, documentLinkId);

		if (!deleted) {
			return createErrorResponse('Link not found or access denied.', 404);
		}

		return NextResponse.json({ message: 'Link deleted successfully.' }, { status: 200 });
	} catch (error) {
		return createErrorResponse('Server error while deleting link.', 500, error);
	}
}
