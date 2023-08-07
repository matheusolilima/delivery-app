const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config();

const secret = fs.readFileSync('jwt.evaluation.key');

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const createToken = (user) => {
  const token = jwt.sign(user, secret, jwtConfig);
  return token;
};

const validateToken = (token) => {
  try {
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (error) {
    console.log(error.message);
    return { isError: true, message: 'Expired or invalid token' };
  }
};

module.exports = {
  createToken,
  validateToken,
};