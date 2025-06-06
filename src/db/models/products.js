import { model, Schema } from 'mongoose';

const productsSchema = new Schema(
  {
    photo: { type: String },
    name: { type: String, required: true },
    suppliers: { type: String, required: true },
    stock: { type: String, required: true },
    price: { type: String, required: true },
    category: { type: String },
  },
  { timestamps: false, versionKey: false },
);

export const allProductsCollection = model('products', productsSchema);
