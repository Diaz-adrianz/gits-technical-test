import prisma from '../config.js';
import authorSeed from './tables/author.js';
import bookSeed from './tables/book.js';
import publisherSeed from './tables/publisher.js';
import roleSeed from './tables/role.js';
import userSeed from './tables/user.js';

async function main() {
	await roleSeed();
	await userSeed();
	await authorSeed();
	await publisherSeed();
	await bookSeed();
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (err) => {
		console.log(err);
		await prisma.$disconnect();
		process.exit(1);
	});
