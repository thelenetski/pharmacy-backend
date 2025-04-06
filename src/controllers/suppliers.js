import createHttpError from 'http-errors';
import {
  addSupplier,
  editSupplier,
  getSuppliers,
} from '../services/suppliers.js';

export const getSuppliersController = async (req, res) => {
  const data = await getSuppliers();

  if (data.length === 0) {
    throw createHttpError(404, 'Nothing found');
  }

  res.json({
    status: 200,
    message: 'Successfully get suppliers',
    data,
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
