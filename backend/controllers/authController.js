const jwt = require("jsonwebtoken");

// Dummy user
const USER = {
  email: "admin@example.com",
  password: "password123" // In production, hash and store in DB
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (email !== USER.email || password !== USER.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });

  res.json({ email, token });
};
