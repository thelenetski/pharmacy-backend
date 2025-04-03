import { ordersCollection } from '../db/models/orders.js';

export const ordersData = async ({ filter = {} }) => {
  const orders = ordersCollection.find(
    filter.name && {
      name: { $regex: filter.name, $options: 'i' },
    },
  );

  return orders;
};
