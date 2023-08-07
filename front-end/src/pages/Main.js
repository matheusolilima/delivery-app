import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import deliveryFetch from '../api/config';
import ProductCard from '../components/ProductCard';
import { getCartItems, setCartItems } from '../services/localStorage';
import deliveryContext from '../context/deliveryContext';

function Main() {
  const { totalPrice } = useContext(deliveryContext);
  const [products, setProducts] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const getProducts = async () => {
      const { data } = await deliveryFetch.get('/products');
      setProducts(data);
    };
    getProducts();
    if (getCartItems() === null) {
      setCartItems([]);
    }
  }, []);

  return (
    <div>
      <h1>APP DELIVERY</h1>
      <NavigationBar />
      {
        products?.map((product) => (<ProductCard
          product={ product }
          key={ product.id }
        />))
      }
      <button
        data-testid="customer_products__button-cart"
        type="button"
        disabled={ totalPrice === 0 }
        onClick={ () => history.push('/customer/checkout') }
      >
        Ver Carrinho:
        {' '}
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          {`${totalPrice.toFixed(2).replace('.', ',')}`}

        </span>

      </button>
    </div>
  );
}

export default Main;
