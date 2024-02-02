//Load the express module
const express = require('express');
//Create our express server
const app = express();
const port = 3000;
//Serve static files
app.use(express.static('public'));
//Set a basic route
app.get('/', (req, res) => res.send('Hello World !'));

//Make the app listen to port 3000
app.listen(port, () => console.log(`App listening to port ${port}`));
