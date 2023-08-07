import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function NavigationBar() {
  const history = useHistory();
  const logout = () => {
    localStorage.clear();
    history.push('/login');
  };

  return (
    <nav>
      <ul>
        <li data-testid="customer_products__element-navbar-link-products">PRODUTOS</li>
        <li>
          <Link
            to="/customer/orders"
            data-testid="customer_products__element-navbar-link-orders"
          >
            MEUS PEDIDOS
          </Link>
        </li>
        <li
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {
            JSON.parse(localStorage.getItem('user'))?.name
          }
        </li>
      </ul>
      <button
        type="button"
        onClick={ () => logout() }
        data-testid="customer_products__element-navbar-link-logout"
      >
        SAIR
      </button>
    </nav>
  );
}

export default NavigationBar;
