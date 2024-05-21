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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = void 0;
const orders_zod_validation_1 = __importDefault(require("./orders.zod.validation"));
const orders_services_1 = require("./orders.services");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const zodParsedOrderData = orders_zod_validation_1.default.parse(orderData);
        const result = yield orders_services_1.OrderServices.createOrderIntoDB(zodParsedOrderData);
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Oops! Something went wrong!',
            error: error,
        });
    }
});
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryEmail = req.query.email;
        if (queryEmail) {
            function validateEmail(email) {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(email);
            }
            if (validateEmail(queryEmail)) {
                // check if the user email exist
                const result = yield orders_services_1.OrderServices.getOrdersFromDB(queryEmail);
                if (result.length > 0) {
                    res.status(200).json({
                        success: true,
                        message: `Orders fetched successfully for ${queryEmail}!`,
                        data: result,
                    });
                }
                else {
                    res.status(500).json({
                        success: false,
                        message: 'Order not found',
                    });
                }
            }
            else {
                res.status(500).json({ success: false, message: 'Invalid Email' });
            }
        }
        const result = yield orders_services_1.OrderServices.getOrdersFromDB('');
        if (result.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Orders fetched successfully!',
                data: result,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Order not found',
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Oops! Something went wrong!',
            error: error,
        });
    }
});
exports.OrderControllers = {
    createOrder,
    getOrders,
};
