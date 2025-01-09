"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const bulkProducts_1 = __importDefault(require("./routes/bulkProducts"));
// import cart from './routes/cart';
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Serve static files from the public directory
app.use('/public', express_1.default.static(path_1.default.join(__dirname, 'public')));
// Connect to MongoDB
mongoose_1.default.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));
// Routes
app.use('/api/admin/', productRoutes_1.default);
app.use('/api/products', productRoutes_1.default);
console.log("req send on auth routes");
app.use('/api/auth', authRoutes_1.default);
app.use('/api/orders', orderRoutes_1.default);
app.use('/api/bulkProducts', bulkProducts_1.default);
// app.use('/api/user/cart',cart);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
