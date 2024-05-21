"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const orders_controllers_1 = require("./orders.controllers");
const router = express_1.default.Router();
router.post('/', orders_controllers_1.OrderControllers.createOrder);
exports.OrderRoutes = router;
