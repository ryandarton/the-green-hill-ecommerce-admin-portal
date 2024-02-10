const { Product } = require("../models/Product.js");

const productdata = [
  {
    name: "8oz Round Jar of Honey",
    weight: "2lbs",
    size: "Small",
    price: "$10",
    quantity: 23,
    in_stock: true,
    image: "8oz-round-jar-honey.jpg",
  },
  {
    name: "12oz Hex Jar of Honey",
    weight: "2.5lbs",
    size: "Small",
    price: "$14",
    quantity: 7,
    in_stock: true,
    image: "12oz-hex-jar-honey.jpg",
  },
  {
    name: "Comb Honey",
    weight: "1lb",
    size: "Small",
    price: "$8",
    quantity: 8,
    in_stock: true,
    image: "comb-honey.jpg",
  },
  {
    name: "Carton of Multi-Colored Eggs (18)",
    weight: "1lb",
    size: "Medium",
    price: "$15",
    quantity: 5,
    in_stock: true,
    image: "carton-of-multi-colored-eggs.jpg",
  },
  {
    name: "1 Dozen Multi-Colored Eggs (12)",
    weight: "1lb",
    size: "Medium",
    price: "$12",
    quantity: 3,
    in_stock: true,
    image: "multi-colored-eggs.jpg",
    description: "",
  },
  {
    name: "1/2 Dozen Multi-Colored Eggs (6)",
    weight: "1lb",
    size: "Medium",
    price: "$6",
    quantity: 2,
    in_stock: true,
    image: "multi-colored-eggs.jpg",
  },
];

const seedProducts = () => Product.bulkCreate(productdata);

module.exports = seedProducts;
