import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { getCartItems, removeFromLocalStorage } from '../services/localStorage';
import deliveryFetch from '../api/config';
import deliveryContext from '../context/deliveryContext';
import OrderTable from '../components/OrderTable';
import AddressForm from '../components/AddressForm';

function Checkout() {
  const { totalPrice } = useContext(deliveryContext);
  const [cartItens, setCartItems] = useState([]);
  const [order, setOrder] = useState({
    email: '',
    totalPrice: 0,
    deliveryAddress: '',
    deliveryNumber: '' });
  const history = useHistory();

  useEffect(() => {
    setCartItems(getCartItems());
    const { email } = JSON.parse(localStorage.getItem('user'));
    setOrder({ ...order, email, totalPrice });
  }, []);

  const removeItem = (id) => {
    removeFromLocalStorage(id);
    setCartItems(getCartItems());
    const total = getCartItems().reduce((acc, item) => acc + item.subTotal, 0);
    setOrder({ ...order, totalPrice: Number(total) });
  };

  const checkout = async () => {
    const data = { ...order, products: cartItens };
    try {
      const { token } = JSON.parse(localStorage.getItem('user'));
      const { data: { id } } = await deliveryFetch
        .post('/sale', data, { headers: { Authorization: token } });
      history.push(`/customer/orders/${id}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = ({ target }) => {
    setOrder({ ...order, [target.name]: target.value });
  };

  return (
    <div>
      <OrderTable
        cartItens={ cartItens }
        removeItem={ removeItem }
        renderRemoveButton
        path="customer_checkout"
      />
      <section>
        <h1 data-testid="customer_checkout__element-order-total-price">
          {
            cartItens.reduce((acc, item) => acc + item.subTotal, 0)
              .toFixed(2).toString().replace('.', ',')
          }
        </h1>
        <AddressForm handleChange={ handleChange } />
        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
          onClick={ checkout }
        >
          Finalizar Pedido

        </button>
      </section>

    </div>
  );
}

export default Checkout;
