const express = require("express");
const authorize = require("../middleware/authorize");
const {
    getAllUsers,
    getUserById,
    getUsersByRole,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware); // Protect all routes below
router.get("/", getAllUsers);
router.get("/:id", authorize("admin"), getUserById);
router.get("/role/:role", getUsersByRole);
router.post("/", createUser);
router.put("/:id", authorize("admin"), updateUser);
router.delete("/:id", deleteUser);
module.exports = router;
