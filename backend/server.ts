import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import productRoutes from './routes/productRoutes';
import authRoutes from './routes/authRoutes';
import orderRoutes from './routes/orderRoutes';
import bulkProducts from './routes/bulkProducts';
// import cart from './routes/cart';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from the public directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/admin/',productRoutes)
app.use('/api/products', productRoutes);
console.log("req send on auth routes");
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/bulkProducts',bulkProducts);
// app.use('/api/user/cart',cart);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
