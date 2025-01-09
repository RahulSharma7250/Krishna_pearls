import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Cart from '../models/cart';

const router = express.Router();

// Helper function to generate a JWT
const generateToken = (userId: string, role: string): string => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
};

// Register a new user
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the user but do not save yet
    const newUser = new User({ name, email, password: hashedPassword });

    // Create a cart for the user
    const newCart = new Cart({ userId: newUser._id, items: [] });
    await newCart.save();

    // Assign the cart ID to the user's cartId field
    newUser.cartId = newCart._id;

    // Save the new user
    await newUser.save();

    // Generate a JWT for the new user
    const token = generateToken(newUser._id.toString(), newUser.role);

    res.status(201).json({ token, message: 'User created successfully' });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Login user
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Compare the provided password with the hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Generate a JWT for the logged-in user
    const token = generateToken(user._id.toString(), user.role);

    res.json({ token, userId: user._id, message: 'Login successful' });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

export default router;
