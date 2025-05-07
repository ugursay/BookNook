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

router.put("/:id", async (req, res) => {
  const quoteId = req.params.id;
  const { quote, author } = req.body;

  try {
    const [result] = await db.execute(
      "UPDATE quotes SET quote=?,author=? WHERE id=?",
      [quote, author, quoteId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Alıntı Bulunamadı" });
    }

    if (result.changedRows === 0) {
      return res
        .status(200)
        .json({ message: "Alıntı zaten bu şekilde kayıtlı." });
    }

    res.status(200).json({ message: "Alıntı başarıyla güncellendi" });
  } catch (error) {
    console.error("Alıntı güncellenirken hata oluştu:", error);
    res.status(500).json({ error: "Alıntı güncellenemedi" });
  }
});

router.delete("/:id", async (req, res) => {
  const quoteId = req.params.id;

  try {
    const [result] = await db.execute("DELETE FROM quotes WHERE id=?", [
      quoteId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Alıntı bulunamadı" });
    }

    res.status(200).json({ message: "Alıntı başarıyla silindi" });
  } catch (error) {
    console.error("Alıntı silinirken hata oluştu", error);
    res.status(500).json({ error: "Alıntı silinemedi" });
  }
});

export default router;
