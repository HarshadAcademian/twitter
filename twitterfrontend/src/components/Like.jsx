// src/components/Like.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Like = ({ postId, initialLikesCount, initialLiked, token }) => {
  const [likesCount, setLikesCount] = useState(initialLikesCount || 0);
  const [liked, setLiked] = useState(initialLiked || false);

  const headers = { Authorization: `Bearer ${token}` };

  const toggleLike = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/posts/${postId}/like`,
        {},
        { headers }
      );

      if (response.data.liked) {
        setLikesCount((count) => count + 1);
        setLiked(true);
      } else {
        setLikesCount((count) => Math.max(0, count - 1));
        setLiked(false);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <>
      <button
        onClick={toggleLike}
        className="text-pink-500 hover:text-pink-600 font-medium"
      >
        {liked ? '❤️' : '🤍'} Like
      </button>
      <span className="text-sm">{likesCount} Likes</span>
    </>
  );
};

export default Like;
