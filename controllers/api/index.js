
const router = require("express").Router();
const productsRoutes = require("./products");
const usersRoutes = require("./users");

router.use("/products", productsRoutes);
router.use("/users", usersRoutes);


module.exports = router;