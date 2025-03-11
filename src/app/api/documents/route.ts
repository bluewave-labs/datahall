import { NextRequest, NextResponse } from 'next/server';
import { authService, DocumentService, createErrorResponse } from '../_services';
import { uploadFile } from '../_services/storageService';

/**
 * GET /api/documents
 * Returns all documents for the authenticated user.
 */
export async function GET(req: NextRequest) {
	try {
		const userId = await authService.authenticate();
		const documents = await DocumentService.getUserDocuments(userId);

		const result = documents.map((doc) => {
			const linkCount = doc.Link.length;
			const visitorCount = doc.Link.reduce((acc, l) => acc + l.LinkVisitors.length, 0);
			const totalViews = 0; // placeholder

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
					avatar: null,
				},
				links: linkCount,
				viewers: visitorCount,
				views: totalViews,
				createdLinks,
			};
		});

		return NextResponse.json({ documents: result }, { status: 200 });
	} catch (error) {
		return createErrorResponse('Server error while fetching documents', 500, error);
	}
}

/**
 * POST /api/documents
 * Uploads a new document. Expects form data with "file".
 */
export async function POST(req: NextRequest) {
	try {
		const userId = await authService.authenticate();

		const formData = await req.formData();
		const file = formData.get('file');
		if (!(file instanceof File) || !file.name) {
			return createErrorResponse('Invalid file type or missing file', 400);
		}

		// Validate file with environment constraints
		try {
			DocumentService.validateUploadFile(file);
		} catch (err) {
			if (err instanceof Error) {
				if (err.message === 'INVALID_FILE_TYPE') {
					return createErrorResponse('File type not allowed', 400);
				}
				if (err.message === 'FILE_TOO_LARGE') {
					return createErrorResponse('File size exceeds limit', 400);
				}
			}
			return createErrorResponse('File validation failed', 400, err);
		}

		const arrayBuffer = await file.arrayBuffer();
		const fileBuffer = Buffer.from(arrayBuffer);

		const uploadResult = await uploadFile(fileBuffer, {
			userId,
			fileName: file.name,
			fileType: file.type,
		});
		if (!uploadResult) {
			return createErrorResponse('File upload failed.', 500);
		}

		const document = await DocumentService.createDocument({
			userId,
			fileName: file.name,
			filePath: uploadResult,
			fileType: file.type,
			size: file.size,
		});

		return NextResponse.json({ message: 'File uploaded successfully', document }, { status: 200 });
	} catch (error) {
		return createErrorResponse('Server error while uploading document', 500, error);
	}
}
