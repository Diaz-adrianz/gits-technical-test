import prisma from '../config.js';

async function truncateAllTables() {
	try {
		const tables = ['User', 'Role', 'Author', 'Publisher', 'Book'];

		for (const table of tables) {
			await prisma.$queryRawUnsafe(`TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE;`);
		}
	} catch (error) {
		console.error('Error truncating tables:', error);
	} finally {
		await prisma.$disconnect();
	}
}

truncateAllTables();
