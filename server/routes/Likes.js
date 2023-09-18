const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../keys');
const { Posts, Likes, Users } = require('../models');
const { checkAuth } = require('../controllers/checkAuth');

router.get('/:postId/liked', async (req, res) => {
  const { postId } = req.params;

  if (checkAuth(req.headers.authorization)) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, keys.jwt);
    const { userId } = decodedToken;

    const existingLike = await Likes.findOne({
      where: {
        postId,
        userId,
      },
    });

    if (existingLike) {
      return res.status(200).json({ liked: true });
    }

    return res.status(200).json({ liked: false });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

router.post('/:postId/like', async (req, res) => {
    const { postId } = req.params;
  
    if (checkAuth(req.headers.authorization)) {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, keys.jwt);
      const { userId } = decodedToken;
  
      const existingLike = await Likes.findOne({
        where: {
          postId,
          userId,
        },
      });
  
      if (existingLike) {
        await existingLike.destroy();

        const post = await Posts.findByPk(postId);
        if (post) {
          post.likesCount -= 1;
          await post.save();
        }

        const user = await Users.findByPk(post.userId);
        if (user) {
            user.totalLikes -= 1;
            await user.save();
        }
  
        return res.status(200).json({ message: 'Like removed successfully', action: 'remove' });
      }
  
      await Likes.create({
        postId,
        userId,
      });
  
      const post = await Posts.findByPk(postId);
      if (post) {
        post.likesCount += 1;
        await post.save();
      }

      // Увеличиваем totalLikes пользователя
      const user = await Users.findByPk(post.userId);
      if (user) {
          user.totalLikes += 1;
          await user.save();
      }
  
      res.status(200).json({ message: 'Like added successfully', action: 'add' });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
});

module.exports = router