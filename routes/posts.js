const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPost,
  addPost,
  deletePost,
  updatePost,
} = require("../controllers/post");

const auth = require("../middleware/auth");

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", auth, addPost);
router.delete("/:id", auth, deletePost);
router.put("/:id", auth, updatePost);

module.exports = router;
