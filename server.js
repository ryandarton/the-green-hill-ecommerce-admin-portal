const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const url = require('url');
const adminRoutes = require('./controllers/api/admin.js');
const apiRoutes = require('./controllers/index.js');
const sequelize = require('./config/connection.js');

const app = express();
const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use('/', apiRoutes);

app.get('/', (req, res) => {
  res.render('homepage');
});

sequelize.sync({ force: false }).then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});
