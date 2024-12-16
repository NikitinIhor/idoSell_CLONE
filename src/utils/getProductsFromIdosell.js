// import axios from 'axios';
// import createHttpError from 'http-errors';
// import ProductsCollection from '../models/Products.js';
// import { env } from './env.js';

// export const getProductsFromIdosell = async () => {
//   try {
//     const API_KEY = env('IDOSELL_API_KEY');
//     if (!API_KEY) {
//       throw createHttpError(404, 'Missing API key');
//     }

//     const options = {
//       method: 'POST',
//       url: 'https://zooart6.yourtechnicaldomain.com/api/admin/v4/orders/orders/get',
//       headers: {
//         'content-type': 'application/json',
//         'X-API-KEY': API_KEY,
//       },
//       data: {
//         params: {
//           ordersStatuses: ['finished'],
//           resultsPage: 1,
//         },
//       },
//     };

//     const res = await axios.request(options);
//     const idosellOrders = res.data;

//     const mongoDbOrders = idosellOrders.map(order => ({
//       orderID: order.orderID,
//       products: order.products.map(product => ({
//         productID: product.productID,
//         quantity: product.quantity,
//       })),
//       orderWorth: order.orderWorth,
//     }));

//     await ProductsCollection.insertMany(mongoDbOrders);
//     console.log('Orders successfully saved to MongoDB.');
//   } catch (error) {
//     console.error(error.message);
//   }
// };
