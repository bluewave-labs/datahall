import { authenticate } from '@lib/middleware/authenticate';
import prisma from '@lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { deleteFile } from '@/services/storageService';

export async function GET(req: NextRequest, { params }: { params: { documentId: string } }) {
	try {
		// Verify the user is logged in
		const userId = await authenticate(req);
		const { documentId } = params;

		// Query the database for this document, ensuring it belongs to user
		const doc = await prisma.document.findFirst({
			where: { document_id: documentId, user_id: userId },
			select: {
				id: true,
				document_id: true,
				fileName: true,
				filePath: true,
				fileType: true,
				size: true,
				createdAt: true,
				updatedAt: true,
				User: {
					select: {
						first_name: true,
						last_name: true,
					},
				},
			},
		});

		// If not found or unauthorized
		if (!doc) {
			return NextResponse.json(
				{ error: 'Document not found or you do not have access.' },
				{ status: 404 },
			);
		}

		// Construct the response
		const responsePayload = {
			...doc,
			uploader: {
				name: `${doc.User.first_name} ${doc.User.last_name}`,
				avatar: null, // Add avatar URL here
			},
			links: 0, // placeholder
			viewers: 0, // placeholder
			views: 0, // placeholder
		};

		return NextResponse.json({ document: responsePayload }, { status: 200 });
	} catch (error) {
		return createErrorResponse('Server error.', 500, error);
	}
}

// Utility for error handling
function createErrorResponse(message: string, status: number, details?: any) {
	console.error(`[${new Date().toISOString()}] ${message}`, details);
	return NextResponse.json({ error: message, details }, { status });
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { documentId: string } },
): Promise<NextResponse> {
	try {
		const userId = await authenticate(req);
		const documentId = params.documentId;

		if (!documentId) {
			return createErrorResponse('Document ID is required.', 400);
		}

		const document = await prisma.document.findUnique({
			where: { document_id: documentId },
		});

		if (!document || document.user_id !== userId) {
			return createErrorResponse('Document not found or access denied.', 404);
		}

		const deletedFile = await prisma.document.delete({
			where: { document_id: documentId },
		});

		await deleteFileFromStorage(deletedFile.filePath);

		return NextResponse.json({ message: 'Document deleted successfully.' }, { status: 200 });
	} catch (error) {
		return createErrorResponse('Server error.', 500, error);
	}
}

async function deleteFileFromStorage(filePath: string) {
	try {
		await deleteFile(filePath);
	} catch (error) {
		throw error;
	}
}
