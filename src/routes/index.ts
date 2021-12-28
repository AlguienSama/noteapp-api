import { Router } from 'express';
import { authuenticate } from '../middlewares/auth';
import auth from './auth';
import note from './notes';

const routes = Router();
routes.use('/auth', auth);
routes.use(authuenticate);
routes.use('/note', note)

export default routes;