require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();
require("dotenv").config();
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/students", require("./routes/students"));
app.use("/api/exams", require("./routes/exams"));
app.use("/api/attt", require("./routes/attt"));
app.use("/api/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
