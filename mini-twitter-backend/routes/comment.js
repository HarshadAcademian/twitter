// routes/comment.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const verifyToken = require('../middleware/verifyToken');
const commentController = require('../controllers/commentController');

// Comment routes
router.get('/:postId/comments', verifyToken, commentController.getComments);
router.post('/:postId/comments', verifyToken, commentController.addComment);
router.put('/comments/:id', verifyToken, commentController.updateComment);
router.delete('/comments/:id', verifyToken, commentController.deleteComment);

module.exports = router;
