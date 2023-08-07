const { Sale, User, SaleProduct } = require('../../database/models');

const createSaleProduct = async (products, saleId) => {
    await Promise.all(products.map((product) => SaleProduct
    .create({ saleId, productId: product.id, quantity: product.quantity })));
};

const createNewSale = async (sale) => {
  const { email, totalPrice, deliveryAddress, deliveryNumber, products } = sale;
  const { id } = await User.findOne({ where: { email } });
  const newSale = await Sale.create({
    userId: id,
    sellerId: 2,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    status: 'Pendente',
  });

  createSaleProduct(products, newSale.id);
  return newSale;
};

const getOrdersByCustomer = async (email) => {
  const { id } = await User.findOne({ where: { email } });
  const orderList = await Sale.findAll({ where: { userId: id } });
  return orderList;
};

const getSale = async (id) => {
  const sale = await Sale.findByPk(id, {
    include: [{ model: User, as: 'users' }], 
  });
  return sale;
};

const updateStatus = async (id) => {
  const [sale] = await Sale.update(
    { status: 'Entregue' },
    { where: { id } },
  );
  return sale;
};

module.exports = {
  createNewSale,
  getOrdersByCustomer,
  getSale,
  updateStatus,
};