const express = require('express');
const axios = require('axios');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await fetchPosts();

    const postsWithImages = await Promise.all(
      posts.map(async (post) => {
        // Fetch photos for each post's album
        const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
        const images = response.data.map((photo) => ({ url: photo.url }));

        return {
          ...post,
          images: images.slice(0, 3), // Limit to 3 images per post if desired
        };
      })
    );

    res.json(postsWithImages);
  } catch (error) {
    console.error('Error fetching posts with images:', error);
    res.status(500).send('Error fetching posts with images');
  }
});

module.exports = router;
