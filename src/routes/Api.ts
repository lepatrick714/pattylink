/** Define all publicly exposed endpoints reserved for crud operations */

import { Router } from 'express';
import AppController from '../controllers/AppController';

const router = Router(); 

router.get('/', AppController.index);

export default router;