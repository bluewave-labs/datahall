import { NextRequest, NextResponse } from 'next/server';
import { analyticsService, createErrorResponse } from '@/app/api/_services';

/**
 * GET /api/documents/[documentId]/links/[linkId]/analytics
 * Returns analytics for a single doc for a specific link.
 */
export async function GET(
	req: NextRequest,
	props: { params: Promise<{ documentId: string; linkId: string }> },
) {
	try {
		const { documentId, linkId } = await props.params;

		const analytics = analyticsService.getDocumentAnalyticsForLink({
			documentId,
			linkId,
		});

		return NextResponse.json({ analytics }, { status: 200 });
	} catch (error) {
		return createErrorResponse('Server error while fetching analytics for link.', 500, error);
	}
}

export async function POST(
	req: NextRequest,
	props: { params: Promise<{ documentId: string; linkId: string }> },
) {
	try {
		// const userId = await authService.authenticate();
		const { documentId, linkId } = await props.params;
		const body = await req.json();
		const { eventType, visitorId, meta } = body;

		const analytics = await analyticsService.logEventForAnalytics({
			documentId,
			documentLinkId: linkId,
			eventType,
			visitorId,
			meta,
		});

		return NextResponse.json({ analytics }, { status: 200 });
	} catch (error) {
		return createErrorResponse('Server error while fetching document.', 500, error);
	}
}
