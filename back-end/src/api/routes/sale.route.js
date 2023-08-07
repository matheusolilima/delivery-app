const express = require('express');
const saleController = require('../controllers/sale.controller');
const validateToken = require('../middleware/validateToken');

const router = express.Router();

router.post('/', validateToken, saleController.createNewSale);
router.get('/customer', validateToken, saleController.getOrdersByCustomer);
router.get('/:id', saleController.getSale);
router.patch('/:id', saleController.updateStatus);

module.exports = router;