const sequelize = require("../config/connection");
const { Admin } = require("../models");
const Product = require("../models/Product");

const adminData = require("./adminData.JSON");
const productData = require("./productData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const admin = await Admin.bulkCreate(adminData, {
    individualHooks: true,
    returning: true,
  });

  for (const product of productData) {
    try {
      await Product.create({
        ...product,
      });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  }

  await Product.bulkCreate(productData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
