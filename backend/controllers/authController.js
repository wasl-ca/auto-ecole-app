const jwt = require("jsonwebtoken");
const User = require("../models/User");
const menuByRole = require("../utils/menuByRole");
const log = require("../utils/logger").log;

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  console.log(user);
  if (!user) {
    log.warn(`Failed login attempt for username: ${username}`);
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const role = user.role; // Assuming the user object has a role property
  const token = jwt.sign({ username, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  log.info(`User ${username} logged in successfully`);
  res.json({ username, token });
};
 // without password
exports.me = async (req, res) => {
  try {
    const username = req.user.username; // Assuming username is set in the request by auth middleware
    const user = await User.findOne({ username }, "-password");
    if (!user) {
      log.warn(`User data request for non-existent user: ${username}`);
      return res.status(404).json({ message: "User not found" })
    };
    res.json(user);
    log.info(`User data fetched for ${username}`);
  } catch (err) {
    log.error(`Error fetching user data for ${req.user.username}: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

exports.menu = async (req, res) => {
  try {
    const username = req.user.username; // Assuming username is set in the request by auth middleware
    const user = await User.findOne({ username }, "-password");
    if (!user) { 
      log.warn(`Menu request for non-existent user: ${username}`);
      return res.status(404).json({ message: "User not found" });
    } 
    const role = user.role; // Assuming the user object has a role property
    const menu = menuByRole(role);
    res.json({ menu });
    log.info(`Menu fetched for user ${username} with role ${role}`);
  } catch (err) {   
    log.error(`Error fetching menu for user ${req.user.username}: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};
