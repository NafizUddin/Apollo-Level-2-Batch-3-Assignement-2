"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productVariantSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: [true, 'Variant type is required'],
    },
    value: {
        type: String,
        required: [true, 'Variant value is required'],
    },
});
const inventorySchema = new mongoose_1.Schema({
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
const productSchema = new mongoose_1.Schema({
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
            validator: (tags) => tags.length <= 10,
            message: 'Tags cannot exceed 10 entries',
        },
    },
    variants: {
        type: [productVariantSchema],
        required: [true, 'Product must have at least one variant'],
        validate: (v) => Array.isArray(v) && v.length > 0,
    },
    inventory: {
        type: inventorySchema,
        required: [true, 'Inventory information is required'],
    },
});
productSchema.statics.isProductExists = function (productName) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingProduct = yield exports.Product.findOne({ name: productName });
        return existingProduct;
    });
};
// Creating text search index
productSchema.index({ name: 'text', description: 'text', category: 'text' });
exports.Product = (0, mongoose_1.model)('Product', productSchema);
