const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "book_quotes",
});

module.exports = pool.promise();
