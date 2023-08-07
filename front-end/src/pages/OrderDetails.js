import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OrderTable from '../components/OrderTable';
import { getCartItems } from '../services/localStorage';
import deliveryFetch from '../api/config';

function OrderDetails() {
  const [cartItens, setCartItems] = useState([]);
  const [sale, setSale] = useState();
  const { id } = useParams();

  const fetchSale = async (saleId) => {
    try {
      const { data } = await deliveryFetch
        .get(`/sale/${saleId}`);
      setSale(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCartItems(getCartItems());
    fetchSale(id);
  }, []);

  const handleClick = async () => {
    try {
      await deliveryFetch.patch(`/sale/${id}`);
      fetchSale(id);
    } catch (error) {
      console.log(error);
    }
  };
  const prefix = 'customer_order_details';
  return (
    <div>
      {sale && (
        <div>
          <p
            data-testid={ `${prefix}__element-order-details-label-order-id` }
          >
            {`Pedido:${id}`}
          </p>
          <p
            data-testid={ `${prefix}__element-order-details-label-seller-name` }
          >
            {`P. Vend:${sale.users.name}`}
          </p>
          <p
            data-testid={ `${prefix}__element-order-details-label-order-date` }
          >
            {new Date(sale.saleDate)
              .toLocaleDateString('pt-BR', { timeZone: 'UTC' })}

          </p>
          <p
            data-testid={ `${prefix}__element-order-details-label-delivery-status` }
          >
            {sale.status}

          </p>
          <button
            type="button"
            onClick={ handleClick }
            data-testid="customer_order_details__button-delivery-check"
            disabled
          >
            MARCAR COMO ENTREGUE
          </button>
        </div>
      )}
      <OrderTable
        cartItens={ cartItens }
        removeItem={ () => { } }
        renderRemoveButton={ false }
        path="customer_order_details"
      />
      <h1 data-testid="customer_order_details__element-order-total-price">
        {
          cartItens.reduce((acc, item) => acc + item.subTotal, 0)
            .toFixed(2).toString().replace('.', ',')
        }
      </h1>
    </div>
  );
}

export default OrderDetails;
