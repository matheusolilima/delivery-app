const { Op } = require('sequelize');
const md5 = require('md5');
const { User } = require('../../database/models');

const registerUser = async ({ email, name, password }, role = 'customer') => {
  const cryptedPassword = md5(password);
  const userExist = await User.findOne({ where: { [Op.or]: [{ email }, { name }] } });
  if (userExist) throw new Error('usuário existente');
  
  const user = await User.create({
    email,
    name,
    password: cryptedPassword,
    role });
  
  return user;
};

module.exports = {
  registerUser,
};