const User = require("../models/userModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const uploadToCloudinary = require("../utils/uploadMultipleToCloudinary");

// ---------- USER MANAGEMENT ----------

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single user
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user role
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role || user.role;
    await user.save();

    res.json({ message: "User role updated", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- PRODUCT MANAGEMENT ----------

// Create product
const createProduct = async (req, res) => {
try {
    let {
      name,
      description,
      new_price,
      old_price,
      category,
      images,
      variants,
      removedImages,
      size,
    } = req.body;

    // Parse JSON strings from frontend (FormData converts them to strings)
    if (images && typeof images === "string") images = JSON.parse(images);
    if (variants && typeof variants === "string") variants = JSON.parse(variants);
    if (removedImages && typeof removedImages === "string") removedImages = JSON.parse(removedImages);

    if (!name || !description || !new_price || !category) {
      return res.status(400).json({ success: false, message: "Please fill all required fields" });
    }

    // ✅ Upload files to Cloudinary
    let uploadedImages = [];
    if (req.files && req.files.length > 0) {
      uploadedImages = await Promise.all(
        req.files.map(async (file) => {
          const result = await uploadToCloudinary(file.buffer, "products");
          return { url: result.secure_url, public_id: result.public_id };
        })
      );
    }

    // ✅ Merge any existing image URLs (if editing)
    const finalImages = [
      ...(images || []),
      ...uploadedImages,
    ].filter(Boolean);

    // ✅ Save to MongoDB
    const product = new Product({
      name,
      description,
      new_price,
      old_price,
      category,
      images: finalImages,
      variants: variants || [],
      size: size || [],
    });

    const createdProduct = await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: createdProduct,
    });
  } catch (error) {
    console.error("Product creation error:", error);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

};


// Update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    console.log(product);
    
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Parse incoming JSON fields if needed
    let { name, description, new_price, old_price, category, variants, removedImages, size } = req.body;

    if (variants && typeof variants === "string") {
      variants = JSON.parse(variants);
    }
        if (size && typeof size === "string") {
      size = JSON.parse(size);
    }

    if (removedImages && typeof removedImages === "string") {
      removedImages = JSON.parse(removedImages);
    }

    // --- Update text fields ---
    if (name) product.name = name;
    if (description) product.description = description;
    if (new_price) product.new_price = new_price;
    if (old_price) product.old_price = old_price;
    if (category) product.category = category;
    if (size) product.size = size;
    if (variants) product.variants = variants;

    // --- Remove selected images ---
    if (Array.isArray(removedImages) && removedImages.length > 0) {
      product.images = product.images.filter(
        (img) => !removedImages.includes(img.url)
      );
    }

    // --- Upload new images (if any) ---
    if (req.files && req.files.length > 0) {
      const uploadedImages = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file.buffer, "products"))
      );

      const formattedImages = uploadedImages.map((img) => ({
        url: img.secure_url,
        alt: img.original_filename || "product",
      }));

      product.images = [...product.images, ...formattedImages];
    }

    // --- Save updated product ---
    const updated = await product.save();

    res.json({
      success: true,
      message: "✅ Product updated successfully",
      product: updated,
    });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" })
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- ORDER MANAGEMENT ----------

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.orderStatus = req.body.orderStatus || order.orderStatus;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllOrders,
  updateOrderStatus,
};
