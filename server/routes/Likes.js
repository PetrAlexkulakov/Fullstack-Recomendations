const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../keys');
const { Posts, Likes } = require('../models');

router.get('/:postId/liked', async (req, res) => {
  const { postId } = req.params;

  if (req.headers.authorization) {
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
  
    if (req.headers.authorization) {
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
  
        return res.status(200).json({ message: 'Like removed successfully', action: 'remove' });
      }
  
      // Создаем новый лайк
      await Likes.create({
        postId,
        userId,
      });
  
      // Увеличиваем счетчик лайков для поста
      const post = await Posts.findByPk(postId);
      if (post) {
        post.likesCount += 1;
        await post.save();
      }
  
      res.status(200).json({ message: 'Like added successfully', action: 'add' });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
});

module.exports = router