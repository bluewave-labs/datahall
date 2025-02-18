import { NextRequest, NextResponse } from 'next/server';
import { authService, DocumentService, createErrorResponse } from '../../_services';

/**
 * GET /api/documents/[documentId]
 * Returns metadata for a single doc (ownership enforced).
 */
export async function GET(req: NextRequest, { params }: { params: { documentId: string } }) {
	try {
		const userId = await authService.authenticate(req);
		const doc = await DocumentService.getDocumentById(userId, params.documentId);
		if (!doc) {
			return createErrorResponse('Document not found or access denied.', 404);
		}

		const responsePayload = {
			...doc,
			uploader: {
				name: `${doc.User.first_name} ${doc.User.last_name}`,
				avatar: null,
			},
			links: 0,
			viewers: 0,
			views: 0,
		};

		return NextResponse.json({ document: responsePayload }, { status: 200 });
	} catch (error) {
		return createErrorResponse('Server error while fetching document.', 500, error);
	}
}

/**
 * PATCH /api/documents/[documentId]
 */
export async function PATCH(req: NextRequest, { params }: { params: { documentId: string } }) {
	try {
		const userId = await authService.authenticate(req);
		const body = await req.json();

		const updatedDoc = await DocumentService.updateDocument(userId, params.documentId, {
			fileName: body.fileName,
		});
		if (!updatedDoc) {
			return createErrorResponse('Document not found or access denied.', 404);
		}

		return NextResponse.json(
			{ message: 'Document updated successfully.', document: updatedDoc },
			{ status: 200 },
		);
	} catch (error) {
		return createErrorResponse('Server error while updating document.', 500, error);
	}
}

/**
 * DELETE /api/documents/[documentId]
 */
export async function DELETE(req: NextRequest, { params }: { params: { documentId: string } }) {
	try {
		const userId = await authService.authenticate(req);

		const deletedDoc = await DocumentService.deleteDocument(userId, params.documentId);
		if (!deletedDoc) {
			return createErrorResponse('Document not found or access denied.', 404);
		}

		return NextResponse.json({ message: 'Document deleted successfully.' }, { status: 200 });
	} catch (error) {
		return createErrorResponse('Server error while deleting document.', 500, error);
	}
}
