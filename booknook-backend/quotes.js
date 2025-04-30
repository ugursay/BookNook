const express = require("express");
const router = express.Router();
const db = require("./db");

// Tüm kitapları getir
router.get("/quotes", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM quotes");
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kitapları getirirken bir hata oluştu." });
  }
});

router.post("/quotes", async (req, res) => {
  const { book_id, quote, author } = req.body;

  try {
    const [result] = await db.execute(
      "INSERT INTO quotes (book_id, quote, author) VALUES (?,?,?)",
      [book_id, quote, author]
    );
    res
      .status(201)
      .json({ id: result.insertId, message: "alıntı başarıyla eklendi" });
  } catch (error) {
    console.log("Alıntı eklenirken hata oluştu:", error);
    res.status(500).json({ error: "Alıntı eklenemedi." });
  }
});

module.exports = router;
