import { model, Schema } from 'mongoose';

const productsSchema = new Schema(
  {
    orderId: { type: Number, required: true },
    products: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    orderWorth: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const ProductsCollection = model('product', productsSchema);

export default ProductsCollection;
