import { body } from 'express-validator';

export const validateUser = [body('username').trim().notEmpty().isString(), body('email').trim().notEmpty().isEmail()];

export const validateAuthor = [
	body('name').trim().notEmpty().isString(),
	body('biography').optional().isString(),
	body('nationality').optional().isString(),
];

export const validateBook = [
	body('title').trim().notEmpty().isString(),
	body('description').optional().isString(),
	body('genre').optional().isString(),
	body('authorId').isNumeric(),
	body('publisherId').isNumeric(),
];

export const validatePublisher = [
	body('name').trim().notEmpty().isString(),
	body('location').optional().isString(),
	body('website').optional().isURL(),
];
