const express = require("express");
const router = express.Router();
const { getPosts } = require("../controllers/post");

router.get("/", getPosts);

module.exports = router;
