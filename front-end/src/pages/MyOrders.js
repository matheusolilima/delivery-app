import React from 'react';
import NavigationBar from '../components/NavigationBar';
import OrderCardList from '../components/OrderCardList';

export default function MyOrders() {
  return (
    <div>
      <NavigationBar />
      <OrderCardList />
    </div>
  );
}
