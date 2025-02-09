import { authenticate } from '@lib/middleware/authenticate';
import prisma from '@lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		const userId = await authenticate(req);

		// Query all documents owned by this user + join on Link + LinkVisitors
		const documents = await prisma.document.findMany({
			where: { user_id: userId },
			include: {
				User: {
					select: {
						first_name: true,
						last_name: true,
					},
				},
				Link: {
					include: {
						LinkVisitors: true,
					},
				},
			},
			orderBy: { createdAt: 'desc' },
		});

		// Map DB records
		const result = documents.map((doc) => {
			// Count how many links exist
			const linkCount = doc.Link.length;

			// Sum up all visitors across all links
			const visitorCount = doc.Link.reduce((acc, link) => {
				return acc + link.LinkVisitors.length;
			}, 0);

			// Optionally, define "views" if you have a real method to track them;
			// we'll keep it as 0 or do a sum of linkViews
			const totalViews = 0;

			const createdLinks = doc.Link.map((lnk) => ({
				linkId: lnk.linkId,
				createdLink: lnk.linkUrl,
				lastViewed: lnk.updatedAt,
				linkViews: 0,
			}));

			return {
				document_id: doc.document_id,
				fileName: doc.fileName,
				filePath: doc.filePath,
				fileType: doc.fileType,
				size: doc.size,
				createdAt: doc.createdAt.toISOString(),
				updatedAt: doc.updatedAt.toISOString(),
				uploader: {
					name: `${doc.User.first_name} ${doc.User.last_name}`,
					avatar: null, // Add avatar URL here
				},
				// The aggregated fields
				links: linkCount,
				viewers: visitorCount,
				views: totalViews,
				createdLinks,
			};
		});

		return NextResponse.json({ documents: result }, { status: 200 });
	} catch (error) {
		return createErrorResponse('Server error.', 500, error);
	}
}

function createErrorResponse(message: string, status: number, details?: any) {
	console.error(`[${new Date().toISOString()}] ${message}`, details);
	return NextResponse.json({ error: message, details }, { status });
}
