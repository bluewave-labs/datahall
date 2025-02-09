import { authenticate } from '@lib/middleware/authenticate';
import prisma from '@lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { documentId: string } }) {
	try {
		const userId = await authenticate(req);
		const { documentId } = params;

		// Verify doc ownership
		const doc = await prisma.document.findFirst({
			where: { document_id: documentId, user_id: userId },
			include: { Link: true },
		});

		if (!doc) {
			return NextResponse.json(
				{ error: 'Document not found or you do not have access.' },
				{ status: 404 },
			);
		}

		// Map the DB fields to the shape needed by InfoTable -> LinkDetail

		const links = doc.Link.map((link) => ({
			id: link.id,
			documentId: doc.document_id,
			linkId: link.linkId,
			friendlyName: link.friendlyName,
			createdLink: link.linkUrl,
			lastViewed: link.updatedAt,
			linkViews: 0, // Placeholder
		}));

		return NextResponse.json({ links }, { status: 200 });
	} catch (error) {
		return createErrorResponse('Server error.', 500, error);
	}
}

function createErrorResponse(message: string, status: number, details?: any) {
	console.error(`[${new Date().toISOString()}] ${message}`, details);
	return NextResponse.json({ error: message, details }, { status });
}
