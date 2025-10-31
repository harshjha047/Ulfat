// src/services/orderService.js
import api from "./api";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);


const orderService = {
  getUserOrders: async () => {
    const { data } = await api.get("/orders/my");
    return data;
  },

  getOrderById: async (orderId) => {
    const { data } = await api.get(`/orders/${orderId}`);
    return data;
  },

  cancelOrder: async (orderId) => {
    const { data } = await api.put(`/orders/${orderId}/cancel`);
    return data;
  },

  trackOrder: async (trackingId) => {
    const { data } = await api.get(`/orders/track/${trackingId}`);
    return data;
  },
  createCheckoutSession: async (e) => {
    const stripe = await stripePromise;
    const { data } = await api.post(`/payment/create-checkout-session`, e);
    window.location.href = data.url; // Redirect to Stripe checkout
    return data;
  },

  // Admin routes
  getAllOrders: async () => {
    const { data } = await api.get("/admin/orders");
    return data;
  },

  updateOrderStatus: async (orderId, status) => {
    const { data } = await api.put(`/admin/orders/${orderId}`, { status });
    return data;
  },
};

export default orderService;
