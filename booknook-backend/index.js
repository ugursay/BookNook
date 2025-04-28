const cors = require("cors");
const express = require("express");
const app = express();
const bookRoutes = require("./books");
const quoteRoutes = require("./quotes");

const PORT = 5000;

app.use(cors());
app.use(express.json());

// Ana sayfa
app.get("/", (req, res) => {
  res.send("BookNook API çalışıyor 📚");
});

// API yolları
app.use("/api", bookRoutes);
app.use("/api", quoteRoutes);

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
