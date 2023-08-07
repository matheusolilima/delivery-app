import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import deliveryContext from './deliveryContext';

function Provider({ children }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const contextValue = useMemo(() => ({ totalPrice, setTotalPrice }), [totalPrice]);

  return (
    <deliveryContext.Provider value={ contextValue }>
      {children}
    </deliveryContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
