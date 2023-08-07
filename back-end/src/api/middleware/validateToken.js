const fs = require('fs');
const jwt = require('../auth/jwtConfig');

const secret = fs.readFileSync('jwt.evaluation.key');

const auth = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) return res.status(401).json({ message: 'Token not found' });
  const result = jwt.validateToken(token, secret);
  if (result.isError) return res.status(401).json({ message: 'Expired or invalid token' });
  req.user = result;
  return next();
};
module.exports = auth;