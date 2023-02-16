const bcrypt = require("bcrypt");
const db = require("../db");

const register = (req, res) => {
  // check if user exists
  const query = "SELECT * FROM users where email = ? OR username = ?";

  db.query(query, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json(err);

    if (data.length) return res.status(409).json("User already exists");

    // hash the password and create user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const query =
      "INSERT INTO users(`username`, `email`, `password`) VALUES(?)";

    const values = [req.body.username, req.body.email, hash];

    db.query(query, [values], (err, data) => {
      if (err) return res.json(err);

      res.status(200).json({
        message: "User created successfully",
        data,
      });
    });
  });
};
const login = (req, res) => {};
const logout = (req, res) => {};

module.exports = {
  register,
  login,
  logout,
};
