const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);

router.post('/register', authController.register);

router.post('/username', authController.getUsername);

module.exports = router;
