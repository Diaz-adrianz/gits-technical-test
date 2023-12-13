import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../../prisma/config.js';

export const _login = async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await prisma.user.findUnique({ where: { username: username } });
		if (!user) {
			return res.status(401).json({ message: 'Invalid username or password' });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: 'Invalid username or password' });
		}

		const token = jwt.sign({ username: user.username }, process.env.TOKEN_SECRET, {
			expiresIn: process.env.TOKEN_HOUR + 'h',
		});

		res.cookie('refreshToken', user.refreshToken, { httpOnly: true });

		res.status(200).json({
			user,
			token,
		});
	} catch (error) {
		console.error('Login error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const _refreshToken = async (req, res) => {
	try {
		const username = req.username;
		const token = jwt.sign({ username }, process.env.TOKEN_SECRET, {
			expiresIn: process.env.TOKEN_HOUR + 'h',
		});

		res.json({ token });
	} catch (error) {
		console.error('Refresh token error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const _logout = async (req, res) => {
	try {
		res.clearCookie('refreshToken');

		res.json({ message: 'Logged out successfully' });
	} catch (error) {
		console.error('Logout error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};
