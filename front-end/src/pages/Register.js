import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import isValidUser from '../utils/validator';
import deliveryFetch from '../api/config';

function Register() {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [userExist, setUserExist] = useState(false);
  const history = useHistory();
  const passwordMinLen = 6;
  const nameMinLen = 12;
  const isLogin = false;

  const onInputChange = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };

  const handleClick = async () => {
    try {
      const { data } = await deliveryFetch.post('/register', state);
      console.log(data);
      history.push('/customer/products');
    } catch (error) {
      setUserExist(true);
    }
  };
  return (
    <div>
      <form>
        <input
          onChange={ onInputChange }
          type="text"
          name="name"
          data-testid="common_register__input-name"
        />
        <input
          onChange={ onInputChange }
          type="text"
          name="email"
          data-testid="common_register__input-email"
        />
        <input
          onChange={ onInputChange }
          type="password"
          name="password"
          data-testid="common_register__input-password"
        />
        <button
          type="button"
          data-testid="common_register__button-register"
          disabled={ isValidUser({
            email: state.email,
            password: state.password,
            name: state.name,
            passwordMinLen,
            nameMinLen }, isLogin) }
          onClick={ handleClick }
        >
          Cadastrar
        </button>
      </form>

      { userExist && (
        <p data-testid="common_register__element-invalid_register">
          alguma credencial é inválida
        </p>
      )}
    </div>
  );
}

export default Register;
