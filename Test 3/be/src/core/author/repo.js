import prisma from '../../../prisma/config.js';
import { validationResult } from 'express-validator';

export const _create = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	try {
		const username = req.username;
		const { name, biography, nationality } = req.body;
		const author = await prisma.author.create({
			data: {
				name,
				biography,
				nationality,
				createdBy: username,
			},
		});
		res.json(author);
	} catch (error) {
		console.error('Create author error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const _read = async (req, res) => {
	try {
		const authors = await prisma.author.findMany({
			orderBy: {
				updatedAt: 'desc',
			},
			include: {
				books: true,
			},
		});
		res.json(authors);
	} catch (error) {
		console.error('Get authors error:', error);
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
		const { name, biography, nationality } = req.body;
		const updatedAuthor = await prisma.author.update({
			where: { id: Number(id) },
			data: {
				name,
				biography,
				nationality,
				updatedBy: username,
			},
		});
		res.json(updatedAuthor);
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const _delete = async (req, res) => {
	try {
		const { id } = req.params;
		await prisma.author.delete({
			where: { id: Number(id) },
		});
		res.json({ message: 'Author deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};
