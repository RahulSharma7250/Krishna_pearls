import express from 'express';
import { Request, Response, NextFunction } from 'express';
import Order from '../models/Order';
import { AuthRequest } from '../middleware/authMiddleware';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Create a new order
router.post('/', authMiddleware, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { products, totalAmount, shippingAddress } = req.body;
    const newOrder = new Order({
      user: req.userId,
      products,
      totalAmount,
      shippingAddress,
    });
    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', orderId: newOrder._id });
    return;
  } catch (error) {
    res.status(500).json({ message: 'Error creating order' });
  }
});

// Get user's orders
router.get('/', authMiddleware, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const orders = await Order.find({ user: req.userId }).populate('products.product');
    res.json(orders);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

export default router;

