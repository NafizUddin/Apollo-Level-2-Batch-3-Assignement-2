import { Request, Response } from 'express';
import orderValidationSchema from './orders.zod.validation';
import { OrderServices } from './orders.services';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const zodParsedOrderData = orderValidationSchema.parse(orderData);

    const result = await OrderServices.createOrderIntoDB(zodParsedOrderData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Oops! Something went wrong!',
      error: error,
    });
  }
};

export const OrderControllers = {
  createOrder,
};
