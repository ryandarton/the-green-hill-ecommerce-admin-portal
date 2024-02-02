const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Product extends Model {}

Product.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true

        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false

        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: true

        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'order',
                key: 'id'

            },

        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false

        },
        subscribable: {
            type: DataTypes.BOOLEAN,
            allowNull: true

        },

    },
),
{
    sequelize,
    freezeTableName: true,
    modelName: 'product'
};

module.exports = Product;