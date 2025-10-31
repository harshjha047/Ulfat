const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middlewares/authMiddleware");
const {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/adminController");
const upload = require("../middlewares/uploadMiddleware");

// Protect all admin routes
router.use(protect, admin);

// --- User routes ---
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);// not use
router.patch("/users/:id/role", updateUserRole); // not use
router.delete("/users/:id", deleteUser);

// --- Product routes ---
router.post("/products", protect, admin, upload.array("images"), createProduct);
// router.post("/products",protect, upload.array("images"), createProduct)
router.put("/products/:id",protect ,upload.array("images"), updateProduct);
router.delete("/products/:id", deleteProduct);

// --- Order routes ---
router.get("/orders", getAllOrders);
router.patch("/orders/:id/status", updateOrderStatus);

module.exports = router;
