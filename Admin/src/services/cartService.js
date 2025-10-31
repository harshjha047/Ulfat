// src/services/cartService.js
import api from "./api";

const cartService = {
  getCart: async () => {
    const { data } = await api.get("/cart");
    return data;
  },

  addToCart: async (info) => {
    const { data } = await api.post("/cart/add", info);
    return data;
  },

//   updateItem: async (productId, quantity) => {
//     const { data } = await api.put("/cart/update", { productId, quantity });
//     return data;
//   },

  removeItem: async (info) => {
    const { data } = await api.post(`/cart/remove`,info);
    return data;
  },

//   clearCart: async () => {
//     const { data } = await api.delete("/cart/clear");
//     return data;
//   },

//   checkout: async (payload) => {
//     // payload: { addressId, paymentMethod, notes }
//     const { data } = await api.post("/orders/checkout", payload);
//     return data;
//   },
};

export default cartService;
