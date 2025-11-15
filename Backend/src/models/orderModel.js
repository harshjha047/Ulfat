// models/Order.js
const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true }, // same type as cart
  productName: { type: String, required: true },
  size: { type: String },
  quantity: { type: Number, required: true, min: 1 },
  priceAtOrder: { type: Number, required: true }, // snapshot of price when ordered
  subtotal: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [orderItemSchema],

    totalAmount: { type: Number, required: true },

    paymentInfo: {
      method: { type: String, default: "UPI" },
      status: {
        type: String,
        enum: ["Pending","created", "Paid", "Failed"],
        default: "Pending",
      },
      transactionId: { type: String },
      provider: { type: String },
    },

    shippingAddress: {
      name: String,
      phone: String,
      email:String,
      street: String,
      city: String,
      state: String,
      postalCode: String,
    },

    orderStatus: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
