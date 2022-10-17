const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.types.ObjectId,
    ref: "users",
  },

  text: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  avatar: {
    type: String,
  },

  likes: [
    {
      user: {
        type: Schema.types.ObjectId,
        ref: "users",
      },
    },
  ],

  comments: [
    {
      user: {
        type: Schema.types.ObjectId,
        ref: "users",
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },

      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model("Post", PostSchema);
