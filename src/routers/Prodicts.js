import { Router } from 'express';
import {
  createProductController,
  deleteController,
  getAllProductsController,
  getProductByIdController,
  upsertProductController,
} from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const productsRouter = Router();

productsRouter.get('/', ctrlWrapper(getAllProductsController));

productsRouter.get('/:id', ctrlWrapper(getProductByIdController));

productsRouter.post('/', ctrlWrapper(createProductController));

productsRouter.put('/:id', ctrlWrapper(upsertProductController));

productsRouter.delete('/:id', ctrlWrapper(deleteController));

export default productsRouter;
