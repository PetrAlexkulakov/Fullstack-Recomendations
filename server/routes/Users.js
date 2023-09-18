const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const { Posts } = require('../models');
const { Tags } = require('../models')
const { Users } = require('../models')
const keys = require('../keys');
const addQuerys = require('../controllers/addQuerys');

router.get('/', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, keys.jwt);
        const { isAdmin } = decodedToken;
        if (isAdmin) {
            const listOfUsers = await Users.findAll({
                attributes: {
                  exclude: ['password']
                }
            })
            res.json(listOfUsers)
        } else {
            res.status(500).json({ message: 'Failed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed' });
    }
});

router.get('/isadmin', async (req, res) => {
    console.log('')
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, keys.jwt);
      const { isAdmin } = decodedToken;
      res.status(200).json({
        isAdmin
      });
    } catch (error) {
        res.status(500).json({ message: 'Failed' });
    }
})

router.get('/:id', async (req, res) => {
    const userId = req.params.id;

    try {
      const user = await Users.findByPk(userId, {
        attributes: { exclude: ['password'] }
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.get('/userposts/:userId', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, keys.jwt);
    const { userId: tokenUserId, isAdmin } = decodedToken;
    let whereCondition = {}

    if (req.params.userId === 'undefined') {
        whereCondition = { userId: tokenUserId };
    } else if (tokenUserId === req.params.userId || isAdmin) {
        whereCondition = { userId: req.params.userId };
    } 
    else {
        return res.status(500).json({ error: 'You don`t have permission' });
    }

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

router.post('/update-admin-status/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { isAdmin } = req.body; 

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, keys.jwt);
    const { isAdmin: currentIsAdmin } = decodedToken;

    if (!currentIsAdmin) {
      return res.status(403).json({ message: 'You do not have permission to perform this action.' });
    }

    await Users.update({ isAdmin }, { where: { id: userId } });

    res.status(200).json({ message: 'Admin status updated successfully.' });
  } catch (error) {
    console.error('Error updating admin status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// router.get('/userid', async (req, res) => {
//     try {
//       const token = req.headers.authorization.split(' ')[1];
//       const decodedToken = jwt.verify(token, keys.jwt);
//       const { userId } = decodedToken;
//       res.status(200).json({
//         userId
//       });
//     } catch (error) {
//         res.status(500).json({ message: 'Failed' });
//     }
// })

module.exports = router