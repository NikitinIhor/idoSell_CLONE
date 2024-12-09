import axios from 'axios';
import { env } from './env.js';

export const DATA = async () => {
  try {
    const API_KEY = env('API_KEY');
    axios.defaults.baseURL = 'https://api.idosell.com/orders';

    const res = await axios.get('/', {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error('Error from IdoSell API:', error.message);
    throw error;
  }
};
DATA();
