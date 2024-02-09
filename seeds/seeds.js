const sequelize = require('../config/connection');
const { Admin, ProductModel } = require('../models');

const adminData = require('./adminData.JSON');
const productData = require('./productData.JSON');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const admin = await Admin.bulkCreate(adminData, {
    individualHooks: true,
    returning: true,
  });

  for (const product of productData) {
    try {
      await ProductModel.create({
        ...product,
      });
    } catch (error) {
     
      console.error('Error creating product:', error);
    }
  }

  process.exit(0);
};

seedDatabase();
