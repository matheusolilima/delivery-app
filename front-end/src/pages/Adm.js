import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import deliveryFetch from '../api/config';
import isValidUser from '../utils/validator';

function Adm() {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    role: 'seller',
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
      const user = JSON.parse(localStorage.getItem('user'));
      const { data } = await deliveryFetch
        .post('/register/adm', state, { headers: { Authorization: user.token } });
      console.log(data);
      // history.push('/customer/products');
      setUserExist(false);
    } catch (error) {
      setUserExist(true);
    }
  };

  return (
    <div>
      <input
        onChange={ onInputChange }
        type="text"
        name="name"
        data-testid="admin_manage__input-name"
      />
      <input
        onChange={ onInputChange }
        type="text"
        name="email"
        data-testid="admin_manage__input-email"
      />
      <input
        onChange={ onInputChange }
        type="password"
        name="password"
        data-testid="admin_manage__input-password"
      />

      <select
        name="role"
        data-testid="admin_manage__select-role"
        defaultValue="seller"
        onChange={ onInputChange }
      >
        <option value="seller">Vendedor</option>
        <option value="administrator">Administrador</option>
        <option value="customer">Cliente</option>
      </select>

      <button
        onClick={ handleClick }
        type="button"
        data-testid="admin_manage__button-register"
        disabled={ isValidUser({
          name: state.name,
          email: state.email,
          password: state.password,
          passwordMinLen,
          nameMinLen,
        }, isLogin) }
      >
        CADASTRAR
      </button>
      <button
        type="submit"
        data-testid="common_login__button-register"
        onClick={ () => history.push('/register') }
      >
        REGISTER

      </button>
      {
        userExist && (
          <p data-testid="admin_manage__element-invalid-register">
            Email inválido
          </p>
        )
      }

    </div>
  );
}

export default Adm;
