import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { localStorageUpdate, getCartItems } from '../services/localStorage';
import deliveryContext from '../context/deliveryContext';

function ProductCard({ product: { id, name, price, urlImage } }) {
  const { setTotalPrice } = useContext(deliveryContext);
  const [quantity, setQuantity] = useState(0);

  const increase = () => {
    setQuantity(() => quantity + 1);
    localStorageUpdate(id, name, price, quantity + 1);
  };

  const decrease = () => {
    if (quantity !== 0) {
      setQuantity(() => quantity - 1);
      localStorageUpdate(id, name, price, quantity - 1);
    }
  };

  useEffect(() => {
    const total = getCartItems().reduce((acc, item) => acc + item.subTotal, 0);
    setTotalPrice(total);
  }, [increase, decrease]);

  const onChangeValue = (event) => {
    const { value } = event.target;
    setQuantity(value);
    localStorageUpdate(id, name, price, value);
  };
  return (
    <div>
      <p>{id}</p>
      <p
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        {name}

      </p>
      <p
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        {price.replace('.', ',')}

      </p>
      <img
        width="100px"
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ `${urlImage}` }
        alt="imagem do produto"
      />
      <div>
        <button
          data-testid={ `customer_products__button-card-add-item-${id}` }
          type="button"
          onClick={ () => increase() }
        >
          +

        </button>
        <input
          type="number"
          data-testid={ `customer_products__input-card-quantity-${id}` }
          value={ quantity }
          onChange={ (event) => onChangeValue(event) }
        />

        <button
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          type="button"
          onClick={ () => decrease() }
        >
          -
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    urlImage: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
