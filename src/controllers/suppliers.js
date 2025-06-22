import createHttpError from 'http-errors';
import {
  addSupplier,
  deleteSupplier,
  editSupplier,
  getSuppliers,
} from '../services/suppliers.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getSuppliersController = async (req, res) => {
  const filter = parseFilterParams(req.query);
  const { page, perPage } = parsePaginationParams(req.query);

  const data = await getSuppliers({ page, perPage, filter });

  if (data.length === 0) {
    throw createHttpError(404, 'Nothing found');
  }

  res.json({
    status: 200,
    message: 'Successfully get suppliers',
    page: data.page,
    perPage: data.page,
    totalItems: data.totalItems,
    totalPages: data.totalPages,
    hasNextPage: data.hasNextPage,
    hasPreviousPage: data.hasPreviousPage,
    data: data.data,
  });
};

export const addSuppliersController = async (req, res) => {
  const supplier = await addSupplier(req.body);

  res.status(201).send({
    status: 201,
    message: 'Successfully created supplier',
    data: supplier,
  });
};

export const editSuppliersController = async (req, res) => {
  const { supplierId } = req.params;
  const supplier = await editSupplier({ id: supplierId, data: req.body });

  res.status(201).send({
    status: 201,
    message: 'Successfully edited supplier',
    data: supplier,
  });
};

export const deleteSuppliersController = async (req, res) => {
  const { supplierId } = req.params;

  await deleteSupplier(supplierId);

  res.status(200).send({
    status: 200,
    message: 'Successfully deleted suppliers',
    data: supplierId,
  });
};
