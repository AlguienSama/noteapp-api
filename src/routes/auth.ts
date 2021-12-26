import { Router } from 'express';
import Auth from '../controllers/Auth';
import { validEmail, validLength } from '../middlewares/validators';

const router = Router();

router.use(validEmail);
router.use(validLength(4))
router.post('/signin', Auth.signin);
router.post('/signup', Auth.signup);

export default router;