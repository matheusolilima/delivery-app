const isValidUser = (data, isLogin) => {
  const { email, password, name, passwordMinLen, nameMinLen } = data;
  const checkEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);
  if (isLogin) return !(checkEmail && password.length >= passwordMinLen);
  return !(checkEmail
    && password.length >= passwordMinLen && name.length >= nameMinLen);
};

export default isValidUser;
