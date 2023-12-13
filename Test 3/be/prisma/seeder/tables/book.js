import prisma from '../../config.js';

const books = [
	{
		title: 'Aku yang Hina',
		description: 'Menceritakan kehidupan tragis anak jalanan',
		genre: 'motivasi',
		releaseDate: new Date(),
		authorId: 1,
		publisherId: 1,
		createdBy: 'system',
	},
	{
		title: 'Penghuni Kawah Hijau',
		description: 'Misteri makhluk hijau besar yang sering berkeliaran di malam hari',
		genre: 'horrow',
		releaseDate: new Date(),
		authorId: 2,
		publisherId: 1,
		createdBy: 'system',
	},
];

async function bookSeed() {
	for (let book of books) {
		await prisma.book.create({
			data: book,
		});
	}
}

export default bookSeed;
