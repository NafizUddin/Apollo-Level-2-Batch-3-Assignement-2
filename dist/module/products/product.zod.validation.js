"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const productVariantValidationSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, 'Variant type is required'),
    value: zod_1.z.string().min(1, 'Variant value is required'),
});
const inventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z.number().min(0, 'Inventory quantity must be at least 0'),
    inStock: zod_1.z
        .boolean()
        .refine((val) => val !== undefined, 'In-stock status is required'),
});
const productValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(3, 'Name must be at least 3 characters long')
        .refine((val) => val.trim().length > 0, 'Name is required'),
    description: zod_1.z
        .string()
        .refine((val) => val.trim().length > 0, 'Description is required'),
    price: zod_1.z.number().min(0.01, 'Price must be at least 0.01'),
    category: zod_1.z.string().min(1, 'Category is required'),
    tags: zod_1.z.array(zod_1.z.string()).max(10, 'Tags cannot exceed 10 entries'),
    variants: zod_1.z
        .array(productVariantValidationSchema)
        .min(1, 'Product must have at least one variant'),
    inventory: inventoryValidationSchema,
});
exports.default = productValidationSchema;
