import createHttpError from 'http-errors';
import { allSuppliersCollection } from '../db/models/suppliers.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getSuppliers = async ({ page = 1, perPage = 5, filter = {} }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const query = {};

  if (filter.name) {
    query.name = { $regex: filter.name, $options: 'i' };
  }

  const [total, suppliers] = await Promise.all([
    allSuppliersCollection.countDocuments(query),
    allSuppliersCollection.find(query).skip(skip).limit(limit),
  ]);

  const paginationData = calculatePaginationData(total, perPage, page);

  return { data: suppliers, ...paginationData };
};

export const addSupplier = async (payload) => {
  return allSuppliersCollection.create(payload);
};

export const editSupplier = async (payload) => {
  const suppliers = await allSuppliersCollection.findOneAndUpdate(
    { _id: payload.id },
    payload.data,
    {
      new: true,
      includeResultMetadata: false,
    },
  );

  if (!suppliers) throw createHttpError(404, 'Suppliers not found');

  return suppliers;
};
