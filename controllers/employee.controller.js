const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM employees").catch((err) => {
    res.json(err);
  });

  res.json(rows);
});

module.exports = router;
