const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "zaxiya",
  password: "Sqlp@ssw0rd",
  database: "blog_app_db",
});

module.exports = db;
