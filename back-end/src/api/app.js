const express = require('express');
const cors = require('cors');
const path = require('path');
const loginRouter = require('./routes/login.route');
const productRouter = require('./routes/product.route');
const registerRouter = require('./routes/register.route');
const saleRouter = require('./routes/sale.route');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/login', loginRouter);
app.use('/products', productRouter);
app.use('/images', express.static(path.join(__dirname, '..', 'images'))); 
app.use('/register', registerRouter);
app.use('/sale', saleRouter);

module.exports = app;
