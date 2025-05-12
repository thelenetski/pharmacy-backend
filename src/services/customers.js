import { allCustomersCollection } from '../db/models/dashboard.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const customerIdData = async (payload) => {
  const customerInfo = payload.customerId
    ? await allCustomersCollection.findById(payload.customerId)
    : await allCustomersCollection.find();

  return customerInfo;
};

export const customersData = async ({ page = 1, perPage = 5, filter = {} }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const query = {};

  if (filter.name) {
    query.name = { $regex: filter.name, $options: 'i' };
  }

  const [total, customers] = await Promise.all([
    allCustomersCollection.countDocuments(query),
    allCustomersCollection.find(query).skip(skip).limit(limit),
  ]);

  const paginationData = calculatePaginationData(total, perPage, page);

  return {
    data: customers,
    ...paginationData,
  };
};
