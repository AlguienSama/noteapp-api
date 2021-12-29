import { Router } from 'express';
import Note from '../controllers/Note';
const router = Router();


/**
 * POST - CREATE
 * PATCH - EDIT
 * DELETE - DELETE
 */

router.get('/:id', Note.get);
router.post('/', Note.create);
router.patch('/:id', Note.edit);
router.delete('/:id', Note.delete);

export default router;