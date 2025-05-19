import { authService, createErrorResponse, LinkService } from '@/app/api/_services';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/documents/[documentId]/links/[linkId]/log
 * Lists visitors for a specific link within a document.
 */
export async function GET(
	req: NextRequest,
	props: { params: Promise<{ documentId: string; linkId: string }> },
) {
	try {
		const userId = await authService.authenticate();

		const { documentId, linkId } = await props.params;
		const linkVisitors = await LinkService.getDocumentLinkVisitors(userId, documentId, linkId);

		if (linkVisitors === null) {
			return NextResponse.json({ error: 'Link not found or access denied.' }, { status: 404 });
		}

		if (linkVisitors.length === 0) {
			return NextResponse.json({ data: [] }, { status: 200 });
		}

		const visitors = linkVisitors?.map((visitor) => {
			const firstName = visitor.firstName?.trim() || null;
			const lastName = visitor.lastName?.trim() || null;
			const fullName = firstName || lastName ? `${firstName || ''} ${lastName || ''}`.trim() : null;

			return {
				id: visitor.id,
				linkId: visitor.documentLinkId,
				name: fullName,
				email: visitor.email || null,
				visitedAt: visitor.visitedAt,
				visitorMetaData: visitor.visitorMetaData,
			};
		});

		return NextResponse.json({ data: visitors }, { status: 200 });
	} catch (error) {
		return createErrorResponse('Server error while fetching visitors.', 500, error);
	}
}
