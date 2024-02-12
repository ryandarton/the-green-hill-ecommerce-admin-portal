const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const url = require('url');

const usersRoutes = require('./controllers/api/users.js');
const productRoutes = require('./controllers/api/products.js');
const sequelize = require('./config/connection.js');

const app = express();
const hbs = exphbs.create();

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', usersRoutes);
app.use('/api/products', productRoutes);

app.use((req, res, next) => {
  res.locals.loggedIn = req.session.logged_in || false;
  next();
});

app.get('/', (req, res) => {
  console.log('get logged in status');
  if (req.session.logged_in) {
    console.log('logged in!');
    res.redirect('/api/products');
  } else {
    console.log('need to log in');
    res.render('login', {loggedIn: req.session.logged_in});
  }
});


sequelize.sync({ force: false }).then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});
