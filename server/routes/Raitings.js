const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../keys');
const { Posts, Raitings, Users } = require('../models');
const { checkAuth } = require('../controllers/checkAuth');

router.get('/:postId/user-rating', async (req, res) => {
  const { postId } = req.params;

  if (checkAuth(req.headers.authorization)) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, keys.jwt);
    const { userId } = decodedToken;

    const userRating = await Raitings.findOne({
      where: {
        postId,
        userId,
      },
    });

    if (userRating) {
      res.status(200).json({ rating: userRating.count });
    } else {
      // Если пользователь не ставил рейтинг, вернуть 0
      res.status(200).json({ rating: 0 });
    }
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

router.post('/:postId/rating', async (req, res) => {
  const { postId } = req.params;
  const { rating } = req.body;

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Invalid rating value' });
  }

  if (checkAuth(req.headers.authorization)) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, keys.jwt);
    const { userId } = decodedToken;

    let userRating = await Raitings.findOne({
      where: {
        postId,
        userId,
      },
    });

    if (userRating) {
      // Если пользователь уже оценил этот пост, обновите его рейтинг
      userRating.count = rating;
      await userRating.save();
    } else {
      // Создайте новую запись рейтинга пользователя
      userRating = await Raitings.create({
        postId,
        userId,
        count: rating,
      });
    }

    // Получите общий рейтинг поста
    const postRatings = await Raitings.findAll({
      where: {
        postId,
      },
    });

    const totalRatings = postRatings.map((rating) => rating.count);
    const totalRatingSum = totalRatings.reduce((sum, count) => sum + count, 0);
    const averageRating = totalRatingSum / totalRatings.length;

    // Обновите рейтинг поста
    const post = await Posts.findByPk(postId);
    if (post) {
      post.raiting = averageRating;
      await post.save();
    }

    res.status(200).json({ message: 'Rating added successfully', rating: post.raiting });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

module.exports = router