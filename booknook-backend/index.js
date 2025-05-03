import express from "express";
import cors from "cors";
import bookRoutes from "./routes/books"; // books route'larını import ettik
import quoteRoutes from "./routes/quotes"; // quotes route'larını import ettik
import booksWithQuotes from "./routes/booksWithQuotes"; // booksWithQuotes route'larını import ettik

const app = express(); // app nesnesi burada tanımlanmalı
const PORT = 5000;

// CORS ve JSON middleware'lerini kullanıyoruz
app.use(cors());
app.use(express.json());

// Ana sayfa
app.get("/", (req, res) => {
  res.send("BookNook API çalışıyor 📚");
});

// API yolları
app.use("/api/books", bookRoutes); // Kitaplarla ilgili işlemler
app.use("/api/quotes", quoteRoutes); // Alıntılarla ilgili işlemler
app.use("/api", booksWithQuotes); // Kitaplar ve alıntılarla ilgili işlemler

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
