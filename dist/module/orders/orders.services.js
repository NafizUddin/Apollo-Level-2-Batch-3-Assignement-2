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
exports.OrderServices = void 0;
const product_model_1 = require("../products/product.model");
const orders_model_1 = require("./orders.model");
const createOrderIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existProduct = yield product_model_1.Product.findOne({
        _id: payload.productId,
    });
    if (!existProduct) {
        return null;
    }
    if (existProduct.inventory.quantity <= 0 ||
        existProduct.inventory.quantity < payload.quantity) {
        return 'stockOut';
    }
    let { inventory: { quantity }, } = existProduct;
    quantity = quantity - payload.quantity;
    existProduct.inventory.quantity = quantity;
    if (quantity === 0) {
        existProduct.inventory.inStock = false;
    }
    const updateResult = yield product_model_1.Product.findOneAndUpdate({ _id: existProduct._id }, existProduct, { new: true });
    const result = yield orders_model_1.Order.create(payload);
    return result;
});
const getOrdersFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    if (email) {
        const result = yield orders_model_1.Order.find({ email });
        return result;
    }
    const result = yield orders_model_1.Order.find();
    return result;
});
exports.OrderServices = {
    createOrderIntoDB,
    getOrdersFromDB,
};
