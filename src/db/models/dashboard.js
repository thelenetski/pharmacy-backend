import { model, Schema } from 'mongoose';

const countsSchema = new Schema(
  {
    counts: { type: Number },
  },
  { timestamps: true, versionKey: false },
);

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

export const allCustomersCollection = model('customers', countsSchema);
export const incomeExpensesCollection = model(
  'income-expenses',
  incomeExpensesSchema,
);
