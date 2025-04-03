import { model, Schema } from 'mongoose';

const countsSchema = new Schema(
  {
    counts: { type: Number },
  },
  { timestamps: true, versionKey: false },
);

countsSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const incomeExpensesSchema = new Schema(
  {
    amount: { type: String },
    name: { type: String },
    type: {
      type: String,
      enum: ['Income', 'Expense'],
    },
  },
  { timestamps: true, versionKey: false },
);

incomeExpensesSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const allProductsCollection = model('products', countsSchema);
export const allSuppliersCollection = model('suppliers', countsSchema);
export const allCustomersCollection = model('customers', countsSchema);
export const incomeExpensesCollection = model(
  'income-expenses',
  incomeExpensesSchema,
);
