import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function OrderCard(props) {
  const { id, totalPrice, saleDate, status } = props;
  const dateChars = 10;
  const formatData = saleDate.slice(0, dateChars).split('-');

  return (
    <Link to={ `customer/orders/${id}` }>
      <div>
        <span data-testid={ `customer_orders__element-order-id-${id}` }>
          {`Pedido ${id}`}
        </span>
        <span data-testid={ `customer_orders__element-delivery-status-${id}` }>
          {`${status}`}
        </span>
        <span data-testid={ `customer_orders__element-order-date-${id}` }>
          { formatData.reverse().join('/') }
        </span>
        <span data-testid={ `customer_orders__element-card-price-${id}` }>
          { `R$ ${totalPrice.replace('.', ',')}` }
        </span>
      </div>
    </Link>
  );
}

OrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  totalPrice: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
/*
- 34: customer_orders__element-order-id-<id>
- 35: customer_orders__element-delivery-status-<id>
- 36: customer_orders__element-order-date-<id>
- 37: customer_orders__element-card-price-<id>

id: 3,
name: 'Cliente Zé Birita',
email: 'zebirita@email.com',
password: '1c37466c159755ce1fa181bd247cb925',
role: 'customer',
// senha : md5('$#zebirita#$')

*/
export default OrderCard;
