import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

// For Query (Search Product), Query route should be at top of all routes
router.get('/', ProductControllers.searchProduct);

router.post('/', ProductControllers.createProduct);

router.get('/', ProductControllers.getAllProducts);
router.get('/:productId', ProductControllers.getSingleProduct);

router.put('/:productId', ProductControllers.updateSingleProduct);

router.delete('/:productId', ProductControllers.deleteProduct);

export const ProductRoutes = router;
