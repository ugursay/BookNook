import express from "express";
import db from "../db.js";

const router = express.Router();

// Tüm kitapları getir
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM books");
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kitapları getirirken bir hata oluştu." });
  }
});

// Yeni kitap ekle
router.post("/", async (req, res) => {
  const { title, author } = req.body;

  try {
    const [result] = await db.execute(
      "INSERT INTO books (title, author) VALUES (?, ?)",
      [title, author]
    );

    res.status(201).json({
      message: "Kitap başarıyla eklendi",
      bookId: result.insertId,
    });
  } catch (error) {
    console.error("Kitap eklenirken hata oluştu:", error);
    res.status(500).json({ error: "Kitap eklenemedi" });
  }
});

router.put("/:id", async (req, res) => {
  const bookId = req.params.id;
  const { title, author } = req.body;

  try {
    const [result] = await db.execute(
      "UPDATE books SET title=?, author=? WHERE id=?",
      [title, author, bookId]
    );
    if (result.affectedRows === 0) {
      //Where koşuluna uymazsa
      return res.status(404).json({ error: "kitap bulunamadı" });
    }
    if (result.changedRows === 0) {
      return res.status(200).json({
        message: "kitap zaten bu şekilde kayıtlı, değişiklik yapılmadı",
      });
    }
    res.status(200).json({ message: "kitap başarıyla güncellendi" });
  } catch (error) {
    console.log("kitap güncellenirken hata oluştu");
    res.status(500).json({ error: "kitap güncellenemedi" });
  }
});

router.delete("/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    const [result] = await db.execute("DELETE FROM books WHERE id=?", [bookId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Kitap bulunamadı" });
    }
    res.status(200).json({ message: "Kitap başarıyla silindi" });
  } catch (error) {
    console.log("kitap silinirken hata oluştu:", error);
    res.status(500).json({ error: "kitap silinemedi" });
  }
});

export default router;
