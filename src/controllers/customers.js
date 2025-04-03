import { customersData } from '../services/customers.js';

export const customerController = async (req, res) => {
  const id = req.params;

  const data = await customersData(id && id);

  res.json({
    status: 200,
    message: 'Successfully get customers info',
    data,
  });
};
