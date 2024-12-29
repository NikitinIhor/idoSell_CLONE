import ProductsCollection from '../models/Products.js';

export const getAllProducts = filter => {
  const and = [];
  if (filter.minWorth) {
    and.push({ orderWorth: { $gte: filter.minWorth } });
  }
  if (filter.maxWorth) {
    and.push({ orderWorth: { $lte: filter.maxWorth } });
  }

  return ProductsCollection.find({
    $and: and,
  });
};

export const getProductById = id => ProductsCollection.findById(id);

export const createProduct = payload => ProductsCollection.create(payload);

export const upsertProduct = async (filter, data, options = {}) => {
  const rowResult = await ProductsCollection.findByIdAndUpdate(filter, data, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!rowResult || !rowResult.value) return null;

  return {
    data: rowResult.value,
    isNew: Boolean(rowResult?.lastErrorObject?.upserted),
  };
};

export const deleteProduct = filter => ProductsCollection.deleteOne(filter);
