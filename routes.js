// routes.js

const express = require('express');

const router = express.Router();

const gardenController = require('./controllers/Garden/garden');

const userController = require('./controllers/User/user');

const guideController = require('./controllers/Guide/guide');

// Create a new task
router.post('/GreenThumb/api/v1/add-new-garden', gardenController.addGarden);
router.get("/GreenThumb/api/v1/get-garden-list", gardenController.getGardenList);
router.get("/GreenThumb/api/v1/get-garden-list/:id", gardenController.getGardenListById);
router.get("/GreenThumb/api/v1/get-garden-list-by-name/:name", gardenController.getGardenListByName);
router.get("/GreenThumb/api/v1/get-garden-list-by-location/:location", gardenController.getGardenListByLocation);


// Crop Planning and Tracking:
// creat a new user 

router.post("/GreenThumb/api/v1/create-new-user", userController.creatNewUser);

// Knowledge Sharing:
// create a new guide 
router.post('/GreenThumb/api/v1/add-new-guide', guideController.addGuide);

module.exports =  router;
  