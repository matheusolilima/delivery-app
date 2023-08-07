const loginService = require('../services/login.service');
const { createToken } = require('../auth/jwtConfig');

const findUserByEmail = async (req, res) => {
  try {
    const user = await loginService.findUserByEmail(req.body);
    const token = createToken(user);
    const data = { ...user, token };
    return res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};
module.exports = {
  findUserByEmail,
};