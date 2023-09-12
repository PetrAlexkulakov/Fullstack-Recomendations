const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const { Posts } = require('../models');
const { Tags } = require('../models')
const keys = require('../keys');
const addQuerys = require('../controllers/addQuerys');

router.get('/isadmin', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decodedToken = jwt.verify(token, keys.jwt);
      const { isAdmin } = decodedToken;
      res.status(200).json({
        isAdmin
      });
      // Делайте что-то с полученными данными о пользователе
    } catch (error) {
        // Обработайте ошибку, например, если токен недействителен
        res.status(500).json({ message: 'Failed' });
    }
})

router.get('/userposts', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, keys.jwt);
    const { userId } = decodedToken;
    let whereCondition = { userId };
    
    addQuerys.addQuery(whereCondition, req)

    const userPosts = await Posts.findAll({
        where: whereCondition,
        include: [
            {
                model: Tags,
                as: 'Tags',
                attributes: [],
            }
        ]
    });

    res.json(userPosts);
});


module.exports = router