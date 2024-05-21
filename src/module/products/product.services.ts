import { ObjectId } from 'mongodb';
import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProductsFromDB = async (productName: string) => {
  if (productName) {
    const result = await Product.find({ $text: { $search: productName } });
    return result;
  }

  const result = await Product.find();
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findOne({ _id: new ObjectId(id) });
  return result;
};

const updateSingleProductFromDB = async (payload: TProduct, id: string) => {
  const result = await Product.updateOne(
    { _id: new ObjectId(id) },
    { $set: payload },
  );
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await Product.deleteOne({ _id: new ObjectId(id) });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductFromDB,
  deleteProductFromDB,
};
