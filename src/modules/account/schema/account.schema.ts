import * as mongoose from 'mongoose';

export const AccountSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  secondName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});
