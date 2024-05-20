import { Request, Response } from 'express';
import { ProductServices } from './product.services';
import productValidationSchema from './product.zod.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    const productParsedData = productValidationSchema.parse(productData);

    const result = await ProductServices.createProductIntoDB(productParsedData);

    res.status(200).json({
      success: true,
      message: 'Product created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Oopss! Something went wrong!',
      error: error,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductsFromDB();
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
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

export const ProductControllers = {
  createProduct,
  getAllProducts,
};
