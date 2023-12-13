import prisma from '../../config.js';

const publishers = [
	{
		name: 'Gramedia',
		location: 'Bandung',
		website: 'gramedia.co.id',
		createdBy: 'system',
	},
];

async function publisherSeed() {
	for (let publisher of publishers) {
		await prisma.publisher.create({
			data: publisher,
		});
	}
}

export default publisherSeed;
