const router = require("express").Router();
const productsRoutes = require("./products");
const ordersRoutes = require("./orders");
const adminRoutes = require("./admin");
const usersRoutes = require("./users");

router.use("/products", productsRoutes);
router.use("/orders", ordersRoutes);
router.use("/admin", adminRoutes);
router.use("/users", usersRoutes);

module.exports = router;