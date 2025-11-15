const razorpay = require("../config/razorpay");
const crypto = require("crypto");
const Order = require("../models/orderModel");
const { log } = require("console");

exports.createRazorpayOrder = async (req, res) => {
  try {
    
    const  orderId  = req.body.order._id;
    

    if (!orderId) {
      return res.status(400).json({ success: false, message: "Order ID is required" });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const amountInPaise = order.totalAmount * 100;

    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: "receipt_" + order._id,
      notes: {
        orderId: order._id.toString(),
      },
    });

    // Save razorpay order ID in DB (important)
    order.paymentInfo.transactionId = razorpayOrder.id;
    order.paymentInfo.status = "created";
    await order.save();

    return res.json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      amount: amountInPaise,
      currency: "INR",
      key: process.env.RAZORPAY_KEY_ID,
    });

  } catch (error) {
    console.error("Razorpay Order Creation Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating Razorpay order",
    });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Create HMAC SHA256 to verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }

    // Update order in DB
    const order = await Order.findOne({ "paymentInfo.transactionId": razorpay_order_id });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.paymentInfo.status = "Paid";
    order.paymentInfo.method = "Razorpay";
    await order.save();

    return res.json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.error("Payment Verification Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};