import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Main from './pages/Main';
import Register from './pages/Register';
import Adm from './pages/Adm';
import Order from './pages/Order';
import MyOrders from './pages/MyOrders';
import OrderDetails from './pages/OrderDetails';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect exact to="/login" />
      </Route>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/customer/products" component={ Main } />
      <Route exact path="/customer/checkout" component={ Checkout } />
      <Route exact path="/customer/products" />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/admin/manage" component={ Adm } />
      <Route exact path="/customer/orders/:id" component={ Order } />
      <Route exact path="/customer/orders" component={ MyOrders } />
      <Route exact path="/customer/orders/:id" component={ OrderDetails } />
    </Switch>
  );
}

export default App;
