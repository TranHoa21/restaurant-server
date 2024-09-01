import { Router } from 'express';
import express from 'express';

import * as controllers from '../controllers'

const router = Router();

router.use(express.json());

router.post('/', controllers.createNewCartItem);
router.get('/', controllers.getAllCartItem);
router.get('/:id', controllers.getCartItemById);
router.put('/:id', controllers.updateCartItem);
router.delete('/:id', controllers.deleteCartItem);




export default router;
