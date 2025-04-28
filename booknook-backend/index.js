const express = require("express");
const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("BookNook API çalışıyor 📚");
});

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
