import axios from 'axios';
import { MongoDB } from '../db/MongoDB.js';
import ProductsCollection from '../models/Products.js';
import { env } from './env.js';

const API_KEY = env('IDOSEL_API_KEY');
const API_URL = env('IDOSEL_API_URL');

const config = {
  method: 'post',
  url: API_URL,
  headers: {
    'X-API-KEY': API_KEY,
    'Content-Type': 'application/json',
  },
  data: JSON.stringify({
    params: {
      ordersStatuses: ['finished'],
      resultsPage: 1,
    },
  }),
};

axios
  .request(config)
  .then(async response => {
    for (const res of response.data.Results) {
      await MongoDB();

      const products = res.orderDetails.productsResults.map(product => ({
        productId: product.productId,
        quantity: product.productQuantity,
      }));

      const orderWorth = res.orderDetails.productsResults.reduce(
        (acc, product) => acc + product.productOrderPrice,
        0
      );

      const orderData = {
        orderId: res.orderId,
        products: products,
        orderWorth: orderWorth,
      };
      try {
        const existingOrder = await ProductsCollection.findOne({
          orderId: res.orderId,
        });

        if (existingOrder) {
          existingOrder.products = products;
          existingOrder.orderWorth = orderWorth;
          await existingOrder.save();
        } else {
          const newOrder = new ProductsCollection(orderData);
          await newOrder.save();
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  })
  .catch(error => {
    console.error(error.message);
  });
