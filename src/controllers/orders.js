import { ordersData } from '../services/orders.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const ordersController = async (req, res) => {
  const filter = parseFilterParams(req.query);
  const { page, perPage } = parsePaginationParams(req.query);

  const data = await ordersData({ page, perPage, filter });

  res.json({
    status: 200,
    message: 'Successfully get orders',
    page: data.page,
    perPage: data.page,
    totalItems: data.totalItems,
    totalPages: data.totalPages,
    hasNextPage: data.hasNextPage,
    hasPreviousPage: data.hasPreviousPage,
    data: data.orders,
  });
};
