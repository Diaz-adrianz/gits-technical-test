import prisma from '../../config.js';
import bcrypt from 'bcrypt';

const users = [
	{
		username: 'super-user',
		password: 'password',
		refreshToken: '123',
		createdBy: 'system',
		roleId: 1,
	},
	{
		username: 'editor',
		password: 'password',
		refreshToken: '567',
		createdBy: 'system',
		roleId: 2,
	},
];

async function userSeed() {
	for (let user of users) {
		const existingUser = await prisma.user.findUnique({
			where: {
				username: user.username,
			},
		});

		if (!existingUser) {
			const salt = await bcrypt.genSalt();
			user.password = await bcrypt.hash(user.password, salt);
			await prisma.user.create({
				data: user,
			});
		}
	}
}

export default userSeed;
