const userService = require('../services/register.service');

const registerUser = async (req, res) => {
  const { email, name, password, role } = req.body;
  try {
    const user = await userService.registerUser({ email, name, password }, role);
    return res.status(201).json(user);
  } catch (error) {
    if (error.message.includes('usuário existente')) {
      return res.status(409).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
};