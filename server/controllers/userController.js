const User = require("../models/userModel");

/* =========================
   GET STATS
========================= */
exports.getStats = async (req, res) => {
  try {
    const total = await User.countDocuments();
    const active = await User.countDocuments({ status: "Active" });
    const inactive = await User.countDocuments({ status: "Inactive" });

    res.status(200).json({ total, active, inactive });
  } catch (error) {
    res.status(500).json({
      message: "fetch stats error",
      error: error.message,
    });
  }
};

/* =========================
   SEARCH USERS
========================= */
exports.searchUsers = async (req, res) => {
  try {
    const query = req.params.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const searchQuery = {
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } },
        { status: { $regex: query, $options: "i" } },
      ],
    };

    const users = await User.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(searchQuery);

    res.status(200).json({
      users,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalUsers: total,
    });
  } catch (error) {
    res.status(500).json({
      message: "search error",
      error: error.message,
    });
  }
};

/* =========================
   GET ALL USERS
========================= */
exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    res.status(200).json({
      users,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalUsers: total,
    });
  } catch (error) {
    res.status(500).json({
      message: "get users error",
      error: error.message,
    });
  }
};

/* =========================
   GET USER BY ID
========================= */
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "get user error",
      error: error.message,
    });
  }
};

/* =========================
   CREATE USER
========================= */
exports.createUser = async (req, res) => {
  try {
    let { name, email, phone, status } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        message: "Name, email and phone are required",
      });
    }

    // Normalize status
    status = status
      ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
      : "Active";

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const user = new User({
      name,
      email,
      phone,
      status,
    });

    await user.save();

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "create user error",
      error: error.message,
    });
  }
};

/* =========================
   UPDATE USER
========================= */
exports.updateUser = async (req, res) => {
  try {
    let { name, email, phone, status } = req.body;

    // Normalize status
    if (status) {
      status =
        status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
    }

    // Check duplicate email
    if (email) {
      const exists = await User.findOne({
        email,
        _id: { $ne: req.params.id },
      });

      if (exists) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, status },
      { new: true, runValidators: true }
    );

    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "update user error",
      error: error.message,
    });
  }
};

/* =========================
   DELETE USER
========================= */
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "delete user error",
      error: error.message,
    });
  }
};
