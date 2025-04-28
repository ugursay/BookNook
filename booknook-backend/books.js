const express = require("express");
const router = express.Router();
const pool = require("./db");

// Kitap ekleme
router.post("/add-book", async (req, res) => {
  const { title, author } = req.body;

  try {
    const [result] = await pool.execute(
      "INSERT INTO books (title, author) VALUES (?, ?)",
      [title, author]
    );
    res
      .status(201)
      .json({ message: "Kitap başarıyla eklendi", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: "Veritabanı hatası" });
  }
});

module.exports = router;
