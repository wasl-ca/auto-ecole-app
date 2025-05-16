const express = require("express");
const { loginToATTT, getExamDates } = require("../services/atttService");

const router = express.Router();

router.get("/exams", async (req, res) => {
  try {
    const { username, password } = req.query;

    if (!username || !password) {
      return res.status(400).json({ error: "Missing credentials" });
    }

    await loginToATTT(username, password);
    const exams = await getExamDates();

    res.json(exams);
  } catch (err) {
    res.status(500).json({ error: "ATTT scraping failed" });
  }
});

module.exports = router;
