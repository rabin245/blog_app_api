const db = require("../db");

const query = `
        CREATE TABLE IF NOT EXISTS categories_posts (
          id int auto_increment NOT NULL,
          category varchar(100) DEFAULT 'other' NOT NULL,
          PRIMARY KEY (id)
        );
`;

module.exports = async () => {
  db.query(query, (err, result) => {
    if (err) throw err;
    console.log("Categories table created");
  });
};
