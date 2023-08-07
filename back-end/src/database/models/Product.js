module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL(4,2),
    },
    urlImage: {
      allowNull: false,
      type: DataTypes.STRING,
      default: ''
    }
    
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'products'
  });
  return Product;
}