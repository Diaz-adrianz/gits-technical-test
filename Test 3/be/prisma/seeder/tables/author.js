import prisma from '../../config.js';

const authors = [
	{
		name: 'Sayuti',
		biography: 'Penulis tampan',
		nationality: 'Indonesia',
		createdBy: 'system',
	},
	{
		name: 'Grunger',
		biography: 'Horror specialist',
		nationality: 'German',
		createdBy: 'system',
	},
];

async function authorSeed() {
	for (let author of authors) {
		await prisma.author.create({
			data: author,
		});
	}
}

export default authorSeed;
