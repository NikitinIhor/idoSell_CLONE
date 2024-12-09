import mongoose from 'mongoose';
import { env } from '../utils/env.js';

export const MongoDB = async () => {
  try {
    const user = env('MONGODB_USER');
    const password = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');
    const bd = env('MONGODB_DB');

    const DB_HOST = `mongodb+srv://${user}:${password}@${url}/${bd}?retryWrites=true&w=majority&appName=Cluster0`;

    await mongoose.connect(DB_HOST);
    console.log(`MongoDB connection seccessfully`);
  } catch (error) {
    console.log(`MongoDB connection error`, error.message);
    throw error;
  }
};
