import prisma from '../../../prisma/config.js';
import { validationResult } from 'express-validator';

export const _create = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	try {
		const username = req.username;
		const { title, description, genre, authorId, publisherId } = req.body;
		const book = await prisma.book.create({
			data: {
				title,
				description,
				genre,
				authorId,
				publisherId,
				createdBy: username,
			},
		});
		res.json(book);
	} catch (error) {
		console.error('Create book error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const _read = async (req, res) => {
	try {
		const books = await prisma.book.findMany({
			orderBy: {
				updatedAt: 'desc',
			},
			include: {
				author: true,
				publisher: true,
			},
		});
		res.json(books);
	} catch (error) {
		console.error('Get books error:', error);
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
		const { title, description, genre, authorId, publisherId } = req.body;
		const updatedbook = await prisma.book.update({
			where: { id: Number(id) },
			data: {
				title,
				description,
				genre,
				authorId,
				publisherId,
				updatedBy: username,
			},
		});
		res.json(updatedbook);
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const _delete = async (req, res) => {
	try {
		const { id } = req.params;
		await prisma.book.delete({
			where: { id: Number(id) },
		});
		res.json({ message: 'book deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};
