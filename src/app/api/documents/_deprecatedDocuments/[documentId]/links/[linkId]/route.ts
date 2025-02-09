import { authenticate } from '@lib/middleware/authenticate';
import prisma from '@lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: { linkId: string } }) {
	try {
		const userId = await authenticate(req);
		const { linkId } = params;

		// Verify doc ownership + link existence
		const link = await prisma.link.findFirst({
			where: {
				linkId: linkId,
				userId: userId,
			},
		});

		if (!link) {
			return NextResponse.json(
				{ error: 'Link not found or you do not have access.' },
				{ status: 404 },
			);
		}

		// Delete the link
		await prisma.link.delete({
			where: { linkId: link.linkId },
		});

		return NextResponse.json({ message: 'Link deleted successfully.' }, { status: 200 });
	} catch (error) {
		return createErrorResponse('Server error.', 500, error);
	}
}

function createErrorResponse(message: string, status: number, details?: any) {
	console.error(`[${new Date().toISOString()}] ${message}`, details);
	return NextResponse.json({ error: message, details }, { status });
}
