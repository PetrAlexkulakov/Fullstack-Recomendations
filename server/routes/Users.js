const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const { Users } = require('../models')
const { Posts } = require('../models');
const keys = require('../keys');

router.get('/userposts', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, keys.jwt);
    const { userId } = decodedToken;
    
    const user = await Users.findByPk(userId, {
        include: [
            {
                model: Posts,
            }
        ]
    });

    res.json(user.Posts);
});


module.exports = router