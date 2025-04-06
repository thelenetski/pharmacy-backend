import createHttpError from 'http-errors';
import { allSuppliersCollection } from '../db/models/suppliers.js';

export const getSuppliers = async () => {
  const suppliers = allSuppliersCollection.find();

  return suppliers;
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
