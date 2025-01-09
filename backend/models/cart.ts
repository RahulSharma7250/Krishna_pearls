import mongoose from 'mongoose';

// Define the Cart schema (if not already defined)
const cartSchema = new mongoose.Schema({
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

// Method to update the total price
cartSchema.methods.updateTotalPrice = async function () {
    let total = 0;
    for (let item of this.items) {
      const product = await mongoose.model('Product').findById(item.productId);
      if (product) {
        total += product.price * item.quantity;
      }
    }
    this.totalPrice = total;
    await this.save();
  };

export default mongoose.model('Cart', cartSchema);