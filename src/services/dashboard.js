import {
  allCustomersCollection,
  incomeExpensesCollection,
} from '../db/models/dashboard.js';
import { allProductsCollection } from '../db/models/products.js';
import { allSuppliersCollection } from '../db/models/suppliers.js';

export const dashboardData = async () => {
  const allProducts = await allProductsCollection.countDocuments();
  const allSuppliers = await allSuppliersCollection.countDocuments();
  const allCustomers = await allCustomersCollection.countDocuments();
  const latestCustomers = await allCustomersCollection
    .find()
    .sort({ _id: -1 })
    .limit(5);
  const incomeExpenses = await incomeExpensesCollection
    .find()
    .sort({ _id: -1 })
    .limit(6);

  return {
    allProducts,
    allSuppliers,
    allCustomers,
    latestCustomers,
    incomeExpenses,
  };
};
