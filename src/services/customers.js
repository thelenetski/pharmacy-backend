import { allCustomersCollection } from '../db/models/dashboard.js';

export const customersData = async (payload) => {
  const customerInfo = payload.customerId
    ? await allCustomersCollection.findById(payload.customerId)
    : await allCustomersCollection.find();

  return customerInfo;
};
