const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  alt: { type: String },
});

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    comment: { type: String },
    rating: { type: Number, min: 1, max: 5, required: true },
  },
  { timestamps: true }
);

const variantSchema = new mongoose.Schema({
  ProductID:{ type: String, required: true }
});
const sizeSchema = new mongoose.Schema({
  Size:{ type: String, required: true }
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number },
    category: { type: String, required: true },
    size:[sizeSchema],
    images: [imageSchema],
    reviews: [reviewSchema],
    variants: [variantSchema],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
