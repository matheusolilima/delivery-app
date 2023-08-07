module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique:true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'users'
  });

  User.associate = ({Sale}) => {
    User.hasMany(Sale, {
      foreignKey: 'userId', as: 'sales'
    })
    // User.hasMany(Sale, {
    //   foreignKey: 'sellerId', as: 'sales'
    // })
  }

  User.associate = ({Sale}) => {
    User.hasMany(Sale, {
      foreignKey: 'sellerId', as: 'sales'
    })
  }

  return User;
}