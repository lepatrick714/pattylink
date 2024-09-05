/** Define all publicly exposed endpoints reserved for crud operations */
import AppController from '../controllers/AppController';

import { Router } from 'express';

const router = Router();

router.get('/', AppController.index);

export default router;