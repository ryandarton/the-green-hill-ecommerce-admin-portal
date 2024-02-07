import express from "express";
const router = express.Router();

router.get("/orders", (req, res) => {
  // Fake data 
  const fakeOrders = [
    {
      id: 1,
      customerName: "Alex Johnson",
      items: [
        { name: "Eggs", quantity: 12 },
        { name: "Honey", quantity: 1 },
      ],
      total: 24.99,
      tax: 2.0,
      orderDateTime: new Date().toLocaleString(),
      status: "Pending",
    }
  ];

  res.render("admin-orders-page", { orders: fakeOrders });
});

export default router;
