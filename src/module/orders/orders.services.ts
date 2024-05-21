import { ObjectId } from 'mongodb';
import { Product } from '../products/product.model';
import { TOrder } from './orders.interface';
import { Order } from './orders.model';

const createOrderIntoDB = async (payload: TOrder) => {
  const existProduct = await Product.findOne({
    _id: new ObjectId(payload.productId),
  });

  if (!existProduct) {
    return null;
  }

  if (
    existProduct.inventory.quantity <= 0 ||
    existProduct.inventory.quantity < payload.quantity
  ) {
    return 'stockOut';
  }

  let {
    inventory: { quantity },
  } = existProduct;

  quantity = quantity - payload.quantity;

  existProduct.inventory.quantity = quantity;

  if (quantity === 0) {
    existProduct.inventory.inStock = false;
  }

  const updateResult = await Product.updateOne(
    { _id: new ObjectId(existProduct._id) },
    { $set: existProduct },
  );

  const result = await Order.create(payload);
  return result;
};

const getOrdersFromDB = async (email: string) => {
  if (email) {
    const result = await Order.find({ email });
    return result;
  }

  const result = await Order.find();
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getOrdersFromDB,
};
