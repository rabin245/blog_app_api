const db = require("../db");

const getPosts = (req, res) => {
  const query = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  db.query(query, [req.query.cat], (err, data) => {
    if (err) return res.send(err);

    return res.status(200).json(data);
  });
};

const getPost = (req, res) => {
  const query =
    "SELECT u.username, u.img AS userImage, p.title, p.desc, p.img, p.date, p.cat FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

  db.query(query, [req.params.id], (err, data) => {
    if (err) return res.send(err);

    if (data.length === 0)
      return res.status(404).json({ message: "Post not found" });

    return res.status(200).json(data);
  });
};
const addPost = (req, res) => {
  res.send("from controller");
};

const deletePost = (req, res) => {
  res.send("from controller");
};

const updatePost = (req, res) => {
  res.send("from controller");
};

module.exports = {
  getPosts,
  getPost,
  addPost,
  deletePost,
  updatePost,
};
