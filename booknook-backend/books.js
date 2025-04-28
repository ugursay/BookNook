const express = require("express");
const router = express.Router();
const db = require("./db");

// Tüm kitapları getir
router.get("/books", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM books");
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kitapları getirirken bir hata oluştu." });
  }
});

module.exports = router;
