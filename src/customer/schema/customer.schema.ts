import * as mongoose from 'mongoose';

export const CustomerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  address: String,
  description: String,
  createdAt: { type: Date, default: Date.now() }
});