import { customerIdData, customersData } from '../services/customers.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const customerIdController = async (req, res) => {
  const id = req.params;

  const data = await customerIdData(id && id);

  res.json({
    status: 200,
    message: 'Successfully get customers info',
    data,
  });
};

export const customersAllController = async (req, res) => {
  const filter = parseFilterParams(req.query);
  const { page, perPage } = parsePaginationParams(req.query);

  const data = await customersData({ page, perPage, filter });

  res.json({
    status: 200,
    message: 'Successfully get customers info',
    page: data.page,
    perPage: data.page,
    totalItems: data.totalItems,
    totalPages: data.totalPages,
    hasNextPage: data.hasNextPage,
    hasPreviousPage: data.hasPreviousPage,
    data: data.data,
  });
};
