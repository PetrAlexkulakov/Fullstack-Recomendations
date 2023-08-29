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

  // Генерация "соли" для хеширования
  const salt = bcrypt.genSaltSync(10);

  // Хеширование пароля с использованием соли
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    // Создание нового пользователя
    const newUser = await Users.create({
      username,
      email: email,
      password: hashedPassword,
      // ... Другие поля пользователя
    });

    // Возвращаем успешный ответ
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Возвращаем ошибку
    res.status(500).json({ message: 'Registration failed' });
  }
};