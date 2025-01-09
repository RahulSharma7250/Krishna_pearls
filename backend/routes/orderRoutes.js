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
const express_1 = __importDefault(require("express"));
const Order_1 = __importDefault(require("../models/Order"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Create a new order
router.post('/', authMiddleware_1.authMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { products, totalAmount, shippingAddress } = req.body;
        const newOrder = new Order_1.default({
            user: req.userId,
            products,
            totalAmount,
            shippingAddress,
        });
        yield newOrder.save();
        res.status(201).json({ message: 'Order created successfully', orderId: newOrder._id });
        return;
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating order' });
    }
}));
// Get user's orders
router.get('/', authMiddleware_1.authMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.default.find({ user: req.userId }).populate('products.product');
        res.json(orders);
        return;
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching orders' });
    }
}));
exports.default = router;
