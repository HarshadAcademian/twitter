const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const verifyToken = require('../middleware/verifyToken');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const likeController = require('../controllers/likeController');

// @route   POST /posts
// @desc    Create a new post
// @access  Private
router.post(
  '/',
  verifyToken,
  [
    body('content')
      .trim()
      .escape()
      .isLength({ min: 5 })
      .withMessage('Content must be at least 5 characters long'),
  ],
  postController.createPost
);

// @route   GET /posts
// @desc    Get all posts
// @access  Private
router.get('/', verifyToken, postController.getPosts);

// Update a post
router.put(
  '/:id',
  verifyToken,
  [
    body('content')
      .trim()
      .escape()
      .isLength({ min: 5 })
      .withMessage('Content must be at least 5 characters long'),
  ],
  postController.updatePost
);

// Delete a post
router.delete('/:id', verifyToken, postController.deletePost);

// Comment routes
router.get('/:postId/comments', verifyToken, commentController.getComments);
router.post('/:postId/comments', verifyToken, commentController.addComment);
router.put('/comments/:id', verifyToken, commentController.updateComment);
router.delete('/comments/:id', verifyToken, commentController.deleteComment);

// Like routes
router.post('/:postId/like', verifyToken, likeController.toggleLike);
router.get('/:postId/likes', verifyToken, likeController.getLikes);

module.exports = router;
