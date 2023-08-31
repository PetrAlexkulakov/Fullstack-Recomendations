const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const keys = require('../keys');

module.exports.login = async function(req, res) {
  const candidate = await Users.findOne({where: {email: req.body.email} })

  if (candidate) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
    if (passwordResult) {
      const token = jwt.sign({
        email: candidate.email,
        username: candidate.username,
        userId: candidate.id
      }, keys.jwt, { expiresIn: 360000 })
      res.status(200).json({
        token: token
      });
    } else {
      res.status(401).json({message: 'Wrong password'});
    }
  } else {
    res.status(404).json({message: 'Not Found'});
  }
}

module.exports.register = async function(req, res) {
  const { email, password, username } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const newUser = await Users.create({
      username,
      email: email,
      password: hashedPassword,
      userId: {}
    });

    const token = jwt.sign({
      email: newUser.email,
      userId: newUser.id
    }, keys.jwt, { expiresIn: 360000 })
    res.status(200).json({
      token: token
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' });
  }
};

module.exports.getUsername = async function(req, res) { 
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decodedToken = jwt.verify(token, keys.jwt);
    const { username } = decodedToken;
    res.status(200).json({
      username
    });
    // Делайте что-то с полученными данными о пользователе
  } catch (error) {
      // Обработайте ошибку, например, если токен недействителен
      res.status(500).json({ message: 'Failed' });
  }
};