import { Router } from 'express';
import { protect } from '../../middleware/auth.js';
import { _create, _delete, _read, _update } from './repo.js';
import { validateAuthor } from '../../utils/request_validator.js';

const author_router = Router();

author_router.post('/', protect, validateAuthor, _create);
author_router.get('/', protect, _read);
author_router.put('/:id', protect, validateAuthor, _update);
author_router.delete('/:id', protect, _delete);

export default author_router;
