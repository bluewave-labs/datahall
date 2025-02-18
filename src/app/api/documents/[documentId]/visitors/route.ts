import { authService, DocumentService, createErrorResponse } from '@/app/api/_services';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/documents/[documentId]/visitors
 * Lists visitors across all links for a doc.
 */
export async function GET(req: NextRequest, { params }: { params: { documentId: string } }) {
	try {
		const userId = await authService.authenticate(req);
		const linkVisitors = await DocumentService.getDocumentVisitors(userId, params.documentId);
		if (linkVisitors === null) {
			return createErrorResponse('Document not found or access denied.', 404);
		}

		if (linkVisitors.length === 0) {
			return NextResponse.json({ visitors: [] }, { status: 200 });
		}

		const visitors = linkVisitors.map((visitor) => ({
			id: visitor.id,
			documentId: params.documentId,
			name: `${visitor.first_name} ${visitor.last_name}`.trim(),
			email: visitor.email,
			lastActivity: visitor.updatedAt,
			downloads: 0,
			duration: 0,
			completion: 0,
		}));

		return NextResponse.json({ visitors }, { status: 200 });
	} catch (error) {
		return createErrorResponse('Server error while fetching visitors.', 500, error);
	}
}
