const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = User.find({ username, password });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const role = user.role; // Assuming the user object has a role property
  const token = jwt.sign({ username, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ username, token });
};
 // without password
exports.me = async (req, res) => {
  try {
    const username = req.user.username; // Assuming username is set in the request by auth middleware
    const user = await User.findOne({ username }, "-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
