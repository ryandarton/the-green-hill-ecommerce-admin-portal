const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const url = require('url');

const usersRoutes = require('./controllers/api/users.js');
const productRoutes = require('./controllers/api/products');
const sequelize = require('./config/connection.js');

const app = express();
const hbs = exphbs.create();

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', usersRoutes);
app.use('/products', productRoutes);

app.get("/", (req, res) => {
  console.log("get ");
  if (req.session.logged_in) {
    console.log("yo");
    res.render("homepage");
  } else {
    console.log("hello");

    res.render("login");
  }
});

sequelize.sync({ force: false }).then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
