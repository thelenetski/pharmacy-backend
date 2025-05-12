import { ordersCollection } from '../db/models/orders.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const ordersData = async ({ page = 1, perPage = 5, filter = {} }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const query = {};

  if (filter.name) {
    query.name = { $regex: filter.name, $options: 'i' };
  }

  const [total, orders] = await Promise.all([
    ordersCollection.countDocuments(query),
    ordersCollection.find(query).skip(skip).limit(limit),
  ]);

  const paginationData = calculatePaginationData(total, perPage, page);

  return {
    data: orders,
    ...paginationData,
  };
};
