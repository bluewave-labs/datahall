import { authenticate } from '@lib/middleware/authenticate';
import prisma from '@lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { documentId: string } }) {
	try {
		const userId = await authenticate(req);
		const { documentId } = params;

		// Ensure doc belongs to user
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

		// Gather all linkIds
		const linkIds = doc.Link.map((l) => l.linkId);
		if (linkIds.length === 0) {
			// No links => no visitors
			return NextResponse.json({ visitors: [] }, { status: 200 });
		}

		// Query LinkVisitors for all those linkIds
		const linkVisitors = await prisma.linkVisitors.findMany({
			where: {
				linkId: { in: linkIds },
			},
			orderBy: { updatedAt: 'desc' },
		});

		const visitors = linkVisitors.map((visitor) => ({
			id: visitor.id,
			documentId: doc.document_id,
			name: `${visitor.first_name} ${visitor.last_name}`.trim(),
			email: visitor.email,
			lastActivity: visitor.updatedAt,
			// These are placeholders for now
			downloads: 0,
			duration: 0,
			completion: 0,
		}));

		return NextResponse.json({ visitors }, { status: 200 });
	} catch (error) {
		return createErrorResponse('Server error.', 500, error);
	}
}

function createErrorResponse(message: string, status: number, details?: any) {
	console.error(`[${new Date().toISOString()}] ${message}`, details);
	return NextResponse.json({ error: message, details }, { status });
}
