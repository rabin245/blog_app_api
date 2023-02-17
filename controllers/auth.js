const bcrypt = require("bcrypt");
const db = require("../db");
const jwt = require("jsonwebtoken");

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
const login = (req, res) => {
  // check if user exists
  const query = "SELECT * FROM users where username = ?";

  db.query(query, [req.body.username], (err, data) => {
    if (err) return res.json(err);

    if (data.length === 0) return res.status(404).json("user not found!");

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};
const logout = (req, res) => {};

module.exports = {
  register,
  login,
  logout,
};
