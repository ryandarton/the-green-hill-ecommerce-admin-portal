const { Product } = require("../models/productModel.js");

const productdata = [
  {
    name: "",
    weight: "",
    size: "",
    price: 1,
    quantity; 14,
    in_stock: true,
    image: "",
    description: "",
  },
];

const seedProducts = () => Product.bulkCreate(productdata);

module.exports = seedProducts;