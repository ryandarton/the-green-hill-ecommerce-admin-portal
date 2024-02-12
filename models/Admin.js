const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class Admin extends Model {
  async checkPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
        len: [6, 20],
      },
    },
  },
  {
    sequelize,
    hooks: {
      async beforeCreate(newAdminData) {
        newAdminData.password = await bcrypt.hash(newAdminData.password, 10);
        return newAdminData;
      },
    },
    freezeTableName: true,
    underscored: true,
    modelName: 'admin',
  }
);

module.exports = Admin;
