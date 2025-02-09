import prisma from '@lib/prisma';

export async function fetchDocumentCount(userId: string): Promise<number> {
	try {
		return await prisma.document.count({
			where: {
				user_id: userId,
			},
		});
	} catch (error) {
		console.error('Error fetching document count for user:', error);
		return 0;
	}
}
