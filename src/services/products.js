import { allProductsCollection } from '../db/models/dashboard.js';

export const productsData = async ({ filter = {} }) => {
  const products = allProductsCollection.find(
    filter.name && {
      name: { $regex: filter.name, $options: 'i' },
    },
  );

  return products;
};
