import { Router } from 'express';
import { protect } from '../../middleware/auth.js';
import { _create, _delete, _read, _update } from './repo.js';
import { validateBook } from '../../utils/request_validator.js';

const book_router = Router();

book_router.post('/', protect, validateBook, _create);
book_router.get('/', protect, _read);
book_router.put('/:id', protect, validateBook, _update);
book_router.delete('/:id', protect, _delete);

export default book_router;
