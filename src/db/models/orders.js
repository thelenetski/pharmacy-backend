import { model, Schema } from 'mongoose';

const ordersSchema = new Schema(
  {
    photo: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    products: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true },
    order_date: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

ordersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const ordersCollection = model('orders', ordersSchema);
