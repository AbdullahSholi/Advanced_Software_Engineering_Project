// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const router = express.Router();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// set routes
const routes = require('./routes');

app.use('/', routes);



// listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
