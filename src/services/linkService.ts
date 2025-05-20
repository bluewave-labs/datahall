import bcryptjs from 'bcryptjs';
import { randomUUID } from 'crypto';

import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

import { SupabaseProvider } from '@/services/storage/supabase/supabaseStorageProvider';

export class LinkService {
	/**
	 * Lists all links for a specific document, ensuring ownership.
	 */
	static async getDocumentLinks(userId: string, documentId: string) {
		// Ensure doc ownership
		const doc = await prisma.document.findFirst({
			where: { document_id: documentId, user_id: userId },
			include: { documentLink: true },
		});
		if (!doc) return null; // doc not found or no access
		return doc.documentLink;
	}

	/**
	 * Creates a new link for the specified document if the user owns it.
	 */
	static async createLinkForDocument(
		userId: string,
		documentId: string,
		{
			alias = '',
			isPublic,
			password,
			expirationTime,
			visitorFields = [],
		}: {
			alias?: string;
			isPublic?: boolean;
			password?: string;
			expirationTime?: string;
			visitorFields?: string[];
		},
	) {
		// Check doc ownership
		const doc = await prisma.document.findFirst({
			where: { document_id: documentId, user_id: userId },
		});
		if (!doc) return null; // doc not found or no access

		// Validate expiration time
		if (expirationTime && new Date(expirationTime) < new Date()) {
			throw new Error('EXPIRATION_PAST');
		}

		// Generate link details
		const uniqueId = randomUUID();
		const HOST = process.env.HOST || 'http://localhost:3000';
		const linkUrl = `${HOST}/documentAccess/${uniqueId}`;

		// Hash password if provided
		let hashedPassword: string | null = null;
		if (password) {
			hashedPassword = await bcryptjs.hash(password, 10);
		}
		try {
			return await prisma.documentLink.create({
				data: {
					createdByUserId: userId,
					documentLinkId: uniqueId,
					linkUrl,
					documentId: doc.document_id,
					isPublic: !!isPublic,
					password: hashedPassword,
					alias,
					expirationTime: expirationTime ? new Date(expirationTime) : null,
					visitorFields,
				},
			});
		} catch (err: any) {
			if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
				throw new Error('FRIENDLY_NAME_CONFLICT');
			}
			throw err;
		}
	}

	/**
	 * Deletes a link if it belongs to the user.
	 */
	static async deleteLink(userId: string, documentLinkId: string) {
		const link = await prisma.documentLink.findFirst({
			where: { documentLinkId, createdByUserId: userId },
		});

		if (!link) return null; // no access
		return prisma.documentLink.delete({
			where: { documentLinkId: link.documentLinkId },
		});
	}

	/**
	 * Retrieves a link (no user auth required), checks if it exists.
	 * If expired, caller can handle. Returns the raw link record.
	 */
	static async getPublicLink(linkId: string) {
		return prisma.documentLink.findUnique({
			where: { documentLinkId: linkId },
		});
	}

	/**
	 * Verifies a link's password if it exists, returning true if valid or no password.
	 */
	static async verifyLinkPassword(
		link: { password: string | null },
		providedPassword?: string,
	): Promise<boolean> {
		if (!link.password) {
			// No password is set => no check needed
			return true;
		}
		if (!providedPassword) return false;
		const isValid = await bcryptjs.compare(providedPassword, link.password);
		return isValid;
	}

	/**
	 * Logs a new record in LinkVisitors for this link.
	 */
	static async logVisitor(linkId: string, firstName = '', lastName = '', email = '') {
		return prisma.documentLinkVisitor.create({
			data: {
				documentLinkId: linkId,
				firstName,
				lastName,
				email,
			},
		});
	}

	/**
	 * Generates a signed file URL for the Document associated with this link,
	 * checking if the link is expired. Throws if link invalid/expired.
	 */
	static async getSignedFileFromLink(linkId: string): Promise<{
		signedUrl: string;
		fileName: string;
		size: number;
	}> {
		const link = await prisma.documentLink.findUnique({
			where: { documentLinkId: linkId },
			include: { Document: true },
		});
		if (!link || !link.Document) {
			throw [404, 'Link not found'];
		}
		if (link.expirationTime && new Date(link.expirationTime) < new Date()) {
			throw [410, 'Link has expired'];
		}

		const supabaseProvider = new SupabaseProvider();
		const signedUrl = await supabaseProvider.generateSignedUrl('documents', link.Document.filePath);

		return {
			signedUrl,
			fileName: link.Document.fileName,
			size: link.Document.size,
		};
	}
}
