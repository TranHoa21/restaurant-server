import { Router } from 'express';
import express from 'express';

import * as controllers from '../controllers'

const router = Router();

router.use(express.json());

router.post('/', controllers.createNewCart);
router.get('/', controllers.getAllCart);
router.get('/:id', controllers.getCartById);
router.put('/:id', controllers.updateCart);
router.delete('/:id', controllers.deleteCart);




export default router;
