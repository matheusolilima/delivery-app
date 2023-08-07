import deliveryFetch from '../api/config';

async function orderList(token) {
  return deliveryFetch.get('/sale/customer', { headers: { Authorization: token } });
}

export default orderList;
