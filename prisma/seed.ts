import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { getLinkData } from '../src/seed/link';
import { getLinkVisitorData } from '../src/seed/linkVisitor';
import { getDocumentData } from '../src/seed/document';
import { getUserData } from '../src/seed/user';

async function main() {
	console.log('Seeding database...');

	// 1) Seed USERS
	const usersData = await getUserData();
	await prisma.user.createMany({ data: usersData });
	console.log(`Seeded ${usersData.length} users.`);

	// 2) Seed DOCUMENTS
	const documentsData = getDocumentData();
	await prisma.document.createMany({ data: documentsData });
	console.log(`Seeded ${documentsData.length} documents.`);

	// 3) Seed LINKS
	const linksData = getLinkData();
	await prisma.link.createMany({ data: linksData });
	console.log(`Seeded ${linksData.length} links.`);

	// 4) Seed LINK VISITORS
	const linkVisitorsData = getLinkVisitorData();
	await prisma.linkVisitors.createMany({ data: linkVisitorsData });
	console.log(`Seeded ${linkVisitorsData.length} link visitors.`);

	console.log('Seeding completed successfully.');
}

main()
	.catch((error) => {
		console.error('Error during seeding:', error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
