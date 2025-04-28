const express = require("express");
const bookRoutes = require("./books"); // books.js'yi import ettik
const quoteRoutes = require("./quotes"); // quotes.js'yi import ettik
const app = express();
const port = 5000;

app.use("/api", bookRoutes); // Kitaplarla ilgili API'leri yöneten route
app.use("/api", quoteRoutes); // Alıntılarla ilgili API'leri yöneten route

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor`);
});
