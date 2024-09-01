import { Router } from 'express';
import express from 'express';

import * as controllers from '../controllers'

const router = Router();

router.use(express.json());

router.post('/', controllers.createNewOrderItem);
router.get('/', controllers.getAllOrderItem);
router.get('/:id', controllers.getOrderItemById);
router.put('/:id', controllers.updateOrderItem);
router.delete('/:id', controllers.deleteOrderItem);




export default router;
