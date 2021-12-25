import { Router } from 'express';
import Auth from '../controllers/Auth';

const router = Router();

// TODO: Reemplazo
router.post('/signin', Auth.signin);
router.post('/signup', Auth.signup);

export default router;