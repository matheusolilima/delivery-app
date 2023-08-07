const productService = require('../services/product.service');

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'BAD_REQUEST' });
  }
};

module.exports = {
  getAllProducts,
};