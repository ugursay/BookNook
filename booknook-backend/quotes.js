const express = require("express");
const router = express.Router();
const db = require("./db");

// Tüm alıntıları getir
router.get("/quotes", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM quotes");
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Alıntıları getirirken bir hata oluştu." });
  }
});

module.exports = router;
