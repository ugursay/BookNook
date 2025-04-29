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

// Yeni kitap ekle
router.post("/books", async (req, res) => {
  const { title, author } = req.body;

  try {
    const [result] = await db.execute(
      "INSERT INTO books (title, author) VALUES (?, ?)",
      [title, author]
    );

    res
      .status(201)
      .json({ message: "Kitap başarıyla eklendi", bookId: result.insertId });
  } catch (error) {
    console.error("Kitap eklenirken hata oluştu:", error);
    res.status(500).json({ error: "Kitap eklenemedi" });
  }
});

module.exports = router;
