import prisma from '../../../prisma/config.js';
import { validationResult } from 'express-validator';

export const _create = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	try {
		const username = req.username;
		const { name, location, website } = req.body;
		const publisher = await prisma.publisher.create({
			data: {
				name,
				location,
				website,
				createdBy: username,
			},
		});
		res.json(publisher);
	} catch (error) {
		console.error('Create publisher error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const _read = async (req, res) => {
	try {
		const publishers = await prisma.publisher.findMany({
			orderBy: {
				updatedAt: 'desc',
			},
			include: {
				books: true,
			},
		});
		res.json(publishers);
	} catch (error) {
		console.error('Get publishers error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const _update = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const { id } = req.params;
		const username = req.username;
		const { name, location, website } = req.body;
		const updatedPublisher = await prisma.publisher.update({
			where: { id: Number(id) },
			data: {
				name,
				location,
				website,
				updatedBy: username,
			},
		});
		res.json(updatedPublisher);
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const _delete = async (req, res) => {
	try {
		const { id } = req.params;
		await prisma.publisher.delete({
			where: { id: Number(id) },
		});
		res.json({ message: 'Publisher deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};
