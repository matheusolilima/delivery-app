import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import deliveryFetch from '../api/config';
import isValidUser from '../utils/validator';

function Login() {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const [loginError, setLoginError] = useState(false);

  const history = useHistory();
  const passwordMinLen = 6;
  const isLogin = true;
  const onInputChange = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    const quem = JSON.parse(localStorage.getItem('user'));
    if (quem) {
      if (quem.role === 'administrator') {
        history.push('/admin/manage');
      } else {
        history.push('/customer/products');
      }
    }
  }, []);

  const handleClick = async () => {
    try {
      const { data: { email, name, role, token } } = await deliveryFetch
        .post('/login', state);
      if (role === 'administrator') {
        history.push('/admin/manage');
      } else {
        history.push('/customer/products');
      }
      localStorage.setItem('user', JSON.stringify({ email, name, role, token }));
      setLoginError(false);
    } catch (error) {
      setLoginError(true);
    }
  };

  return (
    <div>
      <input
        onChange={ onInputChange }
        type="text"
        name="email"
        data-testid="common_login__input-email"
      />
      <input
        onChange={ onInputChange }
        type="password"
        name="password"
        data-testid="common_login__input-password"
      />
      <button
        onClick={ handleClick }
        type="button"
        data-testid="common_login__button-login"
        disabled={ isValidUser({
          email: state.email, password: state.password, passwordMinLen }, isLogin) }
      >
        LOGIN

      </button>

      <button
        type="submit"
        data-testid="common_login__button-register"
        onClick={ () => history.push('/register') }
      >
        REGISTER

      </button>
      {
        loginError && (
          <p data-testid="common_login__element-invalid-email">
            Credenciais inválidas
          </p>
        )
      }

    </div>
  );
}

export default Login;
