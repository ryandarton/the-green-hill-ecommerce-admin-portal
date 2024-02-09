const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Customer extends Model {
  async checkPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

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
        len: [10],
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 20],
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
        len: [5],
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
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    subscriber: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    hooks: {
      async beforeCreate(newCustomerData) {
        newCustomerData.password = await bcrypt.hash(newCustomerData.password);
        return newCustomerData;
      },
    },
    freezeTableName: true,
    underscored: true,
    modelName: 'customer',
  }
),
  (module.exports = Customer);
