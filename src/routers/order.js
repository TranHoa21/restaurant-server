import { Router } from 'express';
import express from 'express';

import * as controllers from '../controllers'

const router = Router();

router.use(express.json());

router.post('/', controllers.createNewOrder);
router.get('/', controllers.getAllOrder);
router.get('/:id', controllers.getOrderById);
router.put('/:id', controllers.updateOrder);
router.delete('/:id', controllers.deleteOrder);




export default router;
