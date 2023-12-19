const postModel = require("../models/post");

const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel
      .find({})
      .sort({ createdAt: -1 })
      // .populate("comments")
      .populate({
        path: "user",
        select: "name image",
      });

    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { text, userId } = req.body;
    let post = await postModel.create({ text, user: userId });
    post = await post.populate("user");
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchPost = async (req, res) => {
  const text = req.params.text;
  try {
    let post = await postModel
      .find({ $text: { $search: text } })
      .populate("user");

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllPosts,
  createPost,
  searchPost,
};
