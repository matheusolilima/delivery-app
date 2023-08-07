const md5 = require('md5');
const { User } = require('../../database/models');

const findUserByEmail = async (userLogin) => {
  const { dataValues: { password, ...user } } = await User
    .findOne({ where: { email: userLogin.email } });
  if (md5(userLogin.password) !== password) {
    throw new Error('senha invalida');
  }
  return user;
};

module.exports = {
  findUserByEmail,
};