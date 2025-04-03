import { dashboardData } from '../services/dashboard.js';

export const dashboardController = async (req, res) => {
  const {
    allProducts,
    allSuppliers,
    allCustomers,
    latestCustomers,
    incomeExpenses,
  } = await dashboardData();

  res.json({
    status: 200,
    message: 'Successfully get dashboard data',
    data: {
      allProducts,
      allSuppliers,
      allCustomers,
      latestCustomers,
      incomeExpenses,
    },
  });
};
