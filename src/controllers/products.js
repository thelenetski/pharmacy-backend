import createHttpError from 'http-errors';
import { productsData } from '../services/products.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const productsController = async (req, res) => {
  const filter = parseFilterParams(req.query);

  const data = await productsData({ filter });

  if (data.length === 0) {
    throw createHttpError(404, 'Nothing found');
  }

  res.json({
    status: 200,
    message: 'Successfully get products',
    data,
  });
};
