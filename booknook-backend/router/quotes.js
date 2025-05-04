import express from "express";
import db from "../db.js";

const router = express.Router();

// Tüm alıntıları getir
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM quotes");
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Alıntılar getirilirken bir hata oluştu." });
  }
});

// Yeni alıntı ekle
router.post("/", async (req, res) => {
  const { book_id, quote, author } = req.body;

  try {
    const [result] = await db.execute(
      "INSERT INTO quotes (book_id, quote, author) VALUES (?, ?, ?)",
      [book_id, quote, author]
    );

    res.status(201).json({
      id: result.insertId,
      message: "Alıntı başarıyla eklendi",
    });
  } catch (error) {
    console.error("Alıntı eklenirken hata oluştu:", error);
    res.status(500).json({ error: "Alıntı eklenemedi." });
  }
});

export default router;
