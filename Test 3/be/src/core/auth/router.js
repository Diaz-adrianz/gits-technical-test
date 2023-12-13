import { protect } from '../../middleware/auth.js';
import { _login, _logout, _refreshToken } from './repo.js';
import { Router } from 'express';

const auth_router = Router();

auth_router.post('/login', _login);
auth_router.get('/refresh', protect, _refreshToken);
auth_router.delete('/logout', protect, _logout);

export default auth_router;
