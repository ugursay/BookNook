import express from "express";
import cors from "cors";

import bookRoutes from "./router/books.js";
import quoteRoutes from "./router/quotes.js";
import booksWithQuotes from "./router/booksWithQuotes.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/booksWithQuotes", (req, res) => {
  res.send("BookNook API çalışıyor 📚");
});

app.use("/api/books", bookRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/books-with-quotes", booksWithQuotes);

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
