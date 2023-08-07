export const getCartItems = () => JSON.parse(localStorage.getItem('cart'));

export const setCartItems = (param) => {
  localStorage
    .setItem('cart', JSON.stringify(param));
};

export const localStorageUpdate = (id, name, price, quantity) => {
  if (getCartItems() !== null) {
    const filterCart = getCartItems().filter((item) => item.id !== id);
    const productsCart = [...filterCart,
      { id, name, price, quantity, subTotal: price * quantity }];
    setCartItems(productsCart);
  } else {
    const productsCart = [{ id, name, price, quantity, subTotal: price * quantity }];
    setCartItems(productsCart);
  }
};

export const removeFromLocalStorage = (id) => {
  const filterItens = getCartItems().filter((item) => item.id !== id);
  setCartItems(filterItens);
};
