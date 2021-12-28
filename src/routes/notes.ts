import { Router } from 'express';
import Note from '../controllers/Note';
const router = Router();


/**
 * POST - CREATE
 * PATCH - EDIT
 * DELETE - DELETE
 */


router.post('/', Note.create);

export default router;