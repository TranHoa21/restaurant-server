import { Router } from 'express';
import express from 'express';

import uploadCloud from '../middleware/cloudinary.js'

import * as controllers from '../controllers'


const router = Router();

router.use(express.json());

router.post('/', uploadCloud.single('file'), controllers.createMenu);
router.get('/', controllers.getAllMenu)
router.get('/:menuId', controllers.getMenuById);
router.put('/:menuId', uploadCloud.single('file'), controllers.updateMenu);
router.delete('/:menuId', controllers.deleteMenu);





export default router;