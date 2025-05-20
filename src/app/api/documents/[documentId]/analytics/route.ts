import { NextRequest, NextResponse } from 'next/server';
import { authService, analyticsService, createErrorResponse } from '@/app/api/_services';

/**
 * GET /api/documents/[documentId]/analytics
 * Returns analytics for a single doc.
 */
export async function GET(req: NextRequest, props: { params: Promise<{ documentId: string }> }) {
	try {
		const { documentId } = await props.params;

		const userId = authService.authenticate();

		const analytics = await analyticsService.getDocumentAnalytics({ documentId });

		return NextResponse.json({ analytics }, { status: 200 });
	} catch (error) {
		return createErrorResponse('Server error while fetching analytics.', 500, error);
	}
}
