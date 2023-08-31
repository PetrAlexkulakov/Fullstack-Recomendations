const express = require('express')
const router = express.Router()
const { Users } = require('../models')

router.get('/:userId/posts', async (req, res) => {
    const userId = req.params.userId;
    
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