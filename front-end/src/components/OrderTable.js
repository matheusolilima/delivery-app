import React from 'react';
import PropTypes from 'prop-types';

function OrderTable({ cartItens, removeItem, renderRemoveButton, path }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Item</th>
          <th>Quantity</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
          <th>
            Remover Item
          </th>
        </tr>
      </thead>
      <tbody>
        {
          cartItens.map((item, index) => (
            <tr key={ index }>
              <td
                data-testid={
                  `${path}__element-order-table-item-number-${index}`
                }
              >
                {index + 1}
              </td>
              <td
                data-testid={
                  `${path}__element-order-table-name-${index}`
                }
              >
                {item.name}

              </td>
              <td
                data-testid={
                  `${path}__element-order-table-quantity-${index}`
                }
              >
                {item.quantity}

              </td>
              <td
                data-testid={
                  `${path}__element-order-table-unit-price-${index}`
                }
              >
                {item.price.replace('.', ',')}

              </td>
              <td
                data-testid={
                  `${path}__element-order-table-sub-total-${index}`
                }
              >
                {item.subTotal.toFixed(2).toString().replace('.', ',')}

              </td>
              <td
                data-testid={
                  `${path}__element-order-table-remove-${index}`
                }
              >
                {' '}
                {
                  renderRemoveButton && (
                    <button
                      onClick={ () => removeItem(item.id) }
                      type="button"
                    >
                      Remover

                    </button>
                  )
                }

              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

OrderTable.propTypes = {
  cartItens: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    subTotal: PropTypes.number,
    quantity: PropTypes.number,
  })).isRequired,
  removeItem: PropTypes.func.isRequired,
  renderRemoveButton: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
};

export default OrderTable;
