const db = require("../db");

const query = `
        CREATE TABLE IF NOT EXISTS users (
          id int auto_increment NOT NULL,
          username varchar(255) NOT NULL,
          email varchar(255) NOT NULL,
          password varchar(255) NOT NULL,
          img varchar(255) NOT NULL,
          PRIMARY KEY (id)
        );
`;

module.exports = async () => {
  db.query(query, (err, result) => {
    if (err) throw err;
    console.log("Users table created");
  });
};
