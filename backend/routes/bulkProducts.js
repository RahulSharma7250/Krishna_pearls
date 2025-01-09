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
const bulkProducts_1 = __importDefault(require("../models/bulkProducts"));
const express_1 = __importDefault(require("express"));
const uploadMiddleware_1 = __importDefault(require("../middleware/uploadMiddleware")); // Updated to store in 'public/products'
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Get all products
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield bulkProducts_1.default.find();
        res.json(products);
    }
    catch (error) {
        next(error);
    }
}));
// Get a single product
router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield bulkProducts_1.default.findById(req.params.id);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.json(product);
    }
    catch (error) {
        next(error);
    }
}));
// Create a new product (with image upload)
router.post('/add', authMiddleware_1.authMiddleware, uploadMiddleware_1.default.single('image'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, origin, price, description } = req.body;
        const image = req.file ? `/public/products/${req.file.filename}` : ''; // Updated path
        const newProduct = new bulkProducts_1.default({
            name,
            origin,
            price,
            image,
            description,
        });
        yield newProduct.save();
        res.status(201).json(newProduct);
    }
    catch (error) {
        next(error);
    }
}));
// Update a product (with image upload)
router.put('/update/:id', authMiddleware_1.authMiddleware, uploadMiddleware_1.default.single('image'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, origin, price, description } = req.body;
        const image = req.file ? `/public/products/${req.file.filename}` : undefined; // Updated path
        const updatedProduct = yield bulkProducts_1.default.findByIdAndUpdate(req.params.id, Object.assign({ name, origin, price, description }, (image && { image })), { new: true });
        if (!updatedProduct) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.json(updatedProduct);
    }
    catch (error) {
        next(error);
    }
}));
// Delete a product
router.delete('/delete/:id', authMiddleware_1.authMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProduct = yield bulkProducts_1.default.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.json({ message: 'Product deleted successfully' });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
