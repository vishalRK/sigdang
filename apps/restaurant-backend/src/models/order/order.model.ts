import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        product: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    paymentDetails: {
      stripePaymentIntentId: { type: String },
      stripePaymentMethodId: { type: String },
      stripeCustomerId: { type: String },
    },
    createdAt: { type: Date, default: Date.now },
  });
export const Cart = mongoose.model('order', orderSchema);


