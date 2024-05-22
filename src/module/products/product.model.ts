import { Schema, model } from 'mongoose';
import {
  ProductModel,
  TInventory,
  TProduct,
  TProductVariants,
} from './product.interface';

const productVariantSchema = new Schema<TProductVariants>({
  type: {
    type: String,
    required: [true, 'Variant type is required'],
  },
  value: {
    type: String,
    required: [true, 'Variant value is required'],
  },
});

const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: [true, 'Inventory quantity is required'],
    min: 0, // Minimum quantity of 0
  },
  inStock: {
    type: Boolean,
    required: [true, 'In-stock status is required'],
  },
});

const productSchema = new Schema<TProduct, ProductModel>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [3, 'Name must be at least 3 characters long'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0.01,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
  tags: {
    type: [String],
    required: [true, 'Tag is required'],
    validate: {
      validator: (tags: string[]) => tags.length <= 10,
      message: 'Tags cannot exceed 10 entries',
    },
  },
  variants: {
    type: [productVariantSchema],
    required: [true, 'Product must have at least one variant'],
    validate: (v: TProductVariants[]) => Array.isArray(v) && v.length > 0,
  },
  inventory: {
    type: inventorySchema,
    required: [true, 'Inventory information is required'],
  },
});

productSchema.statics.isProductExists = async function (productName: string) {
  const existingProduct = await Product.findOne({ name: productName });
  return existingProduct;
};

// Creating text search index
productSchema.index({ name: 'text', description: 'text', category: 'text' });

export const Product = model<TProduct, ProductModel>('Product', productSchema);
