import * as mongoose from 'mongoose';

export const CustomerSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now() }
});
