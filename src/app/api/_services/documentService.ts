// src/app/api/_services/documentService.ts
import prisma from '@/lib/prisma';
import { deleteFile } from '@/app/api/_services/storageService';

export class DocumentService {
	/**
	 * Returns all documents (and relevant info) for the specified user.
	 */
	static async getUserDocuments(userId: string) {
		return prisma.document.findMany({
			where: { user_id: userId },
			include: {
				User: {
					select: { first_name: true, last_name: true },
				},
				Link: {
					include: { LinkVisitors: true },
				},
			},
			orderBy: { createdAt: 'desc' },
		});
	}

	/**
	 * Creates a new document record for the given user.
	 */
	static async createDocument({
		userId,
		fileName,
		filePath,
		fileType,
		size,
	}: {
		userId: string;
		fileName: string;
		filePath: string;
		fileType: string;
		size: number;
	}) {
		return prisma.document.create({
			data: {
				user_id: userId,
				fileName,
				filePath,
				fileType,
				size,
			},
		});
	}

	/**
	 * Fetch a single document by ID, ensuring it belongs to the given user.
	 */
	static async getDocumentById(userId: string, documentId: string) {
		return prisma.document.findFirst({
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
					select: { first_name: true, last_name: true },
				},
			},
		});
	}

	/**
	 * Updates a document if owned by the user, returning the updated record.
	 */
	static async updateDocument(userId: string, documentId: string, data: { fileName?: string }) {
		// Ensure the document is owned by user
		const existingDoc = await prisma.document.findUnique({
			where: { document_id: documentId },
		});
		if (!existingDoc || existingDoc.user_id !== userId) {
			return null; // signals "not found or no access"
		}

		return prisma.document.update({
			where: { document_id: documentId },
			data: {
				fileName: data.fileName ?? existingDoc.fileName,
			},
		});
	}

	/**
	 * Deletes a document and its file from storage if the user owns it.
	 */
	static async deleteDocument(userId: string, documentId: string) {
		// Check ownership
		const document = await prisma.document.findUnique({
			where: { document_id: documentId },
		});
		if (!document || document.user_id !== userId) {
			return null; // signals "not found or no access"
		}

		// Delete from DB
		const deletedDoc = await prisma.document.delete({
			where: { document_id: documentId },
		});

		// Delete from storage
		await deleteFile(deletedDoc.filePath);

		return deletedDoc;
	}

	/**
	 * Retrieves all visitors who accessed any link under this document.
	 */
	static async getDocumentVisitors(userId: string, documentId: string) {
		// Ensure doc ownership
		const doc = await prisma.document.findFirst({
			where: { document_id: documentId, user_id: userId },
			include: { Link: true },
		});
		if (!doc) return null; // doc not found or no access

		// Gather linkIds
		const linkIds = doc.Link.map((l) => l.linkId);
		if (linkIds.length === 0) {
			return [];
		}

		// Query link visitors
		return prisma.linkVisitors.findMany({
			where: { linkId: { in: linkIds } },
			orderBy: { updatedAt: 'desc' },
		});
	}

	/**
	 * Validates file type & size against env variables:
	 * - ALLOWED_FILE_TYPES (comma-separated, e.g. "pdf,jpg,png")
	 * - MAX_FILE_SIZE_MB (e.g. "1" => 1 MB)
	 */
	static validateUploadFile(file: File) {
		// 1) Validate MIME type based on ALLOWED_FILE_TYPES
		const allowedTypes = process.env.ALLOWED_FILE_TYPES?.split(',') || [];
		if (!allowedTypes.includes(file.type)) {
			throw new Error('INVALID_FILE_TYPE'); // Will be handled as a 400 error
		}

		// 2) Validate file size
		const maxSizeMB = parseInt(process.env.MAX_FILE_SIZE_MB || '1', 10);
		const fileSizeMB = file.size / (1024 * 1024);
		if (fileSizeMB > maxSizeMB) {
			throw new Error('FILE_TOO_LARGE');
		}
	}
}
