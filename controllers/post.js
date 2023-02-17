const jwt = require("jsonwebtoken");
const db = require("../db");

const getPosts = (req, res) => {
  const query = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  db.query(query, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

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
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json("Not Authorized!");

  jwt.verify(token, "jwtkey", (err, decodedUserInfo) => {
    if (err) return res.status(403).json("Invalid Token!");

    const postId = req.params.id;

    const query = "DELETE FROM posts WHERE id = ? AND uid = ?";

    db.query(query, [postId, decodedUserInfo.id], (err, data) => {
      if (err)
        return res.status(403).json("You can only delete your own posts!");

      return res.status(200).json("Post deleted successfully!");
    });
  });
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
