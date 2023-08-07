import React from 'react';
import PropTypes from 'prop-types';

function AddressForm({ handleChange }) {
  return (
    <form>
      <label htmlFor="sellers">
        Vendedor
        <select
          name="sellers"
          id="sellers"
          data-testid="customer_checkout__select-seller"
        >
          <option value="Fulana Pereira">Fulana Pereira</option>
        </select>
      </label>
      <input
        data-testid="customer_checkout__input-address"
        type="text"
        name="deliveryAddress"
        onChange={ handleChange }
      />
      <input
        type="text"
        data-testid="customer_checkout__input-address-number"
        name="deliveryNumber"
        onChange={ handleChange }
      />
    </form>
  );
}

AddressForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default AddressForm;
