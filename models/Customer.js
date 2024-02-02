const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Customer extends Model {}

Customer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      isNumeric: true,
      validate: {
        len: [10 - 10],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    address_line1: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
      },
    },
    address_line2: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
      },
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
      },
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false,
      isNumeric: true,
      validate: {
        len: [5 - 5],
      },
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
      },
  },
    no_purchase: {
      type: DataTypes.INT,
      allowNull: true,
  },
      subscriber: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "customer",
  }
}
);

module.exports = Customer;
