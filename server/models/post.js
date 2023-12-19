const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    text: {
      type: String,
      required: "Text is required.",
      minlength: 4,
      maxlength: 4000,
    },
    commentcount: { type: Number, default: 0 },

    // name: { type: String, required: true },
    // image: {
    //   type: String,
    //   default: null,
    // },
    // comments: [
    //   {
    //     user: { type: Schema.Types.ObjectId, ref: "User" },
    //     text: {
    //       type: String,
    //       minlength: 1,
    //       maxlength: 2000,
    //     },
    //   },
    //   { timestamps: true },
    // ],
  },
  { timestamps: true }
); // when document created

module.exports = mongoose.model("Post", postSchema);
