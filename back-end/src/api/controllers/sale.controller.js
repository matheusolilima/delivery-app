const saleService = require('../services/sale.service');

const createNewSale = async (req, res) => {
  const sale = req.body;
  try {
    const newSale = await saleService.createNewSale(sale);
    return res.status(201).json(newSale);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getOrdersByCustomer = async (req, res) => {
  const { email } = req.user;
  try {
    const orderList = await saleService.getOrdersByCustomer(email);
    return res.status(200).json(orderList);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getSale = async (req, res) => {
  const { id } = req.params;
  const sale = await saleService.getSale(id);
  return res.status(200).json(sale);
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const sale = await saleService.updateStatus(id);
  return res.status(200).json(sale);
};

module.exports = {
  createNewSale,
  getOrdersByCustomer,
  getSale,
  updateStatus,
};