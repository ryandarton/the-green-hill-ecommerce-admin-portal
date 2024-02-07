const router = require("express").Router();
const { Customer, Order, Product } = require("../../models");

// get all orders
router.get("/", async (req, res) => {

  try {
    const ordersData = await Order.findAll();
    res.status(200).json(ordersData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one order
router.get("/:id", async (req, res) => {

  try {
    const orderData = await Order.findByPk(req.params.id);

    if (!orderData) {
      res.status(404).json({ message: "No product was found with that id!" });
      return;
    }

    res.status(200).json(orderData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', (req, res) => {

  Order.create(req.body)
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update order
router.put('/:id', async (req, res) => {

  Order.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((order) => {
      return res.json(order);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", async (req, res) => {
  // delete one order by its `id` value
  try {
    const orderData = await Order.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!orderData) {
      res.status(404).json({ message: "No product was found with that id!" });
      return;
    }

    res.status(200).json(orderData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;