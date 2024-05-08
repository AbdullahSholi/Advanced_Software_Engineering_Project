// routes.js

const express = require('express');

const router = express.Router();

const gardenController = require('./controllers/Garden/garden');

// Create a new task
router.post('/add-new-garden', gardenController.addGarden);

module.exports =  router;
  