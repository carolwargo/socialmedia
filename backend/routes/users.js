// backend/routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// Get current user's profile
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user by handle
router.get('/:handle', async (req, res) => {
  try {
    const user = await User.findOne({ handle: req.params.handle }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/me', authMiddleware, async (req, res) => {
  const { name, bio, profilePic } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.bio = bio || user.bio;
    user.profilePic = profilePic || user.profilePic;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Follow a user
router.post('/:handle/follow', authMiddleware, async (req, res) => {
  try {
    const userToFollow = await User.findOne({ handle: req.params.handle });
    const currentUser = await User.findById(req.user.id);

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (userToFollow._id.equals(currentUser._id)) {
      return res.status(400).json({ message: 'Cannot follow yourself' });
    }

    if (!userToFollow.followers.includes(currentUser._id)) {
      userToFollow.followers.push(currentUser._id);
      await userToFollow.save();
    }

    res.json({ message: 'Followed successfully', followers: userToFollow.followers });
  } catch (err) {
    console.error('Error following user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Unfollow a user
router.post('/:handle/unfollow', authMiddleware, async (req, res) => {
  try {
    const userToUnfollow = await User.findOne({ handle: req.params.handle });
    const currentUser = await User.findById(req.user.id);

    if (!userToUnfollow || !currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    userToUnfollow.followers = userToUnfollow.followers.filter(
      (followerId) => !followerId.equals(currentUser._id)
    );
    await userToUnfollow.save();

    res.json({ message: 'Unfollowed successfully', followers: userToUnfollow.followers });
  } catch (err) {
    console.error('Error unfollowing user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;