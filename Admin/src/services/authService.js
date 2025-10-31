// src/services/authService.js
import api, { setAccessToken, clearAccessToken } from "./api";

const authService = {
  register: async (payload) => {
    const { data } = await api.post("/users/register", payload, {
      withCredentials: true,
    });
    return data;
  },

  login: async (credentials) => {
    const { data } = await api.post("/users/login", credentials);
    if (data.accessToken) setAccessToken(data.accessToken);
    return data;
  },

  //profile

  logout: async () => {
    try {
      await api.post("/users/logout");
    } finally {
      clearAccessToken();
    }
  },

  getProfile: async () => {
    const { data } = await api.get("/users/me");
    return data;
  },

  editProfile: async (info) => {
    const { data } = await api.put("/users/me", info);
    return data;
  },

  getWishlist: async () => {
    const { data } = await api.get("/users/wishlist");
    return data;
  },

  addToWishlist: async (productId) => {
    const { data } = await api.post(`/users/wishlist/${productId}`);
    return data;
  },

  removeFromWishlist: async (productId) => {
    const { data } = await api.delete(`/users/wishlist/${productId}`);
    return data;
  },
  //admin

  //users
  deleteUser: async (productId) => {
    const { data } = await api.delete(`admin/users/${productId}`);
    return data;
  },
  getAllUsers: async () => {
    const { data } = await api.get(`admin/users`);
    return data;
  },

  //products
  createProduct: async (e) => {
    console.log(e);
    const { data } = await api.post(`admin/products`, e);
    return data;
  },
  updateProduct: async (PID, formData) => {
    const { data } = await api.put(`admin/products/${PID}`,formData);
    return data;
  },
  deleteProduct: async (e) => {
    const { data } = await api.delete(`admin/products/${e}`);
    return data;
  },
};

export default authService;
