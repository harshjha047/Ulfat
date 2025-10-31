const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const addressSchema = new mongoose.Schema(
  {
    label: { type: String, default: "Home" }, // Home, Work, etc.
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    zip: { type: String, trim: true },
    country: { type: String, trim: true },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please enter your name"] },
    email: {type: String,required: [true, "Please enter your email"],unique: true,match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email",],},
    password: { type: String, required: [true, "Please enter a password"], minlength: [8, "Password must be at least 8 characters"], select: false,},
    role: { type: String, enum: ["customer", "seller", "admin"], default: "customer",},

    // Profile
    profilePhoto: {type: String, default: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",},
    phone: { type: String, trim: true },

    // Shopping Data
    addresses: [addressSchema],
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart", },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],

    // 💳 Payment & Security
    customerId: {type: String,},
    savedCards: [{ cardBrand: String, last4: String, expMonth: Number, expYear: Number, tokenId: String, },],
  },
  { timestamps: true }
);

// Encrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
