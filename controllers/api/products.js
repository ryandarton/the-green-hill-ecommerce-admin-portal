const router = require("express").Router();
const Product = require("../../models/Product");

// get all products
router.get("/", async (req, res) => {
  const productData = await Product.findAll().catch((err) => {
    res.json(err);
  });
  const products = productData.map((product) => product.get({ plain: true }));
  res.render("products", { products });
});

// create new product
router.post("/", (req, res) => {
  Product.create(req.body)
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put("/:id", async (req, res) => {
  Product.update({
      name: req.body.name,
      weight: req.body.weight,
      size: req.body.size,
      price: req.body.price,
      quantity: req.body.quantity,
    }, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete("/:id", async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!productData) {
      res.status(404).json({ message: "No product was found with that id!" });
      return;
    }
    res.redirect("/");
    // res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
