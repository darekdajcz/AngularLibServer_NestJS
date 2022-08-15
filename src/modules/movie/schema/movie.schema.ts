import * as mongoose from 'mongoose';

export const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: String, required: true },
  duration: { type: String, required: true }
});
