const sequelize = require('../config/connection');
const { Admin, Product } = require('../models');

const adminData = require('./adminData.json');
// const productData = require('./productData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const admin = await Admin.bulkCreate(adminData, {
    individualHooks: true,
    returning: true,
  });
console.log(admin)
console.log(adminData)
  // for (const product of productData) {
  //   try {
  //     await Product.create({
  //       ...product,
  //     });
  //   } catch (error) {
     
  //     console.error('Error creating product:', error);
  //   }
  // }

  process.exit(0);
};

seedDatabase();
