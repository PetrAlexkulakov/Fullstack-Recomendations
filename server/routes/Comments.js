const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../keys');
const { Comments, Users, Posts } = require('../models');
const { checkAuth } = require('../controllers/checkAuth');

router.get('/comments/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    
    const comments = await Comments.findAll({
      where: {
        postId: postId,
      },
      include: [{ model: Users, as: 'user' }],
    });
    
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error while fetching comments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/comments/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    
    if (checkAuth(req.headers.authorization)) {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, keys.jwt);
        const { userId } = decodedToken;

        const post = await Posts.findByPk(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const comment = await Comments.create({
            text,
            postId,
            userId,
        });

        res.status(201).json(comment);
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Error while creating comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
