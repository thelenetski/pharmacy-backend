import createHttpError from 'http-errors';
import { deleteProduct, getProducts } from '../services/products.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { addProduct } from '../services/products.js';
import { editProduct } from '../services/products.js';

export const getProductsController = async (req, res) => {
  const filter = parseFilterParams(req.query);

  const data = await getProducts({ filter });

  if (data.length === 0) {
    throw createHttpError(404, 'Nothing found');
  }

  res.json({
    status: 200,
    message: 'Successfully get products',
    data,
  });
};

export const addProductsController = async (req, res) => {
  const product = await addProduct(req.body);

  res.status(201).send({
    status: 201,
    message: 'Successfully created product',
    data: product,
  });
};

export const editProductsController = async (req, res) => {
  const { productId } = req.params;
  const product = await editProduct({ id: productId, data: req.body });

  res.status(201).send({
    status: 201,
    message: 'Successfully edited product',
    data: product,
  });
};

export const deleteProductsController = async (req, res) => {
  const { productId } = req.params;

  await deleteProduct(productId);

  res.status(200).send({
    status: 200,
    message: 'Successfully deleted product',
  });
};
