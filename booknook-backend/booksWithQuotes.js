import express from "express";
import db from "./db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [books] = await db.query("SELECT * FROM books");
    const [quotes] = await db.query("SELECT * FROM quotes");

    const bookWithQuotes = books.map((book) => ({
      ...book,
      quotes: quotes.filter((quote) => quote.book_id === book.id),
    }));
    res.status(200).json(bookWithQuotes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "veiler alınırken hata oluştu" });
    console.log(error); //error değişkeninin değeri değiştiği için deneme amaçlı yerleştirdim
  }
});
