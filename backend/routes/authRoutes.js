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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const cart_1 = __importDefault(require("../models/cart"));
const router = express_1.default.Router();
// Helper function to generate a JWT
const generateToken = (userId, role) => {
    return jsonwebtoken_1.default.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
// Register a new user
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        // Check if the user already exists
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        // Hash the user's password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        // Create the user but do not save yet
        const newUser = new User_1.default({ name, email, password: hashedPassword });
        // Create a cart for the user
        const newCart = new cart_1.default({ userId: newUser._id, items: [] });
        yield newCart.save();
        // Assign the cart ID to the user's cartId field
        newUser.cartId = newCart._id;
        // Save the new user
        yield newUser.save();
        // Generate a JWT for the new user
        const token = generateToken(newUser._id.toString(), newUser.role);
        res.status(201).json({ token, message: 'User created successfully' });
    }
    catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: 'Error creating user' });
    }
}));
// Login user
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }
        // Compare the provided password with the hashed password
        const isPasswordCorrect = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }
        // Generate a JWT for the logged-in user
        const token = generateToken(user._id.toString(), user.role);
        res.json({ token, userId: user._id, message: 'Login successful' });
    }
    catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: 'Error logging in' });
    }
}));
exports.default = router;
