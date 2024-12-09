import { model, Schema } from 'mongoose';

const productsSchema = new Schema({
  orderID: { type: String, required: true },
  products: [
    {
      productID: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  orderWorth: { type: Number, required: true },
});

const ProductsCollection = model('products', productsSchema);

export default ProductsCollection;