const express = require("express");
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

const router = express.Router();

// 🧾 GET all users (admin only)
router.get("/", protect, async (req, res) => {
  const users = await User.find({}, "-password"); // exclude password
  res.json(users);
});

// 🔄 PUT - Update a user's role
router.put("/:id/role", protect, authorize("admin"), async (req, res) => {
  const { role } = req.body;

  if (!["admin", "user"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
  res.json({ message: `User role updated to ${role}`, user });
});

// ❌ DELETE - Remove user
router.delete("/:id", protect, authorize("admin"), async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

router.post("/register", async (req, res) => {
  const { username, password, role , fullName} = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: "All fields are required " + req.body.username});
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = new User({ username, password, role , fullName});
  await newUser.save();
  res.status(201).json({ message: "User registered successfully" });
});

module.exports = router;
