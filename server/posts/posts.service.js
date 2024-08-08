const axios = require('axios').default;

/**
 * Fetches posts from a remote API, including user data for each post.
 * @async
 * @param {Object} [params] - The parameters for fetching posts.
 * @param {number} [params.start=0] - The start index of posts to fetch.
 * @param {number} [params.limit=10] - The maximum number of posts to fetch.
 * @returns {Promise<Array>} - A promise that resolves to an array of posts with user data.
 */
async function fetchPosts(params) {
  const { start = 0, limit = 10 } = params || {};
  
  try {
    // Fetch posts
    const { data: posts } = await axios.get(
      'https://jsonplaceholder.typicode.com/posts',
      {
        params: {
          _start: start,
          _limit: limit,
        },
      }
    );

    // Fetch user data for each post
    const postsWithUserData = await Promise.all(
      posts.map(async (post) => {
        try {
          const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
          const user = userResponse.data;

          return {
            ...post,
            user: {
              name: user.name,
              email: user.email,
              initials: `${user.name.split(' ')[0][0]}${user.name.split(' ')[1][0]}`.toUpperCase(), // Initials of first and last names
            },
          };
        } catch (userError) {
          console.error(`Error fetching user data for post ${post.id}:`, userError);
          return {
            ...post,
            user: {
              name: 'Unknown',
              email: 'Unknown',
              initials: '??',
            },
          };
        }
      })
    );

    return postsWithUserData;
  } catch (error) {
    console.error('Error fetching posts with user data:', error);
    throw error;
  }
}

module.exports = { fetchPosts };
