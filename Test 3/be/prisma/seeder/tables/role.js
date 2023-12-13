import prisma from '../../config.js';

const roles = [
	{
		name: 'superuser',
		permissions: [
			{ name: 'user', detail: { create: true, read: true, update: true, delete: true } },
			{ name: 'author', detail: { create: true, read: true, update: true, delete: true } },
			{ name: 'publisher', detail: { create: true, read: true, update: true, delete: true } },
			{ name: 'book', detail: { create: true, read: true, update: true, delete: true } },
		],
		createdBy: 'system',
	},
	{
		name: 'editor',
		permissions: [
			{ name: 'user', detail: { create: false, read: true, update: false, delete: false } },
			{ name: 'author', detail: { create: true, read: true, update: true, delete: true } },
			{ name: 'publisher', detail: { create: true, read: true, update: true, delete: true } },
			{ name: 'book', detail: { create: true, read: true, update: true, delete: true } },
		],
		createdBy: 'system',
	},
];

async function roleSeed() {
	for (let role of roles) {
		await prisma.role.create({
			data: role,
		});
	}
}

export default roleSeed;
