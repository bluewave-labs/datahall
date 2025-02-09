import { SupabaseProvider } from '@/providers/storage/supabase/supabaseProvider';
import prisma from '@lib/prisma';
import axios from 'axios';
import { randomUUID } from 'crypto';

export default class LinkService {
	static generateLinkDetails(): { linkUrl: string; linkId: string } {
		const uniqueId = randomUUID();
		const HOST = process.env.HOST || 'http://localhost:3000';

		return {
			linkId: uniqueId,
			linkUrl: `${HOST}/links/${uniqueId}`,
		};
	}

	static async deleteLink(linkId: string): Promise<void> {
		return;
	}

	static async getLink(linkId: string) {
		return prisma.link.findUnique({
			where: { linkId },
		});
	}

	static async getFileFromLink(
		linkId: string,
	): Promise<{ signedUrl: string; fileName: string; size: number }> {
		const bucketName = 'documents';
		let link = await prisma.link.findUnique({
			where: {
				linkId,
			},
			include: {
				Document: true,
			},
		});

		if (!link || !link.Document) {
			throw [404, 'Link not found'];
		}

		if (link.expirationTime && new Date(link.expirationTime) < new Date()) {
			throw [410, 'Link has expired'];
		}

		const supabaseProvider = new SupabaseProvider();
		const signedUrl = await supabaseProvider.generateSignedUrl(bucketName, link.Document.filePath);

		return { signedUrl, fileName: link.Document.fileName, size: link.Document.size };
	}
}
