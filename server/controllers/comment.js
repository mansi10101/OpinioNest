const commentModel = require("../models/comment");
const postModel = require("../models/post");
const ObjectId = require("mongodb").ObjectId;

const postComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const { text, userId } = req.body;
    let postcomment = await commentModel.create({
      text,
      user: userId,
      postid: postId,
    });

    const updatedCommentCount = await postModel.findById(postId);
    updatedCommentCount.commentcount += 1;
    await updatedCommentCount.save();

    // res.status(200).json(updatedPost.comments[0]);
    postcomment = await postcomment.populate("user");
    res.status(200).json(postcomment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllCommentsForPost = async (req, res) => {
  const postId = req.params.id;
  try {
    // Find the post by its _id
    const comments = await commentModel.find({ postid: postId }).populate({
      path: "user",
      select: "name image",
    });

    if (!comments) {
      return res.status(404).json({ error: "Post not found" });
    }
    comments.sort((a, b) => b.createdAt - a.createdAt);

    // Return the comments
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchComment = async (req, res) => {
  const { postId, text } = req.params;
  try {
    const comments = await commentModel
      .find({
        postid: new ObjectId(postId).toString(),
        $text: {
          $search: text,
        },
      })
      .populate("user");

    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postComment,
  getAllCommentsForPost,
  searchComment,
};
