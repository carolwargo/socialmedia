const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Post = require('../models/Post');
const authMiddleware = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.post('/', authMiddleware, upload.single('media'), async (req, res) => {
  const { content, userId } = req.body;
  const mediaUrl = req.file ? `/uploads/${req.file.filename}` : null;

  if (!content || !userId) {
    return res.status(400).json({ message: 'Content and userId are required' });
  }

  try {
    const post = await Post.create({ content, userId, mediaUrl });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('userId', 'name handle');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;