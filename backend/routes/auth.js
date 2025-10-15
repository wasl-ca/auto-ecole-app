const express = require("express");
const { login, me, menu } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/login", login);
router.get("/me", protect, me);
router.get("/menu", protect, menu);

module.exports = router;
