import { ordersData } from '../services/orders.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const ordersController = async (req, res) => {
  const filter = parseFilterParams(req.query);

  const data = await ordersData({ filter });

  res.json({
    status: 200,
    message: 'Successfully get orders',
    data,
  });
};
