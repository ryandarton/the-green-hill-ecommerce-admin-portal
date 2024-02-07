import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import url from 'url';
import adminRoutes from "./controllers/api/admin.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__filename);
console.log(__dirname);
const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

app.use("/admin", adminRoutes);

app.get('/', (req, res) => {
  res.render('homepage');
});

app.listen(3000);
console.log('Server is running on port 3000');

// Future code here
// const path = require("path");
// const express = require("express");
// const sequelizeStore = require("connect-session-sequelize")(
//   expressSession.Store
// );
// const expressSession = require("express-session");
// const exphbs = require("express-handlebars");
// const routes = require("./controllers");
// const sequelize = require("./config/connection");
// const helpers = require("./utils/helpers");

// const app = express();
// const PORT = process.env.PORT || 3001;

// const session = {
//   secret: "", // future secret key
//   cookie: {
//     maxAge: 24 * 60 * 60 * 1000,
//     // 1 day uptime
//   },
//   store: new sequelizeStore({
//     db: sequelize,
//   }),
// };

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));

// app.use(expressSession(session));

// const hbs = exphbs.create({ helpers });

// app.engine("handlebars", hbs.engine);
// app.set("view engine", "handlebars");

// app.use(routes);

// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => {
//     console.log(`View on https://localhost:${PORT}`);
//   });
// });
