import prisma from '@/lib/prisma';
import { AnalyticsEventType } from '@prisma/client';

export const analyticsService = {
	getDocumentAnalytics: async ({ documentId }: { documentId: string }) => {
		const analytics = await prisma.documentAnalytics.findMany({
			where: { documentId },
			orderBy: { timestamp: 'desc' },
		});

		const { totalViews, totalDownloads } = analytics.reduce(
			(acc, analytic) => {
				if (analytic.eventType === 'VIEW') acc.totalViews += 1;
				else if (analytic.eventType === 'DOWNLOAD') acc.totalDownloads += 1;

				return acc;
			},
			{ totalViews: 0, totalDownloads: 0 },
		);

		const links = await prisma.documentLink.findMany({
			where: { documentId },
		});

		const lastVisitedRecord = await prisma.documentLinkVisitor.findFirst({
			where: {
				documentLink: {
					documentId,
				},
			},
			orderBy: { visitedAt: 'desc' },
			select: { visitedAt: true },
		});

		return {
			totalViews,
			totalDownloads,
			lastVisited: lastVisitedRecord?.visitedAt ?? null,
			links,
		};
	},
	getDocumentAnalyticsForLink: async ({
		documentId,
		linkId,
	}: {
		documentId: string;
		linkId: string;
	}) => {
		return await prisma.documentAnalytics.findMany({
			where: {
				documentId: documentId,
				documentLinkId: linkId,
			},
		});
	},
	logEventForAnalytics: async ({
		documentId,
		documentLinkId,
		visitorId,
		eventType,
		meta,
	}: {
		documentId: string;
		documentLinkId: string;
		visitorId?: number;
		eventType: AnalyticsEventType;
		meta: any;
	}) => {
		try {
			const analytics = await prisma.documentAnalytics.create({
				data: {
					documentId,
					documentLinkId,
					visitorId,
					eventType,
					meta,
				},
			});

			return analytics;
		} catch (error) {
			console.error('Error logging analytics event:', error);
			throw new Error('Failed to log analytics event');
		}
	},
};
