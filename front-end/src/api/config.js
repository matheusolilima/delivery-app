import axios from 'axios';

const deliveryFetch = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default deliveryFetch;
