// controllers/postController.js
const pool = require('../models/db');

// Create a post
exports.createPost = async (req, res) => {
  const { content } = req.body;
  const userId = req.user.userId;

  try {
    await pool.query(
      'INSERT INTO POST (POST_USER_ID, POST_CONTENT, POST_TITLE) VALUES ($1, $2, $3)',
      [userId, content, 'Untitled']
    );
    res.status(201).json({ message: 'Post created' });
  } catch (err) {
    console.error('Post error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.POST_ID,
        p.POST_USER_ID,
        p.POST_CONTENT,
        p.POST_CREATED_AT,
        u.USER_NAME
      FROM POST p
      JOIN "USER" u ON u.USER_ID = p.POST_USER_ID
      WHERE p.POST_IS_DELETED = 0
      ORDER BY p.POST_CREATED_AT DESC
    `);

    res.json({ posts: result.rows });
  } catch (err) {
    console.error('Get posts error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};


// controllers/postController.js
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const userId = req.user.userId;

  try {
    const result = await pool.query(
      `UPDATE POST 
       SET POST_CONTENT = $1, POST_UPDATED_AT = CURRENT_TIMESTAMP 
       WHERE POST_ID = $2 AND POST_USER_ID = $3
       RETURNING *`,
      [content, id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found or unauthorized' });
    }

    res.json({ message: 'Post updated successfully', post: result.rows[0] });
  } catch (err) {
    console.error('Update post error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};



// controllers/postController.js
// controllers/postController.js
exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const result = await pool.query(
      `UPDATE POST 
       SET POST_IS_DELETED = 1, POST_UPDATED_AT = CURRENT_TIMESTAMP
       WHERE POST_ID = $1 AND POST_USER_ID = $2 AND POST_IS_DELETED = 0
       RETURNING POST_ID`,
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(403).json({ error: 'Post not found or you are not authorized to delete it' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Delete post error:', err.message);
    res.status(500).json({ error: 'Server error deleting post' });
  }
};

