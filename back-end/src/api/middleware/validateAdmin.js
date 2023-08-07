const fs = require('fs');
const jwt = require('../auth/jwtConfig');

const secret = fs.readFileSync('jwt.evaluation.key');

const auth = (req, res, next) => {
  // const { Authorization: token } = req.headers;
  const { authorization } = req.headers;
  // if (!token) return res.status(401).json({ message: 'Token not found' });
  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  const result = jwt.validateToken(authorization, secret);
  if (result.isError) return res.status(401).json({ message: 'Expired or invalid token' });
  if (result.role !== 'administrator') {
    return res.status(401).json({ message: 'Token not authorized' });
  }
  req.user = result;
  return next();
};
module.exports = auth;