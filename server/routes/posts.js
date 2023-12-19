const express = require("express");
const router = express.Router();
const { getAllPosts, createPost, searchPost } = require("../controllers/post");
const {
  registerUser,
  authenticateUser,
  googleauth,
} = require("../controllers/user");
const {
  postComment,
  getAllCommentsForPost,
  searchComment,
} = require("../controllers/comment");

router.get("/", getAllPosts);
router.post("/", createPost);

router.post("/register", registerUser);
router.post("/login", authenticateUser);
router.post("/google-login", googleauth);

router.get("/searchpost/:text", searchPost);
router.get("/searchcomment/:postId/:text", searchComment);

router.post("/:id/comment", postComment);
router.get("/:id/comments", getAllCommentsForPost);

module.exports = router;
