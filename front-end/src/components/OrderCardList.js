import React, { useEffect, useState } from 'react';
import OrderCard from './OrderCard';
import orderList from '../utils/getOrdersByEmail';

function OrderCardList() {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // console.log(email);
      const response = await orderList(token);
      setList(response.data);
    };
    fetchData();
  });
  // console.log(list);
  return (
    <div>
      { list?.map((order, index) => (
        <OrderCard
          key={ index }
          id={ order.id }
          totalPrice={ order.totalPrice }
          saleDate={ order.saleDate }
          status={ order.status }
        />
      )) }
    </div>
  );
}

export default OrderCardList;
