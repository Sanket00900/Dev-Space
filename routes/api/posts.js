const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route   POST api/posts
// @desc    Create a Post
// @access  Private

router.post(
  "/",
  [auth, [check("text", "Text is Required").not().isEmpty()]],
  async (req, res) => {
    const error = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      console.error(error.messege);
      res.status(500).send("Server Error");
    }
  }
);

// @route   gett api/posts
// @desc    Get all Posts
// @access  Private

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.messege);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
