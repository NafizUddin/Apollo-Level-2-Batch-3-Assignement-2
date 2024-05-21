import { TOrder } from './orders.interface';
import { Order } from './orders.model';

const createOrderIntoDB = async (payload: TOrder) => {
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
