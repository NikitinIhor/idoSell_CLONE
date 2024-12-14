import axios from 'axios';
import createHttpError from 'http-errors';
import ProductsCollection from '../models/Products.js';
import { env } from './env.js';

export const getProductsFromIdosell = async () => {
  try {
    axios.defaults.baseURL = 'https://www.idosell.com';
    const API_KEY = env('IDOSEL_API_KEY');

    if (!API_KEY) {
      throw createHttpError(404, 'Missing API key');
    }

    const res = await axios.get('/orders', {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const idosellOrders = res.data;

    const mongoDbOrders = idosellOrders.map(order => ({
      orderID: order.orderID,
      products: order.products.map(product => ({
        productID: product.productID,
        quantity: product.quantity,
      })),
      orderWorth: order.orderWorth,
    }));

    await ProductsCollection.insertMany(mongoDbOrders);
    console.log('Orders successfully saved to MongoDB.');
  } catch (error) {
    console.log(error.message);
  }
};
