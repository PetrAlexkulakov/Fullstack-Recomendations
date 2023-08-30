const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const keys = require('../keys');

module.exports.login = async function(req, res) {
  const candidate = await Users.findOne({email: req.body.email})

  if (candidate) {
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
    if (passwordResult) {
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate.id
      }, keys.jwt, { expiresIn: 3600 })
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
    });

    const token = jwt.sign({
      email: newUser.email,
      userId: newUser.id
    }, keys.jwt, { expiresIn: 3600 })
    res.status(200).json({
      token: token
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' });
  }
};