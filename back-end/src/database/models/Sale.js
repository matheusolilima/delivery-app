module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    sellerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    totalPrice: {
      allowNull: false,
      type: DataTypes.DECIMAL(9,2),
    },
    deliveryAddress: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    deliveryNumber: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    saleDate: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
    }
    
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'sales'
  });

  Sale.associate = ({User}) => {
    Sale.belongsTo(User, {
      foreignKey: 'userId', as: 'users'
    })
    // Sale.belongsTo(User, {
    //   foreignKey: 'sellerId', as: 'users'
    // })
  }

  Sale.associate = ({User}) => {
    Sale.belongsTo(User, {
      foreignKey: 'sellerId', as: 'users'
    })
  }
  return Sale;
}