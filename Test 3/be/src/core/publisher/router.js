import { Router } from 'express';
import { protect } from '../../middleware/auth.js';
import { _create, _delete, _read, _update } from './repo.js';
import { validatePublisher } from '../../utils/request_validator.js';

const publisher_router = Router();

publisher_router.post('/', protect, validatePublisher, _create);
publisher_router.get('/', protect, _read);
publisher_router.put('/:id', protect, validatePublisher, _update);
publisher_router.delete('/:id', protect, _delete);

export default publisher_router;
