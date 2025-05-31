import createHttpError from 'http-errors';
import { allProductsCollection } from '../db/models/products.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getProducts = async ({ page = 1, perPage = 5, filter = {} }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const query = {};

  if (filter.name) {
    query.name = { $regex: filter.name, $options: 'i' };
  }

  const [total, products, categories] = await Promise.all([
    allProductsCollection.countDocuments(query),
    allProductsCollection.find(query).skip(skip).limit(limit),
    allProductsCollection.distinct('category'),
  ]);

  const paginationData = calculatePaginationData(total, perPage, page);

  return {
    data: products,
    categories,
    ...paginationData,
  };
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
