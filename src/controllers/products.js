import createHttpError from 'http-errors';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  upsertProduct,
} from '../services/Products.js';

export const getAllProductsController = async (req, res) => {
  const { _id: userId } = req.user;
  console.log(req.query);
  const minWorth = req.query.minWorth;
  const maxWorth = req.query.maxWorth;

  const data = await getAllProducts({ userId, minWorth, maxWorth });

  res.json({
    status: 200,
    message: `Successfully found products`,
    data,
  });
};

export const getProductByIdController = async (req, res) => {
  const { id } = req.params;
  const data = await getProductById(id);

  if (!data) {
    throw createHttpError(404, `Product with id: ${id} not found`);
  }

  res.json({
    status: 200,
    message: `Product with id: ${id} Successfully found `,
    data,
  });
};

export const createProductController = async (req, res) => {
  const data = await createProduct(req.body);

  res.status(201).json({
    status: 201,
    message: `Product created successfully`,
    data,
  });
};

export const upsertProductController = async (req, res) => {
  const { id } = req.params;

  const { isNew, data } = await upsertProduct({ _id: id }, req.body);
  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Product upsert successfully`,
    data,
  });
};

export const deleteController = async (req, res) => {
  const { id } = req.params;

  const data = await deleteProduct({ _id: id });

  if (!data) {
    throw createHttpError(404, `Product with id: ${id} not found`);
  }
  res.status(204).send();
};
