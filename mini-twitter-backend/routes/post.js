const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const verifyToken = require('../middleware/verifyToken'); 
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const likeController = require('../controllers/likeController');
const sanitizeBody = require('../middleware/sanitizeBody');

// --- POST ROUTES ---       
// These all start with /posts if mounted as /posts in app.js or index.js

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

router.get('/', verifyToken, postController.getPosts);    

router.put(
  '/update/:id',
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

router.delete('/delete/:id', verifyToken, postController.deletePost);

// --- COMMENT ROUTES ---    

router.get('/comments/:postId', verifyToken, commentController.getComments);

router.post(
  '/comments/:postId',       
  verifyToken,
  [
    body('content')
      .trim()
      .notEmpty()
      .withMessage('Comment content cannot be empty'),    
    sanitizeBody(['content'])  
  ],
  commentController.addComment
);

router.put(
  '/comments/update/:id',    
  verifyToken,
  [
    body('content')
      .trim()
      .notEmpty()
      .withMessage('Updated comment content cannot be empty'),
    sanitizeBody(['content'])  
  ],
  commentController.updateComment
);

router.delete('/comments/delete/:id', verifyToken, commentController.deleteComment);   

// --- LIKE ROUTES ---       

router.post('/like/:postId', verifyToken, likeController.toggleLike);

router.get('/likes/:postId', verifyToken, likeController.getLikes);

module.exports = router;
