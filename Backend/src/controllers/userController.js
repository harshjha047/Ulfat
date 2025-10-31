const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const  uploadToCloudinary  = require("../utils/uploadToCloudinary");
const cloudinary = require("../config/cloudinary");


//  Register new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create user
    const user = await User.create({
      name,
      email,
      password,
    });
     const generateToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role, 
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", generateToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(201).json( user );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
       const generateToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role, 
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", generateToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json( user );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Forget / Reset Password
const requestReset = async (req, res) => {
  try {
    const { email } = req.body; // get email from request

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this email does not exist" });
    }

    res.status(200).json({ message: "Email verified, OTP sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res
        .status(400)
        .json({ message: "Email and new password are required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update password
    user.password = newPassword;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//  Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserProfile = async (req, res) => {
try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    if (req.file) {
      // delete old photo if not default
      if (
        user.profilePhoto &&
        !user.profilePhoto.includes("Default_pfp.jpg")
      ) {
        const publicId = user.profilePhoto
          .split("/")
          .slice(-1)[0]
          .split(".")[0];
        try {
          await cloudinary.uploader.destroy(`profiles/${publicId}`);
        } catch (err) {
          console.warn("Old image deletion failed:", err.message);
        }
      }

      // Upload new photo
      const result = await uploadToCloudinary(req.file.buffer, "profiles");
      user.profilePhoto = result.secure_url;
    }

    const updatedUser = await user.save();

    const { password, ...userData } = updatedUser.toObject();

    res.status(200).json({
      message: "Profile updated successfully",
      user: userData,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error" });
  }

};


// Get addresses
const getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add address
const addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { label, street, city, state, zip, country, isDefault } = req.body;

    // If new address is set as default, unset previous defaults
    if (isDefault) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
    }

    const newAddress = {
      label: label || "Home",
      street,
      city,
      state,
      zip,
      country,
      isDefault: isDefault || false,
    };

    user.addresses.push(newAddress);
    await user.save();

    res.status(201).json({
      message: "Address added successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update address
const updateAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const address = user.addresses.id(req.params.addressId);

    if (!address) return res.status(404).json({ message: "Address not found" });

    address.name = req.body.name || address.name;
    address.phone = req.body.phone || address.phone;
    address.street = req.body.street || address.street;
    address.city = req.body.city || address.city;
    address.state = req.body.state || address.state;
    address.country = req.body.country || address.country;
    address.zip = req.body.zip || address.zip;

    await user.save();
    res.json({ message: "Address updated", addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete address
const deleteAddress = async (req, res) => {
  try {
    // Step 1: Find the logged-in user
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 2: Find the address
    const address = user.addresses.id(req.params.addressId);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Step 3: Remove the address
    address.deleteOne(); // <--- ✅ This works better than .remove() in newer Mongoose versions

    // Step 4: Save user
    await user.save();

    res.json({ message: "Address deleted", addresses: user.addresses });
  } catch (error) {
    console.error("Delete address error:", error);
    res.status(500).json({ message: error.message });
  }
};

// GET Wishlist
const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("wishlist");
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ADD to Wishlist
const addToWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { productId } = req.params;

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }

    res
      .status(200)
      .json({ message: "Product added to wishlist", wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// REMOVE from Wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const { productId } = req.params;

    user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);

    await user.save();
    res.status(200).json({
      message: "Product removed from wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const logoutUser = (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAddresses,
  updateAddress,
  deleteAddress,
  addAddress,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  requestReset,
  resetPassword,
  logoutUser,
};
