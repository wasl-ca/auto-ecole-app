const express = require("express");
const { loginAndFetchExams } = require("../services/atttService");
const { syncExams } = require("../controllers/atttController");

const router = express.Router();

router.get("/exams", async (req, res) => {
  try {
    const exams = await loginAndFetchExams();

    res.json(exams);
  } catch (err) {
    res.status(500).json({ error: "ATTT scraping failed. "+ err.message });
  }
});

router.get("/sync",syncExams);


module.exports = router;
