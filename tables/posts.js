const db = require("../db");

const query =
  `
CREATE TABLE IF NOT EXISTS posts (
	id int auto_increment NOT NULL,
	title varchar(255) NOT NULL,` +
  "`desc`" +
  `text NOT NULL,
	img varchar(255) NULL, ` +
  "`date`" +
  `datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
	uid int NOT NULL,
	cat_id int DEFAULT 7 NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (cat_id) REFERENCES categories_posts(id) ON DELETE RESTRICT ON UPDATE RESTRICT,
	FOREIGN KEY (uid) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);
`;

module.exports = async () => {
  db.query(query, (err, result) => {
    if (err) throw err;
    console.log("Posts table created");
  });
};
