const express = require("express");
const router = express.Router();
const pool = require("./db");

// Alıntı ekleme
router.post("/add-quote", async (req, res) => {
  const { book_id, quote, author } = req.body;

  try {
    const [result] = await pool.execute(
      "INSERT INTO quotes (book_id, quote, author) VALUES (?, ?, ?)",
      [book_id, quote, author]
    );
    res
      .status(201)
      .json({ message: "Alıntı başarıyla eklendi", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: "Veritabanı hatası" });
  }
});

module.exports = router;
