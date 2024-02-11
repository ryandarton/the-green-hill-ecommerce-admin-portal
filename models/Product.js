const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // not working- will fix next
    
    // in_stock: {
    //   type: DataTypes.BOOLEAN,
    //   allowNull: true,
    // },
    // image: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: "product",
  }
);

module.exports = Product;
