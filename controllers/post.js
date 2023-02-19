const jwt = require("jsonwebtoken");
const db = require("../db");
require("dotenv").config();

const getPosts = (req, res) => {
  const query = req.query.cat
    ? `SELECT 
        p.id,
        p.title,
        p.desc,
        p.img,
        p.date,
        p.uid,
        p.cat_id,
        cp.category as cat  
      FROM categories_posts cp 
      JOIN posts p ON cp.id=p.cat_id
      WHERE cp.category = ?;`
    : `SELECT  
        p.id,
        p.title,
        p.desc,
        p.img,
        p.date,
        p.uid,
        p.cat_id,
        cp.category as cat 
      FROM categories_posts cp 
      JOIN posts p ON cp.id=p.cat_id`;

  // SELECT column FROM table
  // ORDER BY RAND()
  // LIMIT 10
  db.query(query, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

const getPost = (req, res) => {
  const query = `
  SELECT u.username,
    u.img as userImage,
    p.id,
    p.title,
    p.desc,
    p.img,
    p.date,
    p.uid,
    p.cat_id,
    cp.category as cat
  FROM categories_posts cp
    JOIN posts p ON cp.id = p.cat_id
    JOIN users u ON p.uid = u.id
  WHERE p.id = ?;
  `;

  db.query(query, [req.params.id], (err, data) => {
    if (err) return res.send(err);

    if (data.length === 0)
      return res.status(404).json({ message: "Post not found" });

    return res.status(200).json(data);
  });
};

const addPost = (req, res) => {
  // get the category id
  const queryCat = "SELECT id FROM categories_posts WHERE category = ?";

  db.query(queryCat, [req.body.cat], (err, data) => {
    if (err) return res.status(500).json(err);

    req.body.cat = data[0].id;

    const query =
      "INSERT INTO posts(`uid`, `title`, `desc`, `img`, `cat_id`, `date`) VALUES(?)";

    const values = [
      req.userInfo.id,
      req.body.title,
      req.body.desc,
      req.body.img ||
        "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&dpr=2",
      req.body.cat,
      req.body.date,
    ];

    db.query(query, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res
        .status(200)
        .json({ msg: "Post created successfully!", id: data.insertId });
    });
  });
};

const deletePost = (req, res) => {
  const postId = req.params.id;

  const query = "DELETE FROM posts WHERE id = ? AND uid = ?";

  db.query(query, [postId, req.userInfo.id], (err, data) => {
    if (err) return res.status(403).json("You can only delete your own posts!");

    return res.status(200).json("Post deleted successfully!");
  });
};

const updatePost = (req, res) => {
  const queryCat = "SELECT id FROM categories_posts WHERE category = ?";

  db.query(queryCat, [req.body.cat], (err, data) => {
    if (err) return res.status(500).json(err);

    req.body.cat = data[0].id;

    const query = req.body.img
      ? "UPDATE posts SET title=?, `desc`=?, img=?, cat_id=? WHERE id=? AND uid=?"
      : "UPDATE posts SET title=?, `desc`=?, cat_id=? WHERE id=? AND uid=?";
    const values = req.body.img
      ? [
          req.body.title,
          req.body.desc,
          req.body.img,
          req.body.cat,
          req.params.id,
          req.userInfo.id,
        ]
      : [
          req.body.title,
          req.body.desc,
          req.body.cat,
          req.params.id,
          req.userInfo.id,
        ];

    db.query(query, [...values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("Post updated successfully!");
    });
  });
};

module.exports = {
  getPosts,
  getPost,
  addPost,
  deletePost,
  updatePost,
};
