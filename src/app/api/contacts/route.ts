import prisma from '@lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@lib/middleware/authenticate';

export async function GET(req: NextRequest): Promise<NextResponse> {
	try {
		const userId = await authenticate(req);

		const userLinks = await prisma.link.findMany({
			where: { userId },
			select: { linkId: true },
		});
		if (!userLinks.length) {
			return NextResponse.json({ data: [] }, { status: 200 });
		}

		const linkIds = userLinks.map((l) => l.linkId);

		const visitors = await prisma.linkVisitors.groupBy({
			by: ['email'],
			where: {
				linkId: { in: linkIds },
			},
			_count: {
				email: true,
			},
			_max: {
				updatedAt: true,
			},
		});

		const visitorDetails = await Promise.all(
			visitors.map(async (visitor) => {
				const lastVisit = await prisma.linkVisitors.findFirst({
					where: {
						email: visitor.email,
						linkId: { in: linkIds },
					},
					orderBy: { updatedAt: 'desc' },
					include: {
						Link: true,
					},
				});

				if (!lastVisit) {
					return null;
				}

				const firstName = lastVisit.first_name?.trim() || null;
				const lastName = lastVisit.last_name?.trim() || null;
				const fullName =
					firstName || lastName ? `${firstName || ''} ${lastName || ''}`.trim() : null;

				return {
					id: lastVisit.id,
					name: fullName,
					email: visitor.email || null,
					lastViewedLink: lastVisit.Link?.friendlyName || lastVisit.Link?.linkUrl || null,
					lastActivity: lastVisit.updatedAt || null,
					totalVisits: visitor._count.email || 0,
				};
			}),
		);

		const contacts = visitorDetails.filter(Boolean);

		return NextResponse.json({ data: contacts }, { status: 200 });
	} catch (error) {
		return createErrorResponse('Server error.', 500, error);
	}
}

function createErrorResponse(message: string, status: number, details?: any) {
	console.error(`[${new Date().toISOString()}] ${message}`, details);
	return NextResponse.json({ error: message, details }, { status });
}
