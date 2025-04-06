import createHttpError from 'http-errors';
import { allProductsCollection } from '../db/models/products.js';

export const getProducts = async ({ filter = {} }) => {
  const products = allProductsCollection.find(
    filter.name && {
      name: { $regex: filter.name, $options: 'i' },
    },
  );

  return products;
};

export const addProduct = async (payload) => {
  return allProductsCollection.create(payload);
};

export const editProduct = async (payload) => {
  const product = await allProductsCollection.findOneAndUpdate(
    { _id: payload.id },
    payload.data,
    {
      new: true,
      includeResultMetadata: false,
    },
  );

  if (!product) throw createHttpError(404, 'Product not found');

  return product;
};

export const deleteProduct = async (payload) => {
  const product = await allProductsCollection.findOneAndDelete({
    _id: payload,
  });

  if (!product) throw createHttpError(404, 'Product not found');
};
