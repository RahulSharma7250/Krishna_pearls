import express from 'express';
import { Request, Response, NextFunction } from 'express';
import Product from '../models/Product';
import upload from '../middleware/uploadMiddleware';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';

const router = express.Router();

// Get all products
router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// Get a single product
router.get('/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// Create a new product (with image upload)
router.post('/', authMiddleware, upload.single('image'), async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, origin, price, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    const newProduct = new Product({
      name,
      origin,
      price,
      image,
      description,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

// Update a product (with image upload)
router.put('/:id', authMiddleware, upload.single('image'), async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, origin, price, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, origin, price, description, ...(image && { image }) },
      { new: true }
    );

    if (!updatedProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

// Delete a product
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;

